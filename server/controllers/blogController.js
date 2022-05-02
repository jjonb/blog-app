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
};
