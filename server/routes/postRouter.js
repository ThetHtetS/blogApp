const express = require("express");
const postController = require("../controllers/postController");
const commentRouter = require("./commentRouter");
const authController = require("../controllers/authController");

const router = express.Router();

router.use("/:postId/comment", commentRouter);

 
router
.route("/")
.get(postController.getAllPosts)
.post(
  authController.protect,
  authController.restrictTo("admin", 'author'),
  postController.uploadImages,
  postController.resizeImages,
  postController.setPostAuthorId,
  postController.createPost
);
 
router
  .route("/:id")
  .get(postController.getPost)
  .put(
    authController.protect,
    authController.restrictTo("admin", 'author'),
    authController.checkAuthororAdmin(),
    postController.uploadImages,
    postController.resizeImages,
    postController.updatePost
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    postController.deletePost
  );

module.exports = router;
