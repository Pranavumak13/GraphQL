import { UserList } from "../FakeData.js";
import {MovieList } from "../FakeData.js"
import pkg from 'lodash'; // Lodash's modular methods are great for: Iterating arrays, objects, & strings. Manipulating & testing values. 
const { _ } = pkg;
import {pool} from "../db.js"

export const resolvers = { 
    Query: {
        //USER RESOLVERS
        
        users : () => {
          return UserList // Use when not doing the error checking
          //if(UserList)  return {users: UserList}

          return {message: "Hi, we are getting an error. Please try again"}
        },
        user :(parent, args, info) => { // parent for taking all the 'users' information and args for further argument.
            const id = args.id
            const user = _.find(UserList, {id : Number(id)}); // '_' is a lodash which is used for array manipulation.; .find(from_where, to_what)
            return user;    
        },
        userByName : (parent, args) =>{
          const name = args.name
          const user = _.find(UserList,{name: (name)} )
          return user;
        },

        //MOVIE RESOLVERS
        movies : (parent, args, context, info) => {
          // console.log("Context in movies resolver:", context); // Log the context object
          // console.log(info);
          return MovieList;
        },
        movie :(parent, args) => { // parent for taking all the'movies' information and args for further argument.
            const title = args.title
            const movie = _.find(MovieList, {title : title}); // '_' is a lodash which is used for array manipulation.;.find(from_where, to_what)
            return movie;    
        }
    },
    User: {
        favoriteMovies: (parent)=> {
            // console.log(parent); ------------> Inteseting
            // When the parent level is executed its corresponding child have all the return values of parents.
            // for eg: query --> users (parent) --> favoriteMovies (child) --> anotherLevel (subChild)
            // in short: child has all values of parent.

            return _.filter(MovieList, (movie)=> 
                movie.year>=2000 && movie.year<=2020 
            );
        }
    },

    Mutation: {
        CreateUser: (parent, args) => {
          const user = args.input;
          const lastId = UserList[UserList.length - 1].id;
          user.id = lastId + 1;
          UserList.push(user);
          return user;
        },
    
        UpdateUserAge: (parent, args) => {
          const { id, newAge } = args.input;
          let userUpdated;
          UserList.forEach((user) => {
            if (user.id === Number(id)) {
              user.age = newAge;
              userUpdated = user;
            }
          });
    
          return userUpdated;
        },

        UpdateUserNationality: (parent, args) => {
          const { id, newNationality } = args.input;
          let userUpdated;
          UserList.forEach((user) => {
            if (user.id === Number(id)) {
              user.nationality = newNationality;
              userUpdated = user;
            }
          });
        },
    
        deleteUser: (parent, args) => {
          const id = args.id;
          _.remove(UserList, (user) => user.id === Number(id));
          return null;
        },
      },

      // for UNION and error handling

      UsersResult: {
        __resolveType(obj){
          if(obj.users){ // if everything goes well
            return "UserSuccessfulResult";
          }
          if(obj.message){ // user defined error message
            return "UserFailureResult";
          }

          return null; // if any graphql error exists
        }
      }

    };

    
/*
Different args in resolvers 
1. parent
2. args
3. context --> it is used to, access the passed value from ApolloServer instance to any resolvers you want.
  // UseCase: authentication and authorization
  // very imp argument.
4. info

-----------------

Fragments : helpful when we want the fragmented parts from whole query
query GetMovies{
  movies {
    ...GetTitleAndYear
  }
}

fragment GetTitleAndYear on Movie{
  title
  year
}


-----------------------------------

Error Handling with UNIONS and ResultBoxes

-- it is genearally used for those errors which is not resolved by the GraphQL

-- Here we try to return the results or the error message

*/