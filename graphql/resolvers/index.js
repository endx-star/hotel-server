const hotelResolver = require("./hotelResolver");
const roomResolver = require("./roomResolver");
const authResolver = require("./authResolver");

const rootResolver = {
  ...hotelResolver,
  ...roomResolver,
};

module.exports = rootResolver;
