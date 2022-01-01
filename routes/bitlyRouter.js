const express = require("express");
const router = express.Router();
const bitlyController = require("../controllers/bitlyController");
const mongoose = require("mongoose");
const User = require("../models/User");
const axios = require("axios");

router.post("/shorten", async (req, res) => {
  const longUrl = req.body.longUrl;
  console.log(longUrl);
  const shortenedUrl = await bitlyController(longUrl);

  res.send(shortenedUrl);
});


router.post("/:userid/shorten", async (req, res) => {
  const userid = req.params.userid;
  const longUrl = req.body.longUrl;
  const shortUrl = await bitlyController(longUrl);

  try {
    const data = await axios.get(
      `http://textance.herokuapp.com/title/${longUrl}`
    );
    const title = data.data;

    const urlObj = {
      title: title,
      longUrl: longUrl,
      shortUrl: shortUrl,
    };

    const response = await User.findOneAndUpdate(
      { _id: userid },
      {
        $push: {
          urls: urlObj,
        },
      }
    );
    console.log(response);

    res.redirect(`/user/${userid}`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
