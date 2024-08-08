const jwt = require("jsonwebtoken");
require("dotenv").config();

const isUserAuth = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).render("home", { error: "No token provided. You are not authorized." });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(401).render("home", { error: "Invalid token. You are not authorized." });
      }

      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).render("home", { error: "Internal Server Error" });
  }
};

module.exports = {
  isUserAuth,
};
