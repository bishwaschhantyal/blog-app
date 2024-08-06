const express = require("express");
const path = require("path");
const { connectMongoDB } = require("./config/connect.model");
require("dotenv").config();
const userRouter = require("./routes/user.route");

const app = express();
const port = process.env.PORT || 5001;

connectMongoDB(process.env.MONGO_CONNECTION_URL)
  .then(() => console.log(`MongoDB connected successfully`))
  .catch((err) => console.log(`Error while connecting MongoDB `, err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use(express.urlencoded({extended: false}))
app.use("/user", userRouter);

app.listen(port, () =>
  console.log(`Server started at port http://localhost:${port}`)
);
