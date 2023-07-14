const Room = require("../../models/room.model");
const Hotel = require("../../models/hotel.model");
const { hotel, rooms } = require("./merge");

module.exports = {
  rooms: async () => {
    try {
      const rooms = await Room.find();
      return rooms.map((room) => {
        return { ...room._doc, hotel: hotel.bind(this, room._doc.hotel) };
      });
    } catch (err) {
      throw err;
    }
  },
  addRoom: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthorized");
    }
    const room = new Room({
      roomNumber: args.roomInput.roomNumber,
      roomType: args.roomInput.roomType,
      price: args.roomInput.price,
      description: args.roomInput.description,
      hotel: req.hotelId,
    });
    let addedRoom;
    try {
      const result = await room.save();
      addedRoom = {
        ...result._doc,
        hotel: rooms.bind(this, result._doc.hotel),
      };
      const hotel = await Hotel.findById(req.hotelId);
      if (!hotel) {
        throw new Error("Hotel not Registered");
      }
      hotel.rooms.push(room);
      await hotel.save();
      return addedRoom;
    } catch (err) {
      throw err;
    }
  },
  updateRoom: async (args) => {
    try {
      const room = await Room.findByIdAndUpdate(args.id, {
        roomNumber: args.updateRoomInput.roomNumber,
        roomType: args.updateRoomInput.roomType,
        price: args.updateRoomInput.price,
        description: args.updateRoomInput.description,
      });
      return room;
    } catch (err) {
      throw err;
    }
  },
  deleteRoom: async (args) => {
    try {
      await Room.findOneAndRemove({ _id: args.id });
      console.log("Successfully delete the room");
      return true;
    } catch (err) {
      console.log("Error while deleting the room", err.message);
      return false;
    }
  },
};
