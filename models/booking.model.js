const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "Hotel",
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },

  timestamps: true,
});

module.exports = mongoose.model("Booking", bookingSchema);
