const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { createHmac, randomBytes } = require("crypto");
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
    default: "/img/defaultProfile.png",
  },
  role: {
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
});

userSchema.pre("save", async (next) => {
  console.log("this is from pre save");
  const user = this;
  console.log(user);

  if (!user.isModified("password")) return;

  //   const salt = randomBytes(16).toString();
  const salt = await bcrypt.genSalt(16);
  console.log(salt);
  
  const hashedPassword = await bcrypt
    .hash("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

const User = model("user", userSchema);

module.exports = User;
