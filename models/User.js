// models/User.js
const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  // username and password will be added automatically by the plugin
});

// Add plugin → adds username, hash, salt, and helper methods
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
