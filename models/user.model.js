const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
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
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return;
  const salt = await bcrypt.genSalt(16);

  const hashedPassword = await bcrypt.hash(user.password, salt);

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

const User = model("user", userSchema);

module.exports = User;
