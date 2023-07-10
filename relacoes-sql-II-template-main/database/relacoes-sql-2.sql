-- Active: 1688504630053@@127.0.0.1@3306

-- Práticas


CREATE TABLE users (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  created_at TEXT DEFAULT (DATETIME('now')) NOT NULL
);

SELECT * FROM users;

INSERT INTO users (id, name, email, password)
VALUES
  ('u001', 'Damian', 'damian@gmail.com', 'damian123'),
  ('u002', 'Brenda', 'brenda@gmail.com', 'brenda321'),
  ('u003', 'Valentina', 'valentina@gmail.com', 'omeudeus'),
  ('u004', 'Lana', 'lana@gmail.com', 'oi123');

CREATE TABLE follows (
  follower_id TEXT NOT NULL,
  followed_id TEXT NOT NULL,
  FOREIGN KEY(follower_id) REFERENCES users(id),
  FOREIGN KEY(followed_id) REFERENCES users(id)
);

INSERT INTO follows(follower_id , followed_id)
VALUES
  ('u001', 'u002'),
  ('u001', 'u003'),
  ('u001', 'u004'),
  ('u002', 'u001'),
  ('u002', 'u003'),
  ('u003', 'u004');

SELECT * FROM users
INNER JOIN follows
ON follows.follower_id = users.id;

SELECT * FROM users
LEFT JOIN follows
ON follows.follower_id = users.id;

SELECT 
  users.id AS userId,
  users.name AS userName,
  users.email,
  users.created_at,
  follows.follower_id AS followerId,
  follows.followed_id AS followedId,
  usersFollowed.name AS followedName
FROM users
LEFT JOIN follows
ON follows.follower_id = users.id
LEFT JOIN users AS usersFollowed
ON follows.followed_id = usersFollowed.id;


-- EXERCÌCIO DE FIXAÇÃO

CREATE TABLE authors (
  id TEXT UNIQUE PRIMARY KEY NOT NULL,
  name TEXT UNIQUE NOT NULL,
  age INTEGER NOT NULL,
  country TEXT NOT NULL
);

INSERT INTO authors(id, name, age, country)
VALUES
  ("a001", "Damian", 35, "Colombia"),
  ("a002", "Brenda", 35, "Brazil"),
  ("a003", "Lana", 35, "Argentina"),
  ("a004", "Valentina", 35, "USA"),
  ("a005", "Isis", 35, "USA"),
  ("a006", "Thyson", 35, "Kenya");

SELECT * FROM authors;

CREATE TABLE books(
  id TEXT NOT NULL,
  author TEXT NOT NULL,
  name TEXT NOT NULL,
  year INTEGER NOT NULL,
  FOREIGN KEY (author) REFERENCES authors(id)
);

INSERT INTO books
VALUES
  ("b001", "a001" , "Livro diferente" , 2000),
  ("b001", "a002" , "Livro diferente" , 2000),
  ("b002", "a001" , "Livro do Damian" , 2023),
  ("b003", "a003" , "Livro da Lana" , 2001),
  ("b004", "a004" , "Valentina Life" , 1995),
  ("b005", "a005" , "Isis Book" , 1995),
  ("b005", "a004" , "Isis Book" , 1995);

SELECT * FROM books;

DROP TABLE books;

SELECT 
  authors.id AS authorId,
  authors.name AS authorName,
  age AS authorAge,
  country,
  books.id AS bookId,
  books.name AS bookName,
  books.year AS publicationYear
FROM authors
LEFT JOIN books
ON authors.id = books.author;