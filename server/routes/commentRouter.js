const express = require('express');
const commentController = require('../controllers/commentController');
const authController = require('../controllers/authController')

const router = express.Router({ mergeParams: true });
 
router.use(authController.protect);

router
  .route('/')
  .get(commentController.getAllComments)
  .post(commentController.setPostUserIds, commentController.createComment);

router
  .route('/:id')
  .put(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
