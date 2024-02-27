import { gql } from 'apollo-server';
import {pool} from "../db/db.js"
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/federation';
import express from "express";


const app = express();
export const typeDefs = gql `

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

export const resolvers = {
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


const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
   });
   
console.log(`🚀  Server ready at: ${url}`);