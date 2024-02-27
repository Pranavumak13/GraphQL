import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./schema/typeDefs.js";
import {resolvers} from "./schema/resolvers.js"
import { resolvers_db } from './schema/resolvers_db.js';
import express from "express";


const app = express();

const server = new ApolloServer({ 
    typeDefs, 
    // resolvers  // when  to use the hardcoded data (FakeData.js)
    resolvers:resolvers_db, // when to use the DATABASE data
    context: (req) => {
      return req;
    },
 }); 

 const { url } = await startStandaloneServer(server, {
   context: async ({ req }) => {return req },
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);