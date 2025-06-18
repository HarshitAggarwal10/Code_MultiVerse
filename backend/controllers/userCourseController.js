const UserCourse = require('../models/UserCourse');

exports.enrollInSubject = async (req, res) => {
  const { subjectId } = req.body;
  const userId = req.user.id;

  try {
    const already = await UserCourse.findOne({ userId, subject: subjectId });
    if (already) return res.status(400).json({ message: 'Already enrolled' });

    const course = new UserCourse({ userId, subject: subjectId });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(500).json({ message: 'Enrollment failed', error: err.message });
  }
};

exports.markPaymentPaid = async (req, res) => {
  const { subjectId } = req.body;
  const userId = req.user.id;

  try {
    const course = await UserCourse.findOne({ userId, subject: subjectId });
    if (!course) return res.status(404).json({ message: 'Course not found' });

    course.paymentStatus = 'paid';
    course.paymentDate = new Date();
    await course.save();

    res.status(200).json({ message: 'Payment successful', course });
  } catch (err) {
    res.status(500).json({ message: 'Payment update failed', error: err.message });
  }
};

exports.getUserCourses = async (req, res) => {
  try {
    const userCourses = await UserCourse.find({ userId: req.user.id }).populate('subject');
    res.status(200).json(userCourses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user courses', error: err.message });
  }
};
