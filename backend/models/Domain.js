// models/Domain.js
const mongoose = require('mongoose');

const domainSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  subjects: [{ type: String }] // Array of subject names
});

module.exports = mongoose.model('Domain', domainSchema);
