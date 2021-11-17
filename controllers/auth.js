const jwt = require("jsonwebtoken");

const auth = {
  checkToken: function (req, res, next) {
    console.log(req.cookies);
    const token = req.cookies.authToken;
    try {
      const status = jwt.verify(token, process.env.TOKEN_SECRET);
      console.log(status);
      next();
    } catch (error) {
      console.error(token);
      res.send("Authentication Error!");
    }
  },
};

module.exports = auth;
