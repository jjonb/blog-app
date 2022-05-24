const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { required: true, type: String },
  email: { required: true, type: String },
  password: { required: true, type: String },
  profilePic: {
    data: Buffer,
    contentType: String,
  },
});

module.exports = User = mongoose.model("User", userSchema);
