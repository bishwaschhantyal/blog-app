const jwt = require("jsonwebtoken");

require("dotenv").config();

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    name: user.username,
    profileImg: user.profileImg,
    role: user.role,
  };

  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "12d",
  });
};

module.exports = {generateToken};
