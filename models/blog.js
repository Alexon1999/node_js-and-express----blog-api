const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// mongoose.Schema : it's a contructor function

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
      // type: Schema.Types.ObjectId
    },
  },
  { timestamps: true }
);

// monodb will purialised the 'Blog' => 'blogs'
// it should be singular
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
