const express = require("express");
const path = require("path");
const { connectMongoDB } = require("./config/connect.model");
const userRouter = require("./routes/user.route");
const staticRouter = require("./routes/static.route");
const { isUserAuth } = require("./middlewares/user.middleware");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 5001;
require("dotenv").config();

connectMongoDB(process.env.MONGO_CONNECTION_URL)
  .then(() => console.log(`MongoDB connected successfully`))
  .catch((err) => console.log(`Error while connecting MongoDB `, err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/", isUserAuth, staticRouter);

app.listen(port, () =>
  console.log(`Server started at port http://localhost:${port}`)
);
