const { Router } = require("express");
const {
  signinRender,
  signupRender,
  createNewUser,
  userLogin,
  logOut,
  // getAllUsers,
  // updateUsers,
  // getUsers
} = require("../controllers/user.controller");

const router = Router();
router.route("/logout").get(logOut);

router.route("/signin").get(signinRender);

router.route("/signup").get(signupRender);

router.route("/signup").post(createNewUser);

router.route("/signin").post(userLogin);

// router.route("/").get(getAllUsers).patch(updateUsers);

// router.route("/:id").patch(updateUsers).get(getUsers);

module.exports = router;
