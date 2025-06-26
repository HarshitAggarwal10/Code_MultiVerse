// utils/unlockCertificateIfEligible.js
const UserCourse = require('../models/UserCourse');
const Subject    = require('../models/Subject');

module.exports = async function unlockCertificateIfEligible(userId, subjectId) {
  const uc = await UserCourse.findOne({ userId, subject: subjectId });
  if (!uc) return;

  const subj = await Subject.findById(subjectId).select('challenges assignments');
  if (!subj) return;

  const allChallenges  = subj.challenges.length;
  const allAssignments = subj.assignments.length;

  const challengesDone  = (uc.completedChallenges || []).length === allChallenges;
  const assignmentsDone = (uc.assignmentsCompleted || 0)   === allAssignments;

  /* ❗ decide certificate status */
  const nextStatus =
    challengesDone && assignmentsDone ? 'ready' : 'locked';

  if (uc.certificateStatus !== nextStatus) {
    uc.certificateStatus = nextStatus;
    await uc.save();
  }
};
