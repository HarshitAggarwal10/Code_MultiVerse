const mongoose = require('mongoose');

const userCourseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject' },
  progress: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  paymentDate: Date,
  badgeEarned: String,
  certificateUrl: String
});

module.exports = mongoose.model('UserCourse', userCourseSchema);
