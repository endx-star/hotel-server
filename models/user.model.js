const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  ID: String,
  role: String,
});

module.exports = mongoose.model("User", userSchema);
