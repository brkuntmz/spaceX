const { ApolloServer, gql } = require("apollo-server-express");
const { GraphQLScalarType } = require("graphql");

const axios = require("axios");

const typeDefs = gql`
  scalar Date

  type Launch {
    flight_number: ID!
    mission_name: String!
    launch_year: Int!
    launch_date_local: Date
    rocket: Rocket
    launch_success: Boolean
  }

  type Rocket {
    rocket_id: ID!
    rocket_name: String
    rocket_type: String
  }

  type Query {
    getLaunches: [Launch]
    getLaunch(launchID: Int!): Launch
    getRockets: [Rocket]
    getRocket(rocketID: Int!): Rocket
  }
`;

const resolvers = {
  Query: {
    async getLaunches() {
      const result = await axios.get("https://api.spacexdata.com/v3/launches");
      return result.data;
    },
    async getLaunch(_, { launchID }) {
      const result = await axios.get(
        `https://api.spacexdata.com/v3/launches/${launchID}`
      );
      return result.data;
    },
    async getRockets() {
      const result = await axios.get("https://api.spacexdata.com/v3/rockets");
      return result.data;
    },
    async getRocket(_, { rocketID }) {
      const result = await axios.get(
        `https://api.spacexdata.com/v3/launches/${rocketID}`
      );
      return result.data;
    }
  },

  // define custom scalar 'date' type
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue(value) {
      // console.log(value);
      return new Date(value); // value from the client
    },
    serialize(value) {
      //   console.log(value);
      return new Date(value); // value sent to the client
    },
    parseLiteral(ast) {
      //   console.log(ast.value);
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `http://localhost:9000/graphql`,
    settings: {
      "editor.cursorShape": "line" // possible values: 'line', 'block', 'underline'
    }
  }
});
