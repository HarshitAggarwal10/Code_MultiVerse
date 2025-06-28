const UserCourse = require('../models/UserCourse');
const User = require('../models/User');
const Subject = require('../models/Subject');

exports.enrollInSubject = async (req, res) => {
  const { subjectId } = req.body;
  const userId = req.user._id;  // protect middleware guarantees this

  try {
    // 1. Check if already enrolled
    const alreadyEnrolled = await UserCourse.exists({ userId, subject: subjectId });
    if (alreadyEnrolled) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    // 2. Fetch subject details
    const subject = await Subject.findById(subjectId)
      .select('name domain')
      .lean(); if (!subject) return res.status(404).json({ message: 'Subject not found' });

    // 3. Create UserCourse with clean state
    const course = await UserCourse.create({
      userId,
      subject: subjectId,
      completedTopics: [],   // ← ensure it's EMPTY
      progress: 0,           // ← ensure it's 0%
      paymentStatus: 'unpaid'
    });

    // 4. Add only domain ID and subject name to user.enrolledSubjects
    await User.findByIdAndUpdate(userId, {
      $addToSet: {
        enrolledSubjects: {
          domain: subject.domain,       // store domain ID
          subject: subject.name         // store subject NAME (not _id, as per your request)
        }
      }
    });

    return res.status(201).json(course);
  } catch (err) {
    console.error('Enrollment failed:', err);
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
      certificateStatus: c.certificateStatus,
    }));
    return res.json(cleanCourses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch user courses', error: err.message });
  }
};

exports.updateTopicProgress = async (req, res) => {
  const { subjectId } = req.params;   // course._id
  const { topic }     = req.body;     // numeric index
  const userId        = req.user._id;

  try {
    /* 1️⃣ push topic index (upsert for safety) */
    const course = await UserCourse.findOneAndUpdate(
      { userId, subject: subjectId },
      { $addToSet: { completedTopics: topic } },
      { new: true, upsert: true }
    );

    /* 2️⃣ recalc percentage from Subject.topics.length */
    const { topics } = await Subject.findById(subjectId).select('topics').lean();
    course.progress = Math.round((course.completedTopics.length / topics.length) * 100);
    await course.save();

    /* 3️⃣ mirror that percent in User.enrolledSubjects */
    const subj = await Subject.findById(subjectId).select('name').lean();
    await User.updateOne(
      { _id: userId, 'enrolledSubjects.subject': subj.name },
      { $set: { 'enrolledSubjects.$.progress': course.progress } }
    );

    res.json({ progress: course.progress, completedTopics: course.completedTopics });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Could not update progress', error: err.message });
  }
};