const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const categoryModel = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require('../utils/appFeatures')
//const AppError = require("../utils/appError");

exports.adminOverview = catchAsync(async (req, res, next) => {
  res.status(200).render("dashboard", { link: "/admin" });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  res.status(200).render("add_catz");
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
 
  const categories = await categoryModel.find();

  res.status(200).render("category", {
    title: "All Categories",
    categories,
    link: "/admin/category",
  });
});
 
exports.getAllPosts = catchAsync(async (req, res, next) => {
  // 1) Get post data from collection
  const features = new APIFeatures(postModel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
  const currentPage = req.query.page ;
  console.log(currentPage, "currnet page");
  const posts = await features.query.populate('author');
  const categories = await categoryModel.find();
  // 2) Build template
  // 3) Render that template using post data from 1)
  res.status(200).render("postAdmin", {
    title: "All Posts",
    posts,
    categories,
    link: "/admin/posts",
    currentPage
  });
});

exports.newPost = catchAsync(async (req, res, next) => {

  const categories = await categoryModel.find();
  
  res.status(200).render("post_add", { categories, link: "/admin/post/new" });
});

exports.editPost = catchAsync(async (req, res, next) => {
  const post = await postModel.findById( req.params.id )
  const categories = await categoryModel.find();
  
  res.status(200).render("post_add", { categories , post , link: "/admin/post/new" });
});



exports.getAllUsers = catchAsync(async (req, res, next) => {
  // 1) Get user data list from collection
  const features = new APIFeatures(userModel.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
 
  const users = await features.query;

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render("user", {
    title: "All User",
    users,
    link: "/admin/users",
  });
});
