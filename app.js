const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const indexRouter = require("./routes/indexRouter");
const bitlyRouter = require("./routes/bitlyRouter");
const userRouter = require("./routes/userRouter");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

mongoose.connect("mongodb://localhost/url_shortner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/api", bitlyRouter);

// console.log(__dirname);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
