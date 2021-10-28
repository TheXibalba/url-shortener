const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const urlSubSchema = require("./urlSubSchema");

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Invalid username or password"],
  },

  password: {
    type: String,
    required: [true,"Invalid username or password"],
  },

  urls: {
    type: [urlSubSchema],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
