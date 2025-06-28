const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }]  // ✅ store subject _ids
});

module.exports = mongoose.model('Domain', domainSchema);
