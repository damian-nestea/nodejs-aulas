import express, { Request, Response } from "express";
import cors from "cors";
import {
  users,
  products,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  searchProductsByName,
} from "./database";
import { TProduct, TUser } from "./types";
import { db } from "./database/knex";

/* EXERCìCIOS CRIAÇÃO API */
const app = express();

app.use(express.json());
app.use(cors());

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});

/* Teste do servidor */
app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong");
});

/* Get all users */
app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
      SELECT * FROM users;
    `);
    if (!result) {
      res.status(400);
      throw new Error("Erro na requisição");
    }
    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});

/* Get all products */
app.get("/products", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
      SELECT * FROM products;
    `);
    if (!result) {
      res.status(400);
      throw new Error("Erro na requisição");
    }
    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});

/* Get product by name */
app.get("/products", async (req: Request, res: Response) => {
  try {
    const name = req.query.name as string;
    const result = await db.raw(`
    SELECT * FROM products
    WHERE products.name LIKE "%${name}%";
  `);
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }

  /* const response: TProduct[] = products.filter((product) => {
    return product.name.toLowerCase().includes(name.toLowerCase());
  }); 
  res.status(200).send(response ? response : products);*/
});

/* Create user */
app.post("/users", async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      email,
      password,
    }: { id: string; name: string; email: string; password: string } = req.body;

    /* Verifica se tem todos os dados necessários para criar o usuário */
    if (!id || !name || !email || !password) {
      res.status(400);
      throw new Error("Dados faltantes para criar o usuário. Verifique-os.");
    }

    const newUser: TUser = {
      id,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    /* Verifica se ID ou EMAIL já existem em USERS */
    const idEEmailIguais = users.some((user) => {
      return user.id === newUser.id || user.email === newUser.email;
    });

    if (idEEmailIguais) {
      res.status(400);
      throw new Error("Id ou Email já existentes.");
    }

    await db.raw(`
      INSERT INTO users(id,name, email, password,createdAt)
      VALUES
      ("${id}","${name}", "${email}", "${password}","${new Date().toISOString()}");
    `);
    res.status(201).send("Cadastro realizado com sucesso");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});

/* Create product */
app.post("/products", async (req: Request, res: Response) => {
  try {
    const {
      id,
      name,
      price,
      description,
      imageUrl,
    }: {
      id: string;
      name: string;
      price: number;
      description: string;
      imageUrl: string;
    } = req.body;

    /* Verificando se existem todos os dados */
    if (!id || !name || price === undefined || !description || !imageUrl) {
      res.status(400);
      throw new Error("Dados faltantes para criar produto. Verifique-os.");
    }

    /* Verificando se preço é número */
    if (typeof price !== "number") {
      res.status(422);
      throw new Error("O preço deve ser um número.");
    }

    const newProduct: TProduct = {
      id,
      name,
      price,
      description,
      imageUrl,
    };

    /* Verifica se ID já existe em Products */
    const idExistente = products.some((product) => {
      return product.id === newProduct.id;
    });
    if (idExistente) {
      res.status(400);
      throw new Error("ID já existe.");
    }

    await db.raw(`
      INSERT INTO products(id, name, price, description, imageUrl)
      VALUES
      ("${id}", "${name}", ${price}, "${description}", "${imageUrl}");
    `);
    res.status(201).send("Produto cadastrado com sucesso");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});

/* EXERCÍCIOS TYPESCRIPT */
console.log("Exercício criado!");

console.log("Usuarios:");
console.log(users);

console.log("___________________");
console.log("Produtos:");
console.log(products);

//chamada de funções de criação e retorno de usuários
createUser("u006", "Astrodev", "astrodev@email.com", "astrodev99");
console.log(getAllUsers());

//chamada de funções de criação e retorno de produtos
createProduct(
  "prod003",
  "SSD gamer",
  349.99,
  "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
  "https://picsum.photos/seed/Mouse%20gamer/400"
);
console.log(getAllProducts());

// Chamada de função para procurar produto por nome
console.log(searchProductsByName("88"));

// Delete user by Id
app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    /* Verifica se user existe */
    const indexUserToDelete = users.findIndex((user) => {
      return user.id === id;
    });
    if (indexUserToDelete < 0) {
      res.status(404);
      throw new Error("User not found");
    }

    users.splice(indexUserToDelete, 1);
    res.status(200).send("Usuário deletado com sucesso.");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});

