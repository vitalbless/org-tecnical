const express = require('express');
const {
  addComment,
  getCommentsByRequest,
} = require('../controllers/commentController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, addComment);
router.get('/request/:requestId', authMiddleware, getCommentsByRequest);

module.exports = router;
