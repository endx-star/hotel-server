const { Schema } = require("mongoose");
const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: Number,
    required: true,
    unique: [true, "This room is already registered."],
  },
  roomType: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
  },
  avaliable: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Room", roomSchema);
