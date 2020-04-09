-- sudo -u postgres psql
-- \i <path_to_create_db.sql>;
-- CREATE DATABASE picopy;
--  \password 
-- \c picopy
-- \q
-- sudo -u postgres service postgresql start

drop table p_user;
CREATE TABLE IF NOT EXISTS p_user (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30) NOT NULL,
    pwd TEXT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email TEXT NOT NULL,
    date_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE p_user OWNER TO postgres;

drop table photo;
CREATE TABLE IF NOT EXISTS photo (
    photo_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES p_user(user_id),
    filename TEXT NOT NULL,
    filters TEXT,
private BOOLEAN NOT NULL DEFAULT 'false',
    date_created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE photo OWNER TO postgres;

