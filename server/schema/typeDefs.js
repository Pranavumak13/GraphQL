import { gql } from 'apollo-server';

export const typeDefs = gql`
#2
 type User {
    id:ID!
    name: String!
    username: String!
    age: Int!
    nationality: Nationality!
    friends: [User!]   # Nested Queries.
    favoriteMovies: [Movie]
 }
 #3 Making our own datatype with enum 
  enum Nationality{
    Canadian
    Indian
    God
    British
    Hogwarts
  }

  #4
  type Movie{
    id:ID!
    title: String!
    year: Int!
    isFamous: Boolean!
  }

  #1 Query type is the first level of Graph.
  type Query {
    users : [User!]! 
    user(id:ID!):User!
    movies: [Movie!]!
    movie(title:String!):Movie!
  }
  #6 creating an 'input' type for the CreateNewUser Mutation.
  input StructNewUserInput{
    name: String!
    username: String!
    age: Int!
    nationality: Nationality = Indian
  }

  #7
  input UpdateAgeInput{
    id: ID!
    newAge: Int!
  }

  #5 Creating a new User Mutation
  type Mutation{
    CreateUser(input:StructNewUserInput!): User
    UpdateUserAge(input: UpdateAgeInput!): User
    deleteUser(id:ID!): User
  }
  

`;
