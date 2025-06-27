const mongoose = require('mongoose');
const challengeSchema = require('./Challenge');
const questionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  answer: String            // correct option index / text
});

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
  expectedZipName: String,     // e.g. "flexbox-gallery.zip"
  expectedFiles: [String]      // e.g. ["index.html","style.css","README.md"]
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
  roadmap: [
    {
      title: { type: String, required: true },
      sub: { type: String, required: true }
    }
  ],
  sources: [String],
  topics: [topicSchema],
  quiz: [questionSchema],
  challenges: { type: [challengeSchema], default: [] },
  assignments: [assignmentSchema]
});

module.exports = mongoose.model('Subject', subjectSchema);
