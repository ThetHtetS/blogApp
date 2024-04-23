const multer = require('multer');
const sharp = require('sharp');
const Post = require('./../models/postModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 }
]);

// exports.uploadImages = upload.single('photo');

// upload.single('image') req.file
// upload.array('images', 5) req.files

exports.resizeImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover || !req.files.images) return next();
  // 1) Cover image
  req.body.imageCover = `post-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/posts/${req.body.imageCover}`);

  //2) Images

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `post.${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/posts/${filename}`);

      req.body.images.push(filename);
    })
  );

  next();
});
 
exports.getAllPosts =factory.getAll(Post);
exports.getPost = factory.getOne( Post,  { path: 'comments' });


exports.setPostAuthorId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.author) req.body.author = req.user.id;
  next();
}; 

exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
exports.deletePost = factory.deleteOne(Post);
