const express = require('express');
const router = express.Router();
const { createSubject, getSubjectsByDomain } = require('../controllers/subjectController');
// const auth = require('../middleware/authMiddleware');
const { protect } = require('../middleware/authMiddleware');
const Subject = require('../models/Subject');

router.post('/create', protect , createSubject);
router.get('/by-domain/:domainId', getSubjectsByDomain);
router.patch('/:id', async (req, res) => {
  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          imageUrl: req.body.imageUrl,
          reviews: req.body.reviews,
          domain: req.body.domain,
        }
      },
      { new: true }
    );
    res.status(200).json(updatedSubject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
