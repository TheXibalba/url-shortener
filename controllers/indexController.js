const jwt = require("jsonwebtoken");

const indexController = async (req, res) => {
  console.log(req.cookies);
  const token = req.cookies.authToken;
  try {
    const status = jwt.verify( token, process.env.TOKEN_SECRET);
    console.log(status);
    res.render("index");
  } catch (error) {
    console.error(token);
    res.render("index");
  }
};

module.exports = indexController;
