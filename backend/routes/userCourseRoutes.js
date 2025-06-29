const express = require('express');
const router = express.Router();
const { protect, isAuthenticated } = require('../middleware/authMiddleware');
const Subject = require('../models/Subject');
const UserCourse = require('../models/UserCourse');
const User = require('../models/User');
const {
  enrollInSubject,
  markPaymentPaid,
  getUserCourses,
  updateTopicProgress
} = require('../controllers/userCourseController');
const { createOrder, confirmPayment } = require('../controllers/paymentController');
const mongoose = require('mongoose');

router.post('/enroll', protect, enrollInSubject);
router.post('/pay', protect, markPaymentPaid);
router.get('/my-courses', protect,isAuthenticated, getUserCourses);
router.post('/progress/:subjectId', protect, updateTopicProgress);
router.post('/create-order', protect, createOrder);
router.post('/confirm', protect, confirmPayment);

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
  else if (score >= 50) badge = 'silver';
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
