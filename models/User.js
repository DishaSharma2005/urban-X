const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // keep as login ID
  name: String,
  mobile: { type: String, match: /^[0-9]{10}$/ },
  aadhaar: { type: String, match: /^[0-9]{12}$/ },
  role: { type: String, enum: ["citizen", "admin"], default: "citizen" }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
