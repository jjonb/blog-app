const {
  getUser,
  registerUser,
  login,
} = require("../controllers/userController");

const auth = require("../middleware/auth");
const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./image");
  },
  filename: function (req, file, cb) {
    console.log(req.file);

    cb(null, Date.now() + "-" + file.fieldname + ".png");
  },
});

const upload = multer({
  storage: multer.memoryStorage(),
});

// route: /user
// accepts : header => x-auth-token
router.get("/", auth, getUser);

// route: /user/register
// accepts : req.body => userName, email, password
router.post("/register", registerUser);

// route: /user/login
// accepts : req.body => email, password
router.post("/login", login);

router.post("/upload", upload.array("photo", 3), async (req, res, next) => {
  const file = req.files;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
  console.log("Success", req.files);
});

module.exports = router;
