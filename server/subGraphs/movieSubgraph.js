const { pool } = require("../db/db.js");
const { gql } = require('apollo-server');
const { buildSubgraphSchema } = require('@apollo/federation');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { ApolloServer } = require('@apollo/server');
const express = require("express");

const app = express();

const typeDefs = gql `
    type Movie @key(fields: "id"){
        id: ID!
        title: String!
        year: Int!
        isFamous:Boolean!
    }

    extend type Query{
        movie(id:ID!): Movie
    }
`;

const resolvers = {
    Query:{
        movie: async (parent, args) =>{
            try{
                const SQLquery = "SELECT * FROM movies WHERE id = ?";
                const [rows, fields] = await pool.query(SQLquery, [args.id]);

                return rows[0];
            } catch (e) {
                throw new Error("Failed to fetch movie with id from database: " + e.message);
            }
        }
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({typeDefs, resolvers})
});

startStandaloneServer(server, {
    listen: { port: 4002 },
}).then(({ url }) => {
   console.log(`🚀  Server ready at: ${url}`);
});
