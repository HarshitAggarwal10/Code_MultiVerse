const express = require('express');
const router = express.Router();
const { createSubject, getSubjectsByDomain, getSubjectById } = require('../controllers/subjectController');
const { protect } = require('../middleware/authMiddleware');
const Subject = require('../models/Subject');
const upload  = require('../utils/multer');

router.post('/create', protect , createSubject);

router.get('/by-domain/:domainId', getSubjectsByDomain);

router.patch('/:id', async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json(updatedSubject);
  } catch (err) {
    console.error("Error updating subject:", err);
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', getSubjectById);

router.post('/quiz/:subjectId/submit', protect, async (req,res)=>{
  const { answers=[] } = req.body;
  const subj = await Subject.findById(req.params.subjectId).select('quiz');
  const correct = subj.quiz.map((q,i)=> q.answer === answers[i]);
  res.json({ score: correct.filter(Boolean).length, correct });
});

router.post('/challenges/:id/submit', protect, async (req,res)=>{
  // naive evaluation → compare trimmed code
  const ch = await Subject.findOne({ 'challenges._id': req.params.id },
                                   { 'challenges.$':1 });
  const passed = req.body.code.trim().includes('function'); // fake
  res.json({ passed });
});

router.post('/assignments/:id/upload', protect, upload.single('file'), (req,res)=>{
  // Multer `upload` accepts .zip only (file filter)
  res.json({ status:'received', file:req.file.filename });
});

router.patch('/:id', protect, async (req, res) => {
  try {
    const updated = await Subject.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating subject', error: err.message });
  }
});


module.exports = router;
