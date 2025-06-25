const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const Subject = require('../models/Subject');
const UserCourse = require('../models/UserCourse');
const User = require('../models/User');
const {
  enrollInSubject,
  markPaymentPaid,
  getUserCourses
} = require('../controllers/userCourseController');
const mongoose = require('mongoose');

router.post('/enroll', protect, enrollInSubject);
router.post('/pay', protect, markPaymentPaid);
router.get('/my-courses', protect, getUserCourses);

router.post('/progress/:subjectId', protect, async (req, res) => {
  try {
    const { subjectId } = req.params;          // course._id
    const { topic } = req.body;            // numeric index
    const userId = req.user.id;

    /* upsert course entry & push topic into a set                          */
    const course = await UserCourse.findOneAndUpdate(
      { userId, subject: subjectId },
      { $addToSet: { completedTopics: topic } },
      { new: true, upsert: true }
    );

    /* recompute % (topics length lives on the Subject doc)                 */
    const { topics } = await Subject.findById(subjectId).select('topics');
    course.progress = Math.round(
      (course.completedTopics.length / topics.length) * 100
    );
    await course.save();

    res.json({ progress: course.progress, completedTopics: course.completedTopics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not update progress', error: err.message });
  }
});

router.post('/:id/submit', protect, async (req, res) => {
  const { id } = req.params;            // subject id
  const { answers } = req.body;
  const userId = req.user.id;           // available via protect

  const subject = await Subject.findById(id);
  if (!subject) return res.status(404).json({ error: 'Quiz not found' });

  const quiz = subject.quiz;
  const correct = quiz.map((q, i) => q.answer === answers[i]);
  const score = Math.round(correct.filter(Boolean).length / quiz.length * 100);

  let badge = 'none';
  if (score >= 80) badge = 'gold';
  else if (score >= 60) badge = 'silver';
  else if (score >= 40) badge = 'bronze';

  /* ---- persist on UserCourse ---- */
  await UserCourse.findOneAndUpdate(
    { userId, subject: id },
    {
      $set: {
        'quizResult.score': score,
        'quizResult.badge': badge,
        'quizResult.attemptedAt': new Date()
      }
    },
    { new: true, upsert: true }
  );
  res.json({ score, correct, badge });
});

module.exports = router;
