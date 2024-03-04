create database if not exists graphql_db;
use graphql_db;

show tables;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    age INT,
    nationality VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS friends (
id int auto_increment primary key,
user_id int,
friend_id int,
friend_name VARCHAR(255) NOT NULL,
friend_username VARCHAR(255) NOT NULL,
friend_age INT,
friend_nationality VARCHAR(255),
relationship varchar(255),
foreign key (user_id) references users(id),
foreign key (friend_id) references users(id)
);

CREATE TABLE IF NOT EXISTS movies (
id int auto_increment primary key,
title varchar(255) not null,
year int,
isFamous boolean
);

show tables;
select * from friends;
INSERT INTO users(name, username, age, nationality) VALUES
('John', 'john', 21, 'CANADIAN'),
('Pranav', 'pranav', 21, 'INDIAN'),
('Krishna', 'krishna', 192, 'GOD'),
('Emma', 'emma', 30, 'BRITISH'),
('Harry', 'harry', 32, 'HOGWARTS');

SELECT * FROM users;


-- Pranav's friends 
INSERT INTO friends(user_id, friend_id,friend_name,friend_username,friend_age,friend_nationality,relationship) VALUES
(2,3,'Krishna', 'krishna', 192, 'GOD', 'Close_Friend'),
(2,4,'Emma', 'emma', 30, 'BRITISH', 'Colleague'),
(2,5,'Harry', 'harry', 32, 'HOGWARTS','Best Friend');

-- Harry's Friend
INSERT INTO friends (user_id, friend_id,friend_name,friend_username,friend_age,friend_nationality,relationship) VALUES
(5, 4,'Emma', 'emma', 30, 'BRITISH', 'Partner');        -- Harry is partner with Emma

select * from friends;

-- insert into movies
INSERT INTO movies (title, year, isFamous) VALUES
('Star Wars', 1977, true),
('Harry Potter', 2000, true),
('The Dark Knight Rises', 1985, false),
('After', 2018, true);

select * from movies;


SELECT * FROM friends WHERE user_id = 2;

-- query to remove the unique constraint on the friend_username.
alter table friends
DROP constraint friend_username;