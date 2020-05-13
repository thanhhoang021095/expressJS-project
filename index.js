require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require('cookie-parser');
const port = 8080;

const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");

// middleware
const authMiddleware = require("./middlewares/auth.middleware");

app.use(express.static( __dirname + "\\public"))

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SSESSION_ID));

app.get("/", (req, res) => {
  res.render("index", {
    name: "hoang",
  });
});

app.use("/users", authMiddleware.requireAuth, userRouter);
app.use("/login", authRouter);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
