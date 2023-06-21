-- Active: 1687215703320@@127.0.0.1@3306

CREATE TABLE
    customers (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        age INTEGER NOT NULL
    );

-- Visualizando dados de uma tabela --)

SELECT * FROM customers;

SELECT 
  id,
  name 
FROM customers;

-- Ver estrutura da tabela --)
PRAGMA table_info('customers');

-- Adicionar um customer na tabela --)
INSERT INTO customers(id, name, email, age)
VALUES('c001' , 'Damián' , 'damian@hotmail.cz' , 35);

INSERT INTO customers(id,name,email,age)
VALUES
  ('c002', 'Brenda' , 'bre_almeida@hotmail.com', 30),
  ('c003', 'Lana' , 'lana@hotmail.com', 5);

  -- Editar um dado já existente --)
  UPDATE customers
  SET
    email= 'damian.nestea87@gmail.com'
  WHERE id = 'c001';

  UPDATE customers
  SET 
    email = 'lana@gmail.com.br',
    age = 6
  WHERE id = 'c003';

  -- Deletar um registro da tabela --)
  DELETE FROM customers
  WHERE id = 'c004';

-- Adicionando mais um customer --)
INSERT INTO customers(id, name, email, age)
VALUES('c004' , 'Carlos' , 'carlos@hotmail.com' , 35);