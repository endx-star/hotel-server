const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  email: String,
  password: String,
  ID: String,
});

module.exports = mongoose.model("Customer", userSchema);
