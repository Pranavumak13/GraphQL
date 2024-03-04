// import { ApolloGateway , IntrospectAndCompose} from "@apollo/gateway";
const { ApolloGateway , IntrospectAndCompose} = require("@apollo/gateway");
// import { ApolloServer } from '@apollo/server';
const { ApolloServer } = require( '@apollo/server')
// import { startStandaloneServer } from '@apollo/server/standalone';
const { startStandaloneServer } = require( '@apollo/server/standalone')

const gateway = new ApolloGateway({
    supergraphSdl: new IntrospectAndCompose({
      subgraphs: [
        { name: "users", url: "http://localhost:4001" },
        { name: "movies", url: "http://localhost:4002" },
      ],
    }),
  });

const server = new ApolloServer({
    gateway,
    subscriptions: false
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
 console.log(`🚀  Server ready at: ${url}`);
});