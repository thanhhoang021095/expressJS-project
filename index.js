require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require('cookie-parser');
const port = 8080;

const homeRouter = require("./routes/home.route");
const userRouter = require("./routes/user.route");
const authRouter = require("./routes/auth.route");
const productRouter = require("./routes/product.route");
const cartRouter = require("./routes/cart.route");
// middleware
const authMiddleware = require("./middlewares/auth.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SSESSION_SECRET));
app.use(sessionMiddleware);
app.use(express.static( __dirname + "\\public"))

app.use("/", homeRouter);
app.use("/users", authMiddleware.requireAuth, userRouter);
app.use("/products", productRouter);
app.use("/login", authRouter);
app.use("/cart", cartRouter);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
