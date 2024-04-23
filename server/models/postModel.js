const mongoose = require('mongoose');
const slugify = require('slugify');

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'book must have title'],
      unique: true,
    }, 
    body: {
      type: String,
      required: [true, 'book must have body']
    },
    slug: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User'
      //required: [true, 'author field  is necessary'],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Categories',
    },
    imageCover: { type: String },
    images: [String]
  },
  { timestamps: true ,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  },
);

postSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// virtual property
// postSchema.virtual('durationWeeks').get(function() {
//   return this.slug;
// });


// Virtual populate
postSchema.virtual('comments', {
  ref: 'Comments',
  localField: '_id',
  foreignField: 'post',
});

// postSchema.set('toObject', {virtuals: true})
// postSchema.set('toJson', {virtuals: true})

module.exports = mongoose.model('Posts', postSchema);
