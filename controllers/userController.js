const bcrypt = require("bcrypt");
const User = require("../models/User");
const userController = {
  registerUser: async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;

    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await User.create({
        username: username,
        password: hashedPassword,
      });
      res.send(newUser);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
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
          res.send(user);
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
};

module.exports = userController;
