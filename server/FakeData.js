export const UserList = [
    {
        id: 1,
        name: 'John',
        username: 'john',
        age: 21,
        nationality: 'Canadian'
    },
    {
        id: 2,
        name: 'Pranav',
        username: 'pranav',
        age: 21,
        nationality: 'Indian',
        friends:[ 
            {
                id: 3,
                name: 'Krishna',
                username: 'krishna',
                age: 192,
                nationality: 'God'
            },
            {
                id: 4,
                name: 'Emma',
                username: 'emma',
                age: 30,
                nationality: 'British'
            },
            {
                id: 5,
                name: 'Harry',
                username: 'harry',
                age: 32,
                nationality: 'Hogwarts'
            },
        ]
    },
    {
        id: 3,
        name: 'Krishna',
        username: 'krishna',
        age: 192,
        nationality: 'God'
    },
    {
        id: 4,
        name: 'Emma',
        username: 'emma',
        age: 30,
        nationality: 'British'
    },
    {
        id: 5,
        name: 'Harry',
        username: 'harry',
        age: 32,
        nationality: 'Hogwarts',
        friends:[
            {
                id: 4,
                name: 'Emma',
                username: 'emma',
                age: 30,
                nationality: 'British'
            }
        ]
    },
];

export const MovieList = [
    {
        id:1,
        title: 'Star Wars',
        year: 1977,
        isFamous: true
    },
    {
        id:2,
        title: 'Harry Potter',
        year: 2000,
        isFamous: true
    },
    {
        id:3,
        title: 'The Dark Knight Rises',
        year: 1985,
        isFamous: false
    },
    {
        id:4,
        title: 'After',
        year: 2018,
        isFamous: true
    }

];