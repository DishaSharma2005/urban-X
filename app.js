// app.js
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const MongoStore = require("connect-mongo");

const User = require("./models/User"); // from NIF Portal
const connectDB = require("./db"); // custom db.js (you’ll create as I shared)

// ROUTES
const reportRoutes = require("./routes/reports.js"); // citizen side (new)
const adminReportRoutes = require("./routes/adminReports"); // admin side (new)

// Express App
const app = express();

// MongoDB Connection
connectDB();

// EJS setup (reuse from WanderLust)
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Session Store (reuse NIF Portal style)
const secret = process.env.SESSION_SECRET || "thisshouldbeabettersecret";

const store = MongoStore.create({
  mongoUrl: process.env.MONGODB_URI,
  secret,
  touchAfter: 24 * 3600, // time period in seconds
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
  store,
  name: "urbanxSession",
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
app.use(session(sessionConfig));
app.use(flash());

// Passport Config (reuse from NIF Portal)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash Middleware
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.get("/", (req, res) => {
  res.render("home"); // Make a simple UrbanX home.ejs
});

app.use("/reports", reportRoutes);
app.use("/admin/reports", adminReportRoutes);

// Error handling
// Catch-all for undefined routes
app.all(/.*/, (req, res) => {
  res.status(404).send("Page Not Found");
});


app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).render("error", { err });
});

// Start Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`UrbanX server running on port ${port}`);
});
