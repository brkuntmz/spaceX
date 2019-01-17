const express = require("express");
const apolloServer = require("./server");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 4000;

apolloServer.applyMiddleware({ app });

app.listen({ port: PORT }, () => {
  console.log(`Server started listening on ${PORT}`);
});
