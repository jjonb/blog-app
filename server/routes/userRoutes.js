const {
  getUser,
  registerUser,
  login,
  uploadProfilePic,
} = require("../controllers/userController");

const auth = require("../middleware/auth");
const router = require("express").Router();
const upload = require("../middleware/upload");

// route: /user
// accepts : header => x-auth-token
router.get("/", auth, getUser);

// route: /user/register
// accepts : req.body => userName, email, password
router.post("/register", registerUser);

// route: /user/login
// accepts : req.body => email, password
router.post("/login", login);

router.post("/upload", upload.single("file"), uploadProfilePic);

module.exports = router;
