const express = require("express");
const cors = require("cors");
const http = require("http");

const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");

const graphqlSchema = require("./graphql/schema/index");
const graphqlResolver = require("./graphql/resolvers/index");
const isAuth = require("./middleware/is_auth");

const app = express();
const server = http.createServer(app);
require("dotenv").config();

app.use(express.json(), cors());
app.use(isAuth);

app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI)
  // .connect('mongodb://localhost:27017/HotelBooking')
  .then(() => {
    console.log("Database Connected Successfully");
    app.listen(PORT, () => {
      console.log(`The Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
