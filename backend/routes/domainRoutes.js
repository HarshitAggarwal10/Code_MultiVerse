// routes/domainRoutes.js
const express = require('express');
const router = express.Router();
const {
  createDomain,
  getAllDomains,
  addSubjectToDomain
} = require('../controllers/domainController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create', protect, createDomain);
router.get('/', getAllDomains);
router.post('/:domainId/subjects', protect, addSubjectToDomain); // Add subject to domain

module.exports = router;
