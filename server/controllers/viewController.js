const postModel = require("../models/postModel");
const userModel = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require('../utils/appFeatures');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
 

  const features = new APIFeatures(postModel.find(), req.query)
  .filter()
  .sort()
  .limitFields()
  .paginate();

  const posts = await features.query;


  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render("homePage", {
    title: "Exploring the Essence",
    posts,
  });
});

exports.getPost = catchAsync(async (req, res, next) => {
  // 1) Get the data, for the requested tour (including reviews and guides)
  const post = await postModel.findOne({ slug: req.params.slug }).populate({
    path: "comments",
    fields: "comment user",
  });

  if (!post) {
    return next(new AppError("There is no post with that name.", 404));
  }

  // 2) Build template
  // 3) Render template using data from 1)
  res.status(200).render("post", {
    title: `${post.title} `,
    post,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render("login", {
    title: "Log into your account",
  });
};

exports.getSignUpForm = (req, res) => {
  res.status(200).render("signup", {
    title: "Sign up your account",
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render("account", {
    title: "Your account",
  });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await userModel.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render("account", {
    title: "Your account",
    user: updatedUser,
  });
});
