const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5050;
require("dotenv").config();
const multer = require('multer');
const bodyParser = require("body-parser");


// Setup middleware, middleware built for us from respective libraries
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Use the mongoose driver and library to communicate server side code with MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/blog-app-db",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw new Error({ msg: err });
    console.log("connected to mongodb");
  }
);
app.get('/', (req, res) => {
  res.status(200).send("You can post to /api/upload.");
});

app.post('/api/upload',, upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  res.status(200).json({
    message: "success!",
  });
});

// custom routes set up as middleware
app.use("/blog", require("./routes/blogRoutes"));
app.use("/user", require("./routes/userRoutes"));

// sets up port that is listening on physical hardware
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
