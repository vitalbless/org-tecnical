const express = require('express');
const {
  createRequest,
  updateRequestStatus,
  assignMasterToRequest,
  generateReport,
  updateRequest,
} = require('../controllers/requestController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createRequest);
router.patch('/:id/status', authMiddleware, updateRequestStatus);
router.patch('/:id', authMiddleware, updateRequest);
router.patch('/assign/:id', authMiddleware, assignMasterToRequest);
router.get('/report/completed', authMiddleware, generateReport);
module.exports = router;
