const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const userController = {
  registerUser: async (req, res) => {
    const { fName, username, password, lName } = req.body;
    const saltRounds = 10;

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log(req.body);

      const newUser = await User.create({
        firstName: fName,
        lastName: lName,
        username: username,
        password: hashedPassword,
      });
      console.log(newUser);
      res.redirect("/user/login");
    } catch (error) {
      console.log(error);
      if (error.code == 11000) {
        res.status(409).send("User already exists!");
        return;
      }
      res.status(500).send("Internal Server Error");
    }
  },

  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      console.log(user);
      if (user) {
        const cmp = await bcrypt.compare(req.body.password, user.password);
        if (cmp) {
          //   ..... further code to maintain authentication like jwt or sessions
          const { username } = user;

          const token = await jwt.sign({ username }, process.env.TOKEN_SECRET, {
            expiresIn: "20m",
          });
          res
            .cookie("authToken", token, {
              expires: new Date(Date.now() + 20 * 60 * 1000),
              httpOnly: true,
            })
            .redirect("/user/dashboard");
        } else {
          res.send("Wrong username or password.");
        }
      } else {
        res.send("Wrong username or password.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
    }
  },

  userDashboard: async (req, res) => {
    res.render("dashboard");
  },
};

module.exports = userController;
