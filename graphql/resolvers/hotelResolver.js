const Hotel = require("../../models/hotel.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  hotels: async () => {
    try {
      const hotels = await Hotel.find();
      return hotels.map((hotel) => {
        return { ...hotel._doc, _id: hotel._doc._id.toString() };
      });
    } catch (err) {
      throw err;
    }
  },
  addHotel: async (args) => {
    try {
      const existingHotel = await Hotel.findOne({ name: args.hotelInput.name });
      if (existingHotel) {
        throw new Error("This Hotel is already Registered");
      }
      const hashedPassword = await bcrypt.hash(args.hotelInput.password, 12);
      const hotel = new Hotel({
        name: args.hotelInput.name,
        location: args.hotelInput.location,
        phoneNumber: args.hotelInput.phoneNumber,
        email: args.hotelInput.email,
        photo: args.hotelInput.photo,
        password: hashedPassword,
      });
      const result = await hotel.save();
      const token = jwt.sign({ ...result.toObject() }, process.env.TOKEN_KEY, {
        expiresIn: "1h",
      });
      return { ...result._doc, password: null };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    const hotel = await Hotel.findOne({ email: email });
    if (!hotel) {
      throw new Error("The Hotel are not registered");
    }
    const isEqual = await bcrypt.compare(password, hotel.password);
    if (!isEqual) {
      throw new Error("Incorrect Email or Password");
    }
    const token = jwt.sign(
      { hotelId: hotel.id, email: hotel.email },
      process.env.TOKEN_KEY,
      { expiresIn: "1h" }
    );
    return { hotelId: hotel.id, token: token, tokenExpiration: 1 };
  },
  // updateVerification: async (args) => {

  // }
};
