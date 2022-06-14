const {
  getUser,
  registerUser,
  login,
  updateUser,
} = require("../controllers/userController");

const path = require("path");
const auth = require("../middleware/auth");
const multer = require("multer");
const router = require("express").Router();
const fs = require("fs");
const User = require("../models/userModel");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
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
router.put("/updateUser", auth, updateUser);

// For Single image upload
router.put("/uploadImage", auth, upload.single("file"), async (req, res) => {
  try {
    const updateImage = await User.findOneAndUpdate(
      { userName: req.user.userName },
      {
        img: {
          data: fs.readFileSync(
            path.join(__dirname, "..", "uploads", req.file.filename)
          ),
          contentType: "image/png",
        },
      }
    );
    res.json(updateImage);
  } catch (err) {
    res.json({ msg: err });
  }
});
module.exports = router;
