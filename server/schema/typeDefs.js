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
    CANADIAN
    INDIAN
    GOD
    BRITISH
    HOGWARTS
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
    userByName(name:String!):User!
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

  input UpdateNationalityInput{
  id: ID!
  newNationality: Nationality!
  }

  #5 Creating a new User Mutation
  type Mutation{
    CreateUser(input:StructNewUserInput!): User
    UpdateUserAge(input: UpdateAgeInput!): User
    UpdateUserNationality(input: UpdateNationalityInput!): User
    deleteUser(id:ID!): User
  }

`;