// Delete product by Id
app.delete("/products/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    /* Verifica se existe o product */
    const indexProductToDelete = products.findIndex((product) => {
      return product.id === id;
    });
    if (indexProductToDelete < 0) {
      res.status(404);
      throw new Error("Produto não encontrado");
    }

    products.splice(indexProductToDelete, 1);
    res.status(200).send("Produto deletado com sucesso.");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});

// Edit a product
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const idProductToEdit = req.params.id;
    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    /* Verifica se existe o produto a editar */
    /* const productToEdit = products.find((product) => {
      return product.id === idProductToEdit;
    });
    if (!productToEdit) {
      res.status(404);
      throw new Error("Produto não encontrado");
    } */

    /* Verifica se informação para edição foi recebida */
    if (
      !newId &&
      !newName &&
      !newPrice &&
      newPrice !== 0 &&
      !newDescription &&
      !newImageUrl
    ) {
      res.status(400);
      throw new Error("Dados para edição faltantes. Verifique-os.");
    }

    /* productToEdit.id = newId || productToEdit.id;
    productToEdit.name = newName || productToEdit.name;
    productToEdit.price =
      newPrice === 0 || newPrice ? newPrice : productToEdit.price;
    productToEdit.description = newDescription || productToEdit.description;
    productToEdit.imageUrl = newImageUrl || productToEdit.imageUrl; */

    const [product] = await db.raw(`
    SELECT * FROM products
    WHERE id = "${idProductToEdit}";
  `); // desestruturamos para encontrar o primeiro item do array

    // se existir, aí sim podemos editá-lo
    if (product) {
      await db.raw(`
        UPDATE products
        SET
          id = "${newId || product.id}",
          name = "${newName || product.name}",
          price = ${newPrice === 0 || newPrice ? newPrice : product.price},
          description = "${newDescription || product.description}",
          imageUrl = "${newImageUrl || product.imageUrl}"
        WHERE
          id = "${idProductToEdit}";
      `);
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send("Produto atualizado com sucesso.");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});

/* Create purchase */
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const buyer = req.body.buyer as string;
    const totalPrice = req.body.totalPrice as number;
    const products = req.body.products;

    if (!id || !buyer || !products || totalPrice <= 0) {
      res.status(400);
      throw new Error("Dados faltantes. Confira!");
    }
    // Conferência id purchase
    const currentPurchases = await db.raw(`
      SELECT * FROM purchases
      WHERE id = "${id}";
    `);

    if (currentPurchases.length > 0) {
      res.status(400);
      throw new Error("'id' já existente.");
    }

    // Conferência id buyer
    const userExists = await db.raw(`
      SELECT * FROM users
      WHERE id = "${buyer}";
    `);

    if (userExists.length <= 0) {
      res.status(404);
      throw new Error("Usuário não existe. Verifiquye o Id do comprador");
    }

    if (typeof totalPrice !== "number") {
      res.status(422);
      throw new Error("'totalPrice' deve ser um número");
    }

    // Conferência products
    if (!Array.isArray(products)) {
      res.status(422);
      throw new Error("'products' deve ser um array");
    }

    products.forEach(async (product) => {
      const productId = await db.raw(`
        SELECT * FROM products
        WHERE id = "${product.id}";
      `);
      if (productId.length <= 0) {
        res.status(404);
        throw new Error("'id' de produto inválido");
      }

      await db.raw(`
        INSERT INTO purchases_products(purchase_id, product_id, quantity)
        VALUES
          ("${id}" , "${product.id}" , ${product.quantity} );
      `);
    });

    await db.raw(`
    INSERT INTO purchases(id,buyer,total_price, created_at)
    VALUES
      ("${id}", "${buyer}", ${totalPrice}, DATETIME("now"));
    `);

    res.status(200).send("Deu certo");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});

/* delete purchase by id */
app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id as string;
    // validação: checar se o item existe antes de deletá-lo
    const [purchase] = await db.raw(`
    SELECT * FROM purchases
    WHERE id = "${idToDelete}";
  `); // desestruturamos para encontrar o primeiro item do array

    if (!purchase) {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    // se chegou até aqui é porque podemos deletar
    await db.raw(`
    DELETE FROM purchases
    WHERE id = "${idToDelete}";
  `);

    await db.raw(`
    DELETE FROM purchases_products
    WHERE purchase_id = "${idToDelete}";
  `);

    res.status(200).send({ message: "User deletado com sucesso" });
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});
