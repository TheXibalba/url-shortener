const express = require("express");
const router = express.Router();
const { checkToken } = require("../controllers/auth");
const {
  registerUser,
  loginUser,
  userDashboard,
} = require("../controllers/userController");

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/dashboard",checkToken,  userDashboard);

module.exports = router;
