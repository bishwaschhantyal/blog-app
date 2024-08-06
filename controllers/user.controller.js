const User = require("../models/user.model");
const signinRender = (req, res) => {
  return res.render("signin");
};

const signupRender = (req, res) => {
  return res.render("signup");
};

const createNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) return res.status(400).json({ msg: "User already exist" });
  await User.create({
    username,
    email,
    password,
  });
};

module.exports = {
  signinRender,
  signupRender,
};
