import {pool} from "../db/db.js"
import { gql } from 'apollo-server';
import { buildSubgraphSchema } from '@apollo/federation';
import { startStandaloneServer } from '@apollo/server/standalone';
import { ApolloServer } from '@apollo/server';
import express from "express";

const app = express();

export const typeDefs = gql `

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

export const resolvers = {
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


const { url } = await startStandaloneServer(server, {
    listen: { port: 4002 },
   });
   
console.log(`🚀  Server ready at: ${url}`);