const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

const userRouter = require("./routes/user.route");

app.use(express.static( __dirname + "\\public"))
app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", {
    name: "hoang",
  });
});

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
