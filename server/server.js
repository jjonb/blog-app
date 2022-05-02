const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5050;
require("dotenv").config();

// Setup middleware, middleware built for us from respective libraries
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use the mongoose driver and library to communicate server side code with MongoDB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/blog-app-db",
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
