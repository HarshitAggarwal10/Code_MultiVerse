// models/Subject.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String            // correct option index / text
});

const challengeSchema = new mongoose.Schema({
  title: String,
  description: String,
  starterCode: String,
  solution: String
});

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date
});

const topicSchema = new mongoose.Schema({
  title: String,
  theory: String,
  codeExamples: [String],
  videos: [String]
});

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  domain: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain' },
  description: String,
  price: { type: Number, required: true },
  imageUrl: String,
  reviews: String,

  /* NEW fields ↓ */
  roadmap: [
    {
      title: { type: String, required: true },
      sub: { type: String, required: true }
    }
  ], 
  sources: [String],
  topics: [topicSchema],
  quiz: [questionSchema],
  challenges: [challengeSchema],
  assignments: [assignmentSchema]
});

module.exports = mongoose.model('Subject', subjectSchema);
