const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5050;
require("dotenv").config();
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Setup middleware, middleware built for us from respective libraries
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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
const upload = multer({ storage: storage });

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

// custom routes set up as middleware
app.use("/blog", require("./routes/blogRoutes"));
app.use("/user", require("./routes/userRoutes"));

// sets up port that is listening on physical hardware
app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`));
