const { Router } = require("express");
const {
  signinRender,
  signupRender,
} = require("../controllers/user.controller");

const router = Router();

router.route("/signin").get(signinRender);

router.route("/signup").get(signupRender);

router;
module.exports = router;
