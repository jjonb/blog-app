const Blog = require("../models/blogModel");

module.exports = {
  getUsersPosts: async (req, res) => {
    try {
      // get all user blogs by the user.id
      // from the auth middleware
      const allUserPosts = await Blog.find({ authorId: req.user.id });
      // send all user blog entries as json
      res.json(allUserPosts);
    } catch (err) {
      res.json({ msg: err });
    }
  },

  createBlogPost: async (req, res) => {
    // look into req.body for subject and text keys
    const { subject, text } = req.body;

    try {
      // create a new Blog with subject text (from body)
      // and authorId (from user)
      const newPost = await new Blog({
        subject,
        text,
        authorId: req.user.id,
      }).save();

      // on success send new blog back as json
      res.json(newPost);
    } catch (err) {
      res.json({ msg: err });
    }
  },

  deleteBlogPost: async (req, res) => {
    try {
      const deleteBlog = await Blog.deleteOne({ _id: req.body._id });
      res.json(deleteBlog);
    } catch (err) {
      res.json({ msg: err });
    }
  },
  updateBlogPost: async (req, res) => {
    try {
      const updateBlog = await Blog.findOneAndUpdate(
        { _id: req.body._id },
        { text: req.body.text }
      );
      res.json(updateBlog);
    } catch (err) {
      res.json({ msg: err });
    }
  },
  getAllBlogs: async (req, res) => {
    try {
      const allBlogs = await Blog.find({});
      res.json(allBlogs);
    } catch (err) {
      res.json({ msg: err });
    }
  },
};
