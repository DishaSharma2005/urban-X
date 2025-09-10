const User = require("../models/User");
const passport = require("passport");

module.exports.renderRegister = (req, res) => {
  res.render("auth/register");
};

module.exports.register = async (req, res) => {
  try {
const { username, name, mobile, aadhaar, role, password, adminCode } = req.body;

// if role is admin, verify adminCode
if (role === "admin") {
  if (adminCode !== process.env.ADMIN_CODE) {
    req.flash("error", "Invalid Admin ID. Contact system administrator.");
    return res.redirect("/register");
  }
}

const user = new User({
  username, // <--- store chosen username, not aadhaar
  name,
  mobile,
  aadhaar,
  role
});

const registeredUser = await User.register(user, password);


  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("auth/login");   // make sure path matches your login.ejs
};

module.exports.login = (req, res) => {
  req.flash("success", `Welcome back, ${req.user.username}!`);
  if (req.user.role === "admin") {
    return res.redirect("/admin/reports");
  }
  res.redirect("/reports");
};



module.exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    req.flash("success", "Logged out successfully!");
    res.redirect("/");
  });
};
