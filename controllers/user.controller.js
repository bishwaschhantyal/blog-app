const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const signinRender = (req, res) => {
  return res.render("signin");
};

const signupRender = (req, res) => {
  return res.render("signup");
};

const createNewUser = async (req, res) => {
    console.log(req.body);
    
  const { username, email, password } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) return res.render("signin");
  const newUser = await User.create({
    username,
    email,
    password,
  });

  return res.render("/signin");
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.render("signin");

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.render("signin");

  return res.redirect("/");
};

module.exports = {
  signinRender,
  signupRender,
  createNewUser,
  userLogin
};
