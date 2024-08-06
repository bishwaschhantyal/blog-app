const { Router } = require("express");
const {
  signinRender,
  signupRender,
  createNewUser,
  userLogin
} = require("../controllers/user.controller");

const router = Router();

router.route("/signin").get(signinRender);

router.route("/signup").get(signupRender);

router.route("/signup").post(createNewUser);

router.route("/signin").post(userLogin);

module.exports = router;
