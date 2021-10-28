const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const urlSubSchema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title!"],
  },
  longUrl: {
    type: String,
    required: [true, "Please provide a long URL"],
  },
  shortUrl: {
    type: String,
    default: "",
  },
});

module.exports = urlSubSchema;
