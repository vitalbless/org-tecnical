const express = require('express');
const {
  addComment,
  getCommentsByRequest,
  updateComment,
} = require('../controllers/commentController');
const {
  authMiddleware,
  masterRoleMiddleware,
} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, masterRoleMiddleware, addComment);
router.get('/request/:requestId', authMiddleware, getCommentsByRequest);
router.put(
  '/update/:commentId',
  authMiddleware,
  masterRoleMiddleware,
  updateComment
);

module.exports = router;
