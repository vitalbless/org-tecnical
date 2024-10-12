const express = require('express');
const {
  createRequest,
  updateRequestStatus,
} = require('../controllers/requestController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createRequest);
router.patch('/:id/status', authMiddleware, updateRequestStatus);

module.exports = router;
