const express = require('express');
const {
  createRequest,
  getRequests,
  getRequest,
  updateRequestStatus,
  deleteRequest,
  assignMasterToRequest,
  generateCompletedRequestsReport,
} = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createRequest);
router.get('/', authMiddleware, getRequests);
router.get('/:id', authMiddleware, getRequest);
router.patch('/:id/status', authMiddleware, updateRequestStatus);
router.delete('/:id', authMiddleware, deleteRequest);
router.patch('/:id/assign-master', authMiddleware, assignMasterToRequest);
router.get(
  '/report/completed',
  authMiddleware,
  generateCompletedRequestsReport
);
module.exports = router;
