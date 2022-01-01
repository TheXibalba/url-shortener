const bcrypt = require("bcrypt");
const User = require("../models/user");
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
      res.redirect("/");
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
            .redirect(`/user/${user._id}`);
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

  logoutUser: async (req, res) => {
    res.cookie("authToken", "").redirect("/");
  },

  userDashboard: async (req, res) => {
    const userid = req.params.userid;
    try {
      const user = await User.findOne({ _id: userid });

      res.render("dashboard", {
        userid: req.params.userid,
        user: user,
      });
    } catch (error) {
      console.log(error);
    }
  },

  deleteLink: async (req, res) => {
    const userid = req.params.userid;
    const linkid = req.params.linkid;

    try {
      const result = await User.findOneAndUpdate(
        { _id: userid },
        {
          $pull: {
            urls: {
              _id: linkid,
            },
          },
        }
      );
      res.redirect(`/user/${userid}`);
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = userController;
