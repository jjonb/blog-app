const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  subject: String,
  text: String,
  author: String,
  authorId: String,
});

module.exports = Blog = mongoose.model("Blog", blogSchema);
