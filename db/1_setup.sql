DROP TABLE IF EXISTS users;

CREATE TABLE users (
    username varchar(30) NOT NULL UNIQUE,
    email varchar(100) NOT NULL UNIQUE,
    password varchar(255) NOT NULL
);