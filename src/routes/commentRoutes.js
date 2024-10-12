const express = require('express');
const {
  addComment,

  updateComment,
} = require('../controllers/commentController');
const {
  authMiddleware,
  masterRoleMiddleware,
} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, masterRoleMiddleware, addComment);
router.put('/update/:id', authMiddleware, masterRoleMiddleware, updateComment);

module.exports = router;
