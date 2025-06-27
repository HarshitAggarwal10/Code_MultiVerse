// routes/assignmentRoutes.js
const express   = require('express');
const router    = express.Router();
const multer    = require('multer');
const unzipper  = require('unzipper');
const path      = require('path').posix;
const Subject   = require('../models/Subject');
const UserCourse= require('../models/UserCourse');
const { protect } = require('../middleware/authMiddleware');

const upload = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 5 * 1024 * 1024 } // 5 MB
});

/* ────────────────────────────────────────────────────────── */
/*            POST /api/assignments/:id/upload               */
/* ────────────────────────────────────────────────────────── */
router.post('/:id/upload', protect, upload.single('file'), async (req, res) => {
  try {
    /* ---------- basic guards ---------- */
    const { id } = req.params;
    if (!req.file?.buffer) {
      return res.status(400).json({ error: 'Zip file missing' });
    }

    /* ---------- fetch assignment ---------- */
    const subj = await Subject
      .findOne({ 'assignments._id': id })
      .select('assignments challenges');

    if (!subj) return res.status(404).json({ error: 'Assignment not found' });

    const assn = subj.assignments.id(id);
    if (!assn) {
      return res.status(404).json({ error: 'Assignment not found in subject' });
    }

    /* ---------- filename rule ---------- */
    const requiredName =
      assn.expectedZipName ||
      `${assn.title.trim().toLowerCase().replace(/\s+/g, '-')}.zip`;

    if (req.file.originalname.toLowerCase() !== requiredName.toLowerCase()) {
      return res.status(400).json({
        error: `Zip must be named exactly "${requiredName}"`
      });
    }

    /* ---------- unzip & inner file check ---------- */
    let zip;
    try {
      zip = await unzipper.Open.buffer(req.file.buffer);
    } catch {
      return res.status(400).json({ error: 'Corrupt zip file' });
    }

    // normalise every entry -> basename only, Unix slashes
    const zipNames = zip.files.map(f => path.basename(f.path));

    const needed   = assn.expectedFiles || [];
    const missing  = needed.filter(fn => !zipNames.includes(fn));

    if (missing.length) {
      return res.status(400).json({
        error: `Missing file${missing.length > 1 ? 's' : ''}: ${missing.join(', ')}`
      });
    }

    /* ---------- mark assignment done ---------- */
    const uc = await UserCourse.findOneAndUpdate(
      { userId: req.user.id, subject: subj._id },
      { $addToSet: { completedAssignments: assn._id } },
      { upsert: true, new: true }
    );

    /* ---------- certificate gate ---------- */
    const totalCh = subj.challenges.length;
    const totalAs = subj.assignments.length;

    const doneCh  = (uc.completedChallenges  || []).length;
    const doneAs  = (uc.completedAssignments || []).length;

    let certificateReady = false;
    if (doneCh === totalCh && doneAs === totalAs) {
      if (uc.certificateStatus !== 'ready') {
        uc.certificateStatus = 'ready';
        await uc.save();
      }
      certificateReady = true;
    }

    /* ---------- happy path ---------- */
    res.json({
      message: 'Upload OK 🎉',
      doneAssignments : doneAs,
      totalAssignments: totalAs,
      certificateReady
    });

  } catch (err) {
    console.error('❌ assignment upload error:', err);
    res.status(500).json({ error: 'Server error while processing zip' });
  }
});

module.exports = router;
