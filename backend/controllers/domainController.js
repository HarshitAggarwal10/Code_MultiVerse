// controllers/domainController.js
const Domain = require('../models/Domain');

exports.createDomain = async (req, res) => {
  const { name, subjects } = req.body;

  try {
    const existing = await Domain.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Domain already exists' });

    const domain = new Domain({ name, subjects: subjects || [] });
    await domain.save();
    res.status(201).json(domain);
  } catch (err) {
    res.status(500).json({ message: 'Domain creation failed', error: err.message });
  }
};

exports.getAllDomains = async (req, res) => {
  try {
    const domains = await Domain.find();
    res.status(200).json(domains);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch domains', error: err.message });
  }
};

// ✅ New controller to add subjects to an existing domain
exports.addSubjectToDomain = async (req, res) => {
  const { domainId } = req.params;
  const { subject } = req.body;

  try {
    const domain = await Domain.findById(domainId);
    if (!domain) return res.status(404).json({ message: 'Domain not found' });

    if (domain.subjects.includes(subject)) {
      return res.status(400).json({ message: 'Subject already exists in this domain' });
    }

    domain.subjects.push(subject);
    await domain.save();

    res.status(200).json({ message: 'Subject added', domain });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add subject', error: err.message });
  }
};
