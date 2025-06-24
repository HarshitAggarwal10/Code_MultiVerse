const mongoose = require('mongoose');

const userCourseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
  paymentStatus: {
    type: String,
    enum: ['unpaid', 'pending', 'paid'],
    default: 'unpaid'
  },
  paymentDate: Date,
  enrolledAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserCourse', userCourseSchema);
