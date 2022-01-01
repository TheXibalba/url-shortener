const express = require("express");
const router = express.Router();
const User = require("../models/User");

const { checkToken } = require("../controllers/auth");
const {
  registerUser,
  loginUser,
  logoutUser,
  userDashboard,

  deleteLink
} = require("../controllers/userController");

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/:userid/deletelink/:linkid",deleteLink );
router.get("/:userid", checkToken, userDashboard);





module.exports = router;
