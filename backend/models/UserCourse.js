const mongoose = require('mongoose');

const userCourseSchema = new mongoose.Schema(
  {
    userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User',    required:true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required:true },

    completedTopics:      { type:[Number], default: [] },     // [0,3,4]
    progress:             { type:Number,  default: 0 },       // 0-100 cached %

    paymentStatus: {
      type: String,
      enum: ['unpaid','pending','paid'],
      default: 'unpaid'
    },

    certificateStatus: {
      type: String,
      enum: ['locked','ready','issued'],
      default: 'locked'
    },

    paymentDate:  Date,
    enrolledAt:   { type:Date, default:Date.now },

    quizResult: {
      score: { type:Number, default:0 },
      badge: { type:String, enum:['none','bronze','silver','gold'], default:'none' },
      attemptedAt: Date
    },

    completedChallenges:  { type:[mongoose.Schema.Types.ObjectId], default:[] },
    completedAssignments: { type:[mongoose.Schema.Types.ObjectId], default:[] }
  },
  { timestamps:true }
);

/*─────────────────── virtual helpers ───────────────────*/
userCourseSchema
  .virtual('assignmentsCompleted')          // ← what the front-end expects
  .get(function () { return this.completedAssignments.length; });

userCourseSchema
  .virtual('challengesCompleted')           // optional, keeps naming aligned
  .get(function () { return this.completedChallenges.length; });

userCourseSchema.set('toJSON',   { virtuals:true });
userCourseSchema.set('toObject', { virtuals:true });

userCourseSchema.index({ userId:1, subject:1 }, { unique:true });

module.exports = mongoose.model('UserCourse', userCourseSchema);
