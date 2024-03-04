const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { typeDefs } = require("./schema/typeDefs.js");
const { resolvers } = require("./schema/resolvers.js");
const { resolvers_db } = require('./schema/resolvers_db.js');
const express = require("express");

const app = express();

const server = new ApolloServer({ 
    typeDefs, 
    // resolvers  // when  to use the hardcoded data (FakeData.js)
    resolvers: resolvers_db, // when to use the DATABASE data
    context: (req) => {
      return req;
    },
 }); 

startStandaloneServer(server, {
   context: async ({ req }) => {return req },
    listen: { port: 4000 },
}).then(({ url }) => {
   console.log(`🚀  Server ready at: ${url}`);
});
