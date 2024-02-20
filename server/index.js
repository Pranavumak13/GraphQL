import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from "./schema/typeDefs.js";
import {resolvers} from "./schema/resolvers.js"


const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: (req) => {
      return req;
    },
 }); 


 const { url } = await startStandaloneServer(server, {
   context: async ({ req }) => {return req },
    listen: { port: 4000 },
  });
  
  console.log(`🚀  Server ready at: ${url}`);