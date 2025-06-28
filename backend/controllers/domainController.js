const Domain = require('../models/Domain');
const Subject = require('../models/Subject');

// Create a new domain
exports.createDomain = async (req, res) => {
  const { name } = req.body;

  try {
    const existing = await Domain.findOne({ name });
    if (existing) return res.status(400).json({ message: 'Domain already exists' });

    const domain = new Domain({ name, subjects: [] });
    await domain.save();
    res.status(201).json(domain);
  } catch (err) {
    res.status(500).json({ message: 'Domain creation failed', error: err.message });
  }
};

// Get all domains with populated subjects (optional)
exports.getAllDomains = async (req, res) => {
  try {
    const domains = await Domain.find().populate('subjects', 'name'); // Populate only subject name
    res.status(200).json(domains);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch domains', error: err.message });
  }
};

// Add subject to a domain
exports.addSubjectToDomain = async (req, res) => {
  const { domainId } = req.params;
  const { subjectId } = req.body;

  try {
    const domain = await Domain.findById(domainId);
    if (!domain) return res.status(404).json({ message: 'Domain not found' });

    const exists = domain.subjects.includes(subjectId);
    if (exists) return res.status(400).json({ message: 'Subject already exists in this domain' });

    domain.subjects.push(subjectId);
    await domain.save();

    res.status(200).json({ message: 'Subject added to domain', domain });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add subject', error: err.message });
  }
};
