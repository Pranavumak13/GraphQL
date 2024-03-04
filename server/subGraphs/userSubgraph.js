const { gql } = require('apollo-server');
const { pool } = require("../db/db.js");
const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { buildSubgraphSchema } = require('@apollo/federation');
const express = require("express");

const app = express();
const typeDefs = gql `
    type User @key(fields: "id"){
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: String!
    }

    extend type Query{
        user(id:ID!): User
    }
`;

const resolvers = {
    Query:{
        user: async (parent, args) =>{
            try{
                const SQLquery = "SELECT * FROM users WHERE id = ?";
                const [rows, fields] = await pool.query(SQLquery, [args.id]);

                return rows[0];
            } catch (e) {
                throw new Error("Failed to fetch user with id from database: " + e.message);
            }
        }
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({typeDefs, resolvers})
});

startStandaloneServer(server, {
    listen: { port: 4001 },
}).then(({ url }) => {
   console.log(`🚀  Server ready at: ${url}`);
});
