const express = require('express');
const router = express.Router();
// const auth = require('../middleware/authMiddleware');
const {
  enrollInSubject,
  markPaymentPaid,
  getUserCourses
} = require('../controllers/userCourseController');
const { protect } = require('../middleware/authMiddleware');

router.post('/enroll', protect, enrollInSubject);
router.post('/pay', protect, markPaymentPaid);
router.get('/my-courses', protect, getUserCourses);

module.exports = router;
