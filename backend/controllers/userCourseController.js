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
    const userCourses = await UserCourse
      .find({
        userId: req.user.id,
        subject: { $type: 'objectId' }
      })
      .populate({
        path: 'subject',
        select: 'name description price imageUrl reviews domain challenges assignments'
      })
      .lean();

    const cleanCourses = userCourses.map(c => ({
      subject: c.subject,
      paymentStatus: c.paymentStatus,
      progress: c.progress ?? 0,
      completedTopics: c.completedTopics ?? [],
      quizResult: c.quizResult ?? { score: 0, badge: 'none' },
      completedChallenges: c.completedChallenges ?? [],
      assignmentsCompleted: c.assignmentsCompleted ?? 0,
      totalChallenges: c.subject?.challenges?.length ?? 0,
      totalAssignments: c.subject?.assignments?.length ?? 0,
      certificateStatus:  c.certificateStatus,
    }));
    return res.json(cleanCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user courses', error: err.message });
  }
};
