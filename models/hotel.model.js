const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    // unique: [true, 'The Name of your hotel must be unique'],
  },
  location: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    // unique: [
    //   true,
    //   "The phone number you entered is already registered. please use your own phone number.",
    // ],
  },
  email: {
    type: String,
    required: true,
    // unique: [true, "Email must be unique, please use another email"],
  },
  photo: {
    type: [String],
    // required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rooms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
  ],
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Hotel", hotelSchema);
