const { pool } = require("../db/db.js");
const _ = require('lodash');

exports.resolvers_db = {
    Query: {
        //USER RESOLVERS
        
        users: async () => {
            try {
                const SQLquery = "SELECT * FROM users";
                const [userRows, userFields] = await pool.query(SQLquery);
                
                if (!Array.isArray(userRows) || userRows.length === 0) {
                    // Handle case where no users are found
                    return [];
                }
                // fetch friends for each user
                const usersWithFriends = await Promise.all(userRows.map(async (user) => {
                    const friendsQuery = "SELECT * FROM friends WHERE user_id = ?";
                    const [friendsRows, friendsFields] = await pool.query(friendsQuery, [user.id]);
                    const friends = friendsRows.map((friend) => ({
                        id: friend.friend_id,
                        name: friend.friend_name,
                        username: friend.friend_username,
                        relationship: friend.friend_relationship
                    }));
                    return { ...user, friends };
                }));
                return usersWithFriends;
            } catch (e) {
                throw new Error("Failed to fetch users from database: " + e.message);
            }
        },

        user: async(parent, args) => {
            try{
                const SQLquery = "SELECT * FROM users WHERE id = ?";
                const [rows, fields] = await pool.query(SQLquery, [args.id]);

                return rows[0];
            } catch (e) {
                throw new Error("Failed to fetch user with id from database: " + e.message);
            }
        },
        userByName: async(parent, args) =>{
            const name = args.name;
            const SQLquery = "SELECT * FROM users WHERE name =?";
            const [rows, fields] = await pool.query(SQLquery, [name]);
            return rows[0];
        },

        // Movies

        movies: async() => {
            try{
                const SQLquery = "SELECT * FROM movies";
                const [rows, fields] = await pool.query(SQLquery)

                return rows;
            }catch(e){
                throw new Error("Failed to fetch the movies");
            }
        }

    },



    Mutation:{
        CreateUser: async(parent, args) => {
            try{
                const {name, username, age, nationality} = args.input;
                const SQLquery = "INSERT INTO users (name, username, age, nationality) VALUES (?,?,?,?)";
                const [result] = await pool.query(SQLquery, [name, username, age, nationality]);
                const userId = result.insertId;
                const newUser = {id: userId, name, username, age, nationality};
                return newUser;
            }catch (error) {
                throw new Error("Failed to create user in the database");
            }
    },

}
};
