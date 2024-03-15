CREATE TABLE data (
    id SERIAL PRIMARY KEY,
    name VARCHAR(10),
    number INTEGER
);

-- CREATE TABLE data (id SERIAL PRIMARY KEY, name VARCHAR(10), number INTEGER);

INSERT INTO data (name, number) VALUES ($1, $2);