CREATE TABLE purchases(
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  total_price REAL NOT NULL,
  paid INTEGER NOT NULL,
  created_at TEXT,
  buyer_id TEXT NOT NULL
);

SELECT * FROM purchases;

INSERT INTO purchases(id,total_price, paid, created_at,buyer_id)
VALUES("p001", 1200, 0,"","u001");

INSERT INTO purchases(id,total_price, paid, created_at,buyer_id)
VALUES
  ("p002", 500, 0,"","u001"),
  ("p003", 700, 0,"","u002"),
  ("p004", 700, 0,"","u002");

UPDATE purchases
  SET created_at = DATETIME('now')
  WHERE id = 'p004';

SELECT * FROM purchases
  WHERE buyer_id = 'u001';

SELECT SUM(total_price) FROM purchases
  WHERE buyer_id = 'u002';