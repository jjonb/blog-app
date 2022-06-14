const {
  getUsersPosts,
  createBlogPost,
  deleteBlogPost,
  updateBlogPost,
  getAllBlogs,
  updateSubject,
  updateAuthors,
  getBlog,
} = require("../controllers/blogController");

// auth is our custom middleware
const auth = require("../middleware/auth");
const router = require("express").Router();

// route: /blog
// header => x-auth-token
router.get("/", auth, getUsersPosts);
router.get("/get", getBlog);
router.put("/updateAuthors", auth, updateAuthors);

// route: /blog/new
// header => x-auth-token
// accepts : req.body =>
router.post("/new", auth, createBlogPost);
router.delete("/", auth, deleteBlogPost);
router.put("/update", auth, updateBlogPost);
router.put("/update/subject", auth, updateSubject);

router.get("/all", getAllBlogs);
module.exports = router;
