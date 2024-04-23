const express = require("express");
const viewsController = require("../controllers/viewControllerAdmin");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(authController.protect, authController.restrictTo("admin"));

//dashboard home page
router.get("/", viewsController.adminOverview);

//post route
router.get("/posts", viewsController.getAllPosts);
router.get("/post/new", viewsController.newPost);
router.get('/post/:id', viewsController.editPost);
//router.get("/post/:slug", authController.isLoggedIn, viewsController.getPost);
 
//category route
router.get("/category", authController.isLoggedIn, viewsController.getAllCategories);
router.get(
  "/category/new",
  authController.isLoggedIn,
  viewsController.createCategory
);

//user route
router.get("/user", authController.isLoggedIn, viewsController.getAllUsers);

module.exports = router;
