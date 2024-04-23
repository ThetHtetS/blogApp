const mongoose = require('mongoose');
const Post = require('./postModel');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  post: {
    type: Schema.Types.ObjectId,
    ref: 'Posts',
  },

  comment: {
    type: String,
    required: true,
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
}
);

//commentSchema.index({ post: 1, user: 1 }, { unique: true });

commentSchema.pre(/^find/, function(next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name'
  // }).populate({
  //   path: 'user',
  //   select: 'name photo'
  // });

  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
});


module.exports = mongoose.model('Comments', commentSchema);
