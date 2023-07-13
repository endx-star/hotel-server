const { buildSchema } = require('graphql')

module.exports = buildSchema(`
       type Hotel {
        _id: ID!
        hotelName: String!
        location: String!
        phoneNumber: String!
        email: String!
        photo: [String!]
        password: String
        rooms:[Room!]
}

input HotelInput {
    hotelName: String!
    location: String!
    phoneNumber:String!
    email: String!
    photo: [String!]
    password: String!

}

type AuthData {
   hotelId: String!
   token: String!
   tokenExpiration: Int!
}

type Room {
  _id: ID!
  roomNumber: Int!
  roomType: String!
  price: Float!
  description: String!
  hotel: Hotel!
}

input RoomInput {
  roomNumber: Int!
  roomType: String!
  price: Float!
  description: String!
  }
input UpdateRoomInput {
  roomNumber: Int
  roomType: String
  price: Float
  description: String
}
     
type RootQuery {
         hotels: [Hotel!]!
         rooms: [Room!]!
         login(email: String!, password: String!): AuthData!
       }
       type RootMutation {
           addHotel(hotelInput: HotelInput): Hotel
           addRoom(roomInput: RoomInput): Room
           updateRoom(updateRoomInput: UpdateRoomInput): Room
           deleteRoom(id: ID!): Boolean!
       }
        schema {
          query: RootQuery
          mutation: RootMutation
        }
    `)
