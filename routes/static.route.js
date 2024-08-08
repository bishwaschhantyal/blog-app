const { Router } = require("express");
const { renderHome, logOut } = require("../controllers/user.controller");

const router = Router();

router.route("/").get(renderHome);
router.route("/logout").get(logOut);


module.exports = router;
