const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
var cookieParser = require("cookie-parser");
const indexRouter = require("./routes/indexRouter");
const bitlyRouter = require("./routes/bitlyRouter");
const userRouter = require("./routes/userRouter");
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cookieParser());

// mongoose.connect("mongodb://localhost/url_shortner", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;



mongoose
  .connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.ia2jk.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((data) => {
    console.log("Database has been connected!");
  })
  .catch((err) => {
    console.log("Data connection error!");
  });

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/api", bitlyRouter);

// console.log(__dirname);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
