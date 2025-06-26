const router = require('express').Router();
const { protect } = require('../middleware/authMiddleware');
const { JSDOM }   = require('jsdom');
const Subject     = require('../models/Subject');
const UserCourse  = require('../models/UserCourse');
const unlockCertificateIfEligible = require('../utils/unlockCertificateIfEligible');

router.post('/:id/submit', protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { code = '', css = '', subjectId } = req.body;

    /* 1️⃣ we store the challenge-id **always as a string** */
    const cid = String(id);

    /* ── locate embedded challenge ── */
    const subject = await Subject.findOne(
      { 'challenges._id': id },            // keep ObjectId lookup here
      { 'challenges.$': 1 }
    );
    if (!subject) return res.status(404).json({ error: 'Challenge not found' });
    const chall = subject.challenges?.[0];

    /* ── run tests ── */
    const doc    = new JSDOM(`<style>${css}</style>\n${code}`).window.document;
    const failed = [];
    chall.tests.forEach(t => {
      const el = doc.querySelector(t.selector);
      if (!el) { failed.push(`Missing element ${t.selector}`); return; }
      if (t.rule === 'innerText' && el.textContent.trim() !== t.equals)
        failed.push(`Expected innerText “${t.equals}” in ${t.selector}`);
      if (t.rule === 'has-class' && !el.classList.contains(t.equals))
        failed.push(`${t.selector} must have class “${t.equals}”`);
    });
    const passed = failed.length === 0;

    /* ── update progress ── */
    let totalDone = 0;                         // 2️⃣ declare **before** using it
    if (passed && subjectId) {
      const uc = await UserCourse.findOneAndUpdate(
        { userId: req.user.id, subject: subjectId },
        { $addToSet: { completedChallenges: cid } },   // string id
        { new: true, upsert: true }
      );
      totalDone = uc.completedChallenges.length;

      await unlockCertificateIfEligible(req.user.id, subjectId);
    }

    /* ── reply ── */
    res.json({ passed, hints: failed, totalDone });

  } catch (err) {
    console.error('Error submitting challenge:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
