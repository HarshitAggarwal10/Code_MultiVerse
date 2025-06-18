const mongoose = require("mongoose");

const enrolledSubjectSchema = new mongoose.Schema({
  domain: String,
  subject: String,
  price: Number,
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid"
  },
  progress: {
    type: Number,
    default: 0
  },
  certificateUrl: {
    type: String,
    default: ""
  },
  badge: {
    type: String,
    default: ""
  }
});

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  googleId: String,
  githubId: String,
  discordId: String,
  enrolledSubjects: [enrolledSubjectSchema],
  isAdmin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);