import { ApolloGateway , IntrospectAndCompose} from "@apollo/gateway";
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

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

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
   });
   
console.log(`🚀  Server ready at: ${url}`);