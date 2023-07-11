const Room = require("../../models/room.model");
const Hotel = require("../../models/hotel.model");

const hotel = async (hotelId) => {
  try {
    const hotel = await Hotel.findById(hotelId);
    return {
      ...hotel._doc,
      _id: hotel.id,
      rooms: rooms.bind(this, hotel._doc.rooms),
    };
  } catch (err) {
    throw err;
  }
};

const rooms = async (roomIds) => {
  try {
    const rooms = await Room.find({ _id: { $in: roomIds } });
    return rooms.map((room) => {
      return {
        ...room._doc,
        _id: room.id,
        hotel: hotel.bind(this, room._doc.hotel),
      };
    });
  } catch (err) {
    throw err;
  }
};

exports.rooms = rooms;
exports.hotel = hotel;
