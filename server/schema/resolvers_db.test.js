const { pool } = require("../db/db.js");
const { resolvers_db } = require("./resolvers_db");

jest.mock("../db/db.js");

describe("resolvers_db", () => {
    let mockPool;

    beforeEach(() => {
        mockPool = {
            query: jest.fn()
        };
        pool.query = mockPool.query;
    });

    //1
    it('fetches users with friends', async () => {
        const users = [
            { id: 1, name: 'Alice', age: 2, nationality: "INDIAN" },
            { id: 2, name: 'Bob', age: 3, nationality: "AMERICAN" }
        ];
        
        const friends = [
            { friend_id: 2, friend_name: 'Bob', friend_username: 'bob123', friend_relationship: 'friend' }
        ];
        
    
        mockPool.query
            .mockResolvedValueOnce([users, []]) // Mocking users query
            .mockResolvedValueOnce([friends, []]) // Mocking friends query for Alice
            .mockResolvedValueOnce([[], []]); // Mocking friends query for Bob
    
        // Call the users function
        const result = await resolvers_db.Query.users();
        expect(result).toEqual([
            { id: 1, name: 'Alice', age: 2, nationality: "INDIAN", friends: [{ id: 2, name: 'Bob', username: 'bob123', relationship: 'friend' }] },
            { id: 2, name: 'Bob', age: 3, nationality: "AMERICAN", friends: [] } // Bob has no friends in this test case
        ]);
        expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM users");
        expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM friends WHERE user_id = ?', [1]);
        expect(mockPool.query).toHaveBeenCalledWith('SELECT * FROM friends WHERE user_id = ?', [2]);
    });


    // Good! 2
    it("fetches user by id", async () => {
        const user = { id: 1, name: "John Doe", username: "johndoe", age: 30, nationality: "USA" };
        mockPool.query.mockResolvedValue([[user]]);

        const result = await resolvers_db.Query.user(null, { id: 1 });
        expect(result).toEqual(user);
        expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM users WHERE id = ?", [1]);
    });

   // Good! 3
    it("fetches user by name", async () => {
        const user = { id: 1, name: "John Doe", username: "johndoe", age: 30, nationality: "USA" };
        mockPool.query.mockResolvedValue([[user]]);

        const result = await resolvers_db.Query.userByName(null, { name: "John Doe" });
        expect(result).toEqual(user);
        expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM users WHERE name =?", ["John Doe"]);
    });

    // Good! 4
    it("creates a user", async () => {
        const newUser = {name:"Janny", username:"jj", age:12, nationality:"INDIAN"};
        mockPool.query.mockResolvedValue([{insertId:1}]);

        const result = await resolvers_db.Mutation.CreateUser(null, {input:newUser} );
        expect(result).toEqual({id:1, ...newUser});
        expect(mockPool.query).toHaveBeenCalledWith("INSERT INTO users (name, username, age, nationality) VALUES (?,?,?,?)", [newUser.name, newUser.username, newUser.age, newUser.nationality])
    });

    // Movie Test 5
    it("fetches movies", async()=>{
        const movie = {id:1, title:"HP", year:2000, isFamous: true };
        mockPool.query.mockResolvedValue([[movie]]);

        const result = await resolvers_db.Query.movies();
        expect(result[0]).toEqual(movie);
        expect(mockPool.query).toHaveBeenCalledWith("SELECT * FROM movies");
    })

});




