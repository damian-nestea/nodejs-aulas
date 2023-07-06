-- Active: 1687783935255@@127.0.0.1@3306
DROP TABLE purchases;
DROP TABLE users;
DROP TABLE products;


-- Criação tabela users
CREATE TABLE users(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  createdAt TEXT NOT NULL
);

-- população tabela users (createUser)
INSERT INTO users(id,name, email, password,createdAt)
VALUES
  ("u001","Damián", "damian@gmail.com", "senhaDamian",DATETIME('now')),
  ("u002","Brenda", "brenda@gmail.com", "euSouChata",DATETIME('now')),
  ("u003","Lana", "lana@gmail.com", "fodase",DATETIME('now')),
  ("u004","Tyson", "tyson@gmail.com", "cavalo",DATETIME('now')),
  ("u005","Valentina", "valentina@gmail.com", "croquetinho",DATETIME('now')),
  ("u006","Isis", "isis@gmail.com", "bola",DATETIME('now')),
  ("u007","Carlos", "carlos@gmail.com", "xxxxxx",DATETIME('now'));

-- criação tabela products 
CREATE TABLE products(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT NOT NULL,
  imageUrl TEXT NOT NULL
);

-- população tabela products (createProduct)
INSERT INTO products(id, name, price, description, imageUrl)
VALUES
  ("prod001", "Mouse", 250, "Melhor mouse da história da computação", "https://picsum.photos/seed/Mouse%20gamer/400"),
  ("prod002", "Teclado", 550, "Melhor teclado da história da computação", "https://picsum.photos/seed/Mouse%20gamer/400"),

  ("prod003", "SSD Gamer", 350, "Acelere seu sistema com o SSD.", "https://picsum.photos/seed/Monitor/400");


-- criação tabela purchases
CREATE TABLE purchases(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  buyer TEXT NOT NULL,
  total_price REAL NOT NULL,
  created_at TEXT,
  FOREIGN KEY (buyer) REFERENCES users(id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- população tabela purchases
INSERT INTO purchases(id,buyer,total_price, created_at)
VALUES
  ("p001", "u001", 100, DATETIME("now")),
  ("p002", "u002", 1000, DATETIME("now")),
  ("p003", "u003", 500, DATETIME("now")),
  ("p004", "u004", 180, DATETIME("now")),
  ("p005", "u005", 290, DATETIME("now")),
  ("p006", "u006", 135, DATETIME("now")),
  ("p007", "u001", 2000, DATETIME("now")),
  ("p008", "u002", 200, DATETIME("now")),
  ("p009", "u003", 80, DATETIME("now")),
  ("p010", "u004", 88, DATETIME("now"));

-- Seleção de users (getAllUsers)
SELECT * FROM users;

-- Seleção de products (getAllProducts)
SELECT * FROM products;

-- Seleção de products que contém 'gamer' na descrição
SELECT * FROM products
WHERE name LIKE "%gamer%";

-- Seleção de purchases
SELECT * FROM purchases;

-- deleteUserById
DELETE FROM users
WHERE id = "u007";

-- deleteProductById
DELETE FROM products
WHERE id = "prod001";

-- editProductById
UPDATE products
SET 
  name = "Mouse Gamer",
  price = 140,
  description = "Mouse Gamer de ótima qualidade.",
  imageUrl = "https://picsum.photos/seed/Mouse%20gamer/400"
WHERE id = "prod001";

-- Consulta com junção INNER JOIN
SELECT 
  purchases.id AS idPurchase,
  purchases.buyer AS idBuyer,
  users.name AS buyerName,
  users.email AS buyerEmail,
  purchases.total_price AS totalPrice,
  purchases.created_at AS date
FROM purchases INNER JOIN users
ON purchases.buyer = users.id;

-- Criação de tabela de relação
CREATE TABLE purchases_products(
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity INTEGER NOT NULL
);

-- Realizando compras
INSERT INTO purchases(id,buyer,total_price, created_at)
VALUES
  ("c001", "u001", 200, DATETIME("now"));

INSERT INTO purchases(id,buyer,total_price, created_at)
VALUES
  ("c002", "u002", 500, DATETIME("now")),
  ("c003", "u003", 1000, DATETIME("now"));

-- Realizando compras purchases_products
INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES
  ("c001" , "prod001" , 1 ),
  ("c001" , "prod002" , 1 ),
  ("c002" , "prod003" , 2 ),
  ("c002" , "prod002" , 1 ),
  ("c003" , "prod001" , 2 ),
  ("c003" , "prod003" , 2 );


-- Consulta de compra juntando as 3 tabelas
SELECT
  purchases_products.purchase_id AS purchaseId,
  purchases_products.product_id AS productsId,
  products.name AS productName,
  purchases_products.quantity,
  purchases.total_price AS totalPrice,
  users.id AS userId,
  users.name AS userName,
  users.email
FROM purchases_products
INNER JOIN purchases
INNER JOIN products
INNER JOIN users
ON purchases_products.purchase_id = purchases.id 
AND purchases_products.product_id = products.id
AND purchases.buyer = users.id;