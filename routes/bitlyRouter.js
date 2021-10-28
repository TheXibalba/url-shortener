const express = require("express");
const router = express.Router();
const bitlyController = require("../controllers/bitlyController");

router.post("/shorten", async (req, res) => {
  const longUrl = req.body.longUrl;

  console.log(longUrl);
  const shortenedUrl = await bitlyController(longUrl);

  res.send(shortenedUrl);
});

module.exports = router;
