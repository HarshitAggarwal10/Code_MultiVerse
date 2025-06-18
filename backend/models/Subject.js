const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  imageUrl: { type: String },
  reviews: { type: String },
  name: { type: String, required: true },
  domain: { type: mongoose.Schema.Types.ObjectId, ref: 'Domain' },
  description: String,
  price: { type: Number, required: true },
  topics: [
    {
      title: String,
      theory: String,
      codeExamples: [String],
      videos: [String],
      assignments: [
        {
          question: String,
          answer: String
        }
      ]
    }
  ]
});

module.exports = mongoose.model('Subject', subjectSchema);
