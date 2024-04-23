const mongoose = require('mongoose');


const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'category name is necessary'],
  },
});

module.exports = mongoose.model('Categories', CategorySchema);
