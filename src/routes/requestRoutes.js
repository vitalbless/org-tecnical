const express = require('express');
const {
  createRequest,
  updateRequestStatus,
  assignMasterToRequest,
  generateCompletedRequestsReport,
} = require('../controllers/requestController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createRequest);
router.patch('/:id/status', authMiddleware, updateRequestStatus);
router.patch('/:id/assign-master', authMiddleware, assignMasterToRequest);
router.get(
  '/report/completed',
  authMiddleware,
  generateCompletedRequestsReport
);
module.exports = router;
