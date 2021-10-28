const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
