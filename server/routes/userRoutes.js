const {
  getUser,
  registerUser,
  login,
} = require("../controllers/userController");

const path = require("path");
const auth = require("../middleware/auth");
const multer = require("multer");
const router = require("express").Router();

const imageStorage = multer.diskStorage({
  // Destination to store image
  destination: "images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  },
});
const imageUpload = multer({
  storage: imageStorage,
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

// For Single image upload
router.post(
  "/uploadImage",
  imageUpload.single("image"),
  (req, res) => {
    console.log("Full request ==> ", req.file);
    res.send(req.file);
    //console.log("file", req.files.image);
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);
module.exports = router;
