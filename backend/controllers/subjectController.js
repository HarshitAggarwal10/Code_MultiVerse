const Subject = require('../models/Subject');

exports.createSubject = async (req, res) => {
  const { name, domain, description, price, topics } = req.body;

  try {
    const subject = new Subject({ name, domain, description, price, topics });
    await subject.save();
    res.status(201).json(subject);
  } catch (err) {
    res.status(500).json({ message: 'Subject creation failed', error: err.message });
  }
};

exports.getSubjectsByDomain = async (req, res) => {
  try {
    const subjects = await Subject.find({ domain: req.params.domainId });
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch subjects', error: err.message });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.status(200).json(subject);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching subject', error: err.message });
  }
};

