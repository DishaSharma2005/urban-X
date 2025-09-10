const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");

// Register
router.get("/register", authController.renderRegister);
router.post("/register", authController.register);

// Login
router.get("/login", authController.renderLogin);
router.post("/login", 
  passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }),
  authController.login
);

// Logout
router.get("/logout", authController.logout);

module.exports = router;
