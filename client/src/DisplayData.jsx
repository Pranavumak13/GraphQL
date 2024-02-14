import {gql, useQuery, useLazyQuery} from '@apollo/client'
// useLazyQuery Hook helps us fetch the data when told only!! 
import { useState } from 'react'
import  "./DisplayData.css"

const QUERY_ALL_USERS = gql`
    query getTheUsers{
        users {
            id
            name    
            age
            nationality
        }
    },

` 
const QUERY_ALL_MOVIES = gql`

    query getAllMovies{
        movies{
            id
            title
            year
            isFamous
        }
    }
`
const  QUERY_A_MOVIE_BY_NAME = gql`

query Movie($title: String!){
    movie(title: $title) {
        title
        year
    }
}
`

const QUERY_A_USER_BY_NAME = gql`

query UserName($name: String!){
    userByName(name: $name) {
      name
      age
    }
  }

`

function DisplayData(){
    
    const {data, loading, error, refetch} = useQuery(QUERY_ALL_USERS);
    //refetch: it is to sync with the new data added
    const {data: movieData} = useQuery(QUERY_ALL_MOVIES);
   
    // Create Movie search states
    const [searchedMovie, setSearchedMovie] = useState("")
    // for fetching the data syntx: const [funName, {data and error}]
    const [fetchMovie, 
           {data: searchedMovieData, error: searchedMovieError} ] = useLazyQuery(QUERY_A_MOVIE_BY_NAME)
    // Errors
    if(searchedMovieError){
        console.log(searchedMovieError);
    }


    // Create UserSearch State
    const [userSearched, setUserSearched] = useState("")
    const [fetchUser,
            {data: UserSearchedData, error: UserSearchedError}] = useLazyQuery(QUERY_A_USER_BY_NAME);

     
    if(loading){
        return <h1>The content is loading...</h1>
    }else if(error){
        return <h1>Error: {error.message}</h1>;
    }
    
    return ( 
        
        <div>
        {data &&
            data.users.map((user) =>{
                return(
                    <div key={user.id}>
                        <h2>The list of all users are: </h2>
                        <h3>id:{user.id}</h3>
                        <h3>name:{user.name}</h3>
                        <h3>age:{user.age}</h3>
                        <h3>nationality:{user.nationality}</h3>
                    </div>
                );
            })
        }

    <hr />

        {movieData &&
            movieData.movies.map((movie) => {
                return(
                    <div key={movie.id}>
                        <h2>The list of movies are: </h2>
                        <h3>Id: {movie.id}</h3>
                        <h3>Name: {movie.title}</h3>
                        <h3>Year of release: {movie.year}</h3>
                        <h3>Is movie famous: {movie.isFamous ? 'Yes' : 'No'}</h3>
                        <h3>Is movie famous: {movie.isFamous.toString()}</h3> {/*as the passed value is boolean*/}
                    </div>
                )
            } )    
        }
            
    <hr />
    

    <div  className='SearchItems'>
    {/*  Search a movie by USER INPUT */}
        <div className='InputThings'>

            {/* Input */}

            <input type="text"  style={{ padding: "20px" }} placeholder='Type a movie name...' onChange={(event) => {
                setSearchedMovie(event.target.value)
            }}/>

            {/* Button */}

            <button onClick={()=>{fetchMovie({
                variables: {
                    title:searchedMovie
                }
            })}}>Search Movie</button>

            {/* How to Display */}

            <div>
                {searchedMovieData && (
                    <div>
                        <h3>MovieName: {searchedMovieData.movie.title}</h3>
                        <h3>Year of Publication: {searchedMovieData.movie.year}</h3>
                    </div>
                )}

                {/* If errors */}
                {searchedMovieError &&
                <h3>There is an error fetching the data</h3>}
            </div>

        </div>
            
    {/* Search a User through user Input */}

        <div className='InputThings'>

            {/* Input */}
            <input type="text"  placeholder='Search the user...' onChange={(event) => {
                setUserSearched(event.target.value)
            }} />

            {/* Button */}
            <button onClick={()=>fetchUser({
                variables: {
                    name:userSearched
                }
            })}>Search User</button>

            <div>
                {UserSearchedData && (
                    <div>
                        <h3>User Name: {UserSearchedData.userByName.name}</h3>
                        <h3>User Age: {UserSearchedData.userByName.age}</h3>
                    </div>
                )}

                {/* If errors */}
                {UserSearchedError &&
                <h3>There is an error fetching the data</h3>}
            </div>
        </div>  
    </div>
</div>
    )
}



export default DisplayData;