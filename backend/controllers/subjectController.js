const Subject = require('../models/Subject');
const Domain = require('../models/Domain');

exports.createSubject = async (req, res) => {
  const { name, domain, description, price, topics } = req.body;

  try {
    // 1. Validate domain exists
    const existingDomain = await Domain.findById(domain);
    if (!existingDomain) {
      return res.status(404).json({ message: 'Invalid domain ID' });
    }

    // 2. Create subject
    const subject = new Subject({ name, domain, description, price, topics });
    await subject.save();

    // 3. Push subject._id into domain.subjects array
    await Domain.findByIdAndUpdate(domain, {
      $addToSet: { subjects: subject._id }
    });

    res.status(201).json({
      message: "Subject created and added to domain.",
      subject
    });
  } catch (err) {
    console.error('Subject creation error:', err);
    res.status(500).json({ message: 'Subject creation failed', error: err.message });
  }
};

exports.getSubjectsByDomain = async (req, res) => {
  try {
    const subjects = await Subject.find({ domain: req.params.domainId });
    res.status(200).json(subjects);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch subjects', error: err.message });
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.status(200).json(subject);
  } catch (err) {
    console.error('Subject fetch error:', err);
    res.status(500).json({ message: 'Error fetching subject', error: err.message });
  }
};
