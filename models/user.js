const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const urlSubSchema = require("./urlSubSchema");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Please Enter a username!"],
  },
  lastName: {
    type: String,
    required: [true, "Please Enter a username!"],
  },
  username: {
    type: String,
    required: [true, "Invalid username or password"],
    unique:[true,"This account has already been registered!"]
  },

  password: {
    type: String,
    required: [true, "Invalid username or password"],
  },

  urls: {
    type: [urlSubSchema],
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
