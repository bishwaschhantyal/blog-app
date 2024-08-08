const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token.util");

const renderHome = (req, res) => {
  return res.render("home", {
    user: req.user,
  });
};
const signinRender = (req, res) => {
  return res.render("signin");
};

const signupRender = (req, res) => {
  return res.render("signup");
};

const logOut = (req, res) => {
  res.clearCookie("token").redirect("/user/signin");
};

const createNewUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const findUser = await User.findOne({ email });
    if (findUser) {
      return res.render("signup", { error: "Email already in use" });
    }

    await User.create({
      username,
      email,
      password,
    });

    return res.redirect("/");
  } catch (error) {
    console.error("Error creating user:", error);
    return res.render("signup", { error: "Failed to create user" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.render("signin", { error: "Incorrect Email or Password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render("signin", { error: "Incorrect Email or Password" });
    }
    const token = generateToken(user);

    res.cookie("token", token);
    return res.redirect("/");
  } catch (error) {
    console.error("Error logging in:", error);
    return res.render("signin", { error: "Failed to login" });
  }
};

// const getAllUsers = async (req, res) => {
//   const allUsers = await User.find({});
//   return res.status(200).json({ msg: "successfull", Users: allUsers });
// };

// const getUsers = async (req, res) => {
//   const { id } = req.params;

//   const user = await User.findById(id);
//   return res.status(200).json({ msg: "successfull", user: user });
// };

// const deleteUser = async (req, res) => {
//   const { id } = req.params;

//   const user = await User.findByIdAndDelete(id);

//   return res
//     .status(200)
//     .json({ msg: "successfully updated", deleteUser: deleteUser });
// };

// const updateUsers = async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   const updatedUser = await User.findByIdAndUpdate(id, updates);

//   return res
//     .status(200)
//     .json({ msg: "successfully updated", updateUser: updatedUser });
// };

module.exports = {
  renderHome,
  signinRender,
  signupRender,
  createNewUser,
  userLogin,
  logOut,
  // getAllUsers,
  // updateUsers,
  // getUsers,
};
