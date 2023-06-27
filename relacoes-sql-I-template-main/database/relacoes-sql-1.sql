-- Active: 1687865747214@@127.0.0.1@3306


-- Práticas
-- Criação de tabela users
CREATE TABLE users(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL
);

-- Criação de tabela phones
CREATE TABLE phones(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  phone_number TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL,
  Foreign Key (user_id) REFERENCES users(id)
);

-- visualizar tabelas
SELECT * FROM users;

SELECT * FROM phones;

-- Populando tabelas
INSERT INTO users(id, name, email, password)
VALUES
  ("u001", "Damian", "damian@gmail.com", "senha091"),
  ("u002", "Brenda", "brenda@gmail.com", "kkkkk");

INSERT INTO phones(id, phone_number, user_id)
VALUES
  ("pn001", "987474752", "u001"),
  ("pn002", "998834541", "u001"),
  ("pn003", "992158959", "u002");

-- Query de junção de tabelas
SELECT 
  users.id AS userId,
  name,
  email,
  phones.id AS phoneId,
  phone_number
FROM phones INNER JOIN users
ON phones.user_id = users.id;

--- EXERCÌCIO

CREATE TABLE licenses(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  register_number TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL
);

CREATE TABLE drivers(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  license_id TEXT UNIQUE NOT NULL,
  FOREIGN KEY (license_id) REFERENCES licenses(id)
);

SELECT * FROM licenses;

SELECT * FROM drivers;

INSERT INTO licenses(id, register_number,category)
VALUES
  ("license001", "10101010", "A"),
  ("license002", "20202020", "B"),
  ("license003", "30303030", "D"),
  ("license004", "40404040", "AB"),
  ("license005", "50505050", "C");

INSERT INTO drivers(id, name, email, password, license_id)
VALUES
  ("d001", "Damian", "damian@gmail.com", "senhaDamian", "license001"),
  ("d002", "Brenda", "brenda@gmail.com", "senhaDamian", "license002"),
  ("d003", "Lana", "lana@gmail.com", "senhaDamian", "license003"),
  ("d004", "Isis", "isis@gmail.com", "senhaDamian", "license004");

SELECT 
  drivers.id as driverId,
  name,
  email,
  license_id,
  licenses.category,
  register_number
FROM licenses INNER JOIN drivers
ON licenses.id = drivers.license_id;


