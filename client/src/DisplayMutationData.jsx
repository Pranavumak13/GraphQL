import "./DisplayData.css"
import {gql, useMutation, useQuery} from '@apollo/client'
import { useState } from "react";

const CREATE_USER_MUTATION = gql`
mutation CreateAUser($input: StructNewUserInput!){
    CreateUser(input:$input){
        name
        age
        username
        nationality
    }
}

`

const QUERY_ALL_USERS = gql`
    query getTheUsers{
        users {
            id
            name    
            age
            nationality
        }
    }
`

function DisplayMutationData() {

    // Creating User State
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [age, setAge] = useState(0)
    const [nationality, setNationality] = useState("")

    // Query for all users to access teh refetch function
    const {refetch: refetchAllUsers} = useQuery(QUERY_ALL_USERS)

   const [createUser,
            {data:createUserData, error:createUserError}] = useMutation(CREATE_USER_MUTATION, {
                //After mutation is completed, refetch all users to update the list.
                onCompleted: () =>{
                    refetchAllUsers();
                }
            });
    
    if(createUserError){
        return <h1>Error: {createUserError.message}</h1>;
    }
        
    return(
        <div  className='SearchItems'>
            <div  className='InputThings'>
                {/* Mutation for New User */}
                <input type="text" placeholder="Name..." onChange={(event) => {
                    setName(event.target.value)
                }}/>
                <input type="text" placeholder="Username..." onChange={(event)=>{
                    setUsername(event.target.value)
                }} />
                <input type="number" placeholder="Age..." onChange={(event)=>{
                    setAge(event.target.value)
                }} />
                <input type="text" placeholder="Nationality..." onChange={(event)=>{
                    setNationality(event.target.value.toUpperCase());
                }}/>

                {/* Button */}
                <button onClick={()=>{
                createUser({
                    variables:{
                    input:{
                        name:name,
                        username:username,
                        age:Number(age),
                        nationality:nationality
                    }
                }
                })
                }}>Create User</button>

                {/* Display */}
                <div>
                    {createUserData && (
                        <div>
                            <h3>Details of new user:</h3>
                            <h3>Name: {createUserData.CreateUser.name}</h3>
                            <h3>Username: {createUserData.CreateUser.username}</h3>
                            <h3>Age: {createUserData.CreateUser.age}</h3>
                            <h3>Nationality: {createUserData.CreateUser.nationality}</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DisplayMutationData;