const mongoose = require('mongoose');

const userCourseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    completedTopics: { type: [Number], default: [] },   // e.g. [0,3,4]
    progress: { type: Number, default: 0 },   // 0-100 cached %
    paymentStatus: { type: String, enum: ['unpaid', 'pending', 'paid'], default: 'unpaid' },
    certificateStatus: {
      type: String,
      enum: ['locked', 'ready', 'issued'], // or whatever stages you want
      default: 'locked',
    },
    paymentDate: Date,
    enrolledAt: { type: Date, default: Date.now },
    quizResult: {
      score: { type: Number, default: 0 },                          // 0-100
      badge: {                                                       // none | bronze | silver | gold
        type: String,
        enum: ['none', 'bronze', 'silver', 'gold'],
        default: 'none'
      },
      attemptedAt: Date
    },
    completedChallenges: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    completedAssignments: { type: [mongoose.Schema.Types.ObjectId], default: [] },
    certificateUnlocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

userCourseSchema.index({ userId: 1, subject: 1 }, { unique: true });

module.exports = mongoose.model('UserCourse', userCourseSchema);
