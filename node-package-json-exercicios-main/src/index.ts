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
import { throws } from "assert";

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
app.get("/users", (req: Request, res: Response) => {
  try {
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send("Erro na requisição.");
  }
});

/* Get all products */
app.get("/products", (req: Request, res: Response) => {
  try {
    res.status(200).send(products);
  } catch (error) {
    res.status(400).send("Erro na requisição");
  }
});

/* Get product by name */
app.get("/product", (req: Request, res: Response) => {
  const name = req.query.name as string;
  const response: TProduct[] = products.filter((product) => {
    return product.name.toLowerCase().includes(name.toLowerCase());
  });
  res.status(200).send(response ? response : products);
});

/* Create user */
app.post("/users", (req: Request, res: Response) => {
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

    users.push(newUser);
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
app.post("/products", (req: Request, res: Response) => {
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

    products.push(newProduct);
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
app.put("/products/:id", (req: Request, res: Response) => {
  try {
    const idProductToEdit = req.params.id;
    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    /* Verifica se existe o produto a editar */
    const productToEdit = products.find((product) => {
      return product.id === idProductToEdit;
    });
    if (!productToEdit) {
      res.status(404);
      throw new Error("Produto não encontrado");
    }

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

    productToEdit.id = newId || productToEdit.id;
    productToEdit.name = newName || productToEdit.name;
    productToEdit.price =
      newPrice === 0 || newPrice ? newPrice : productToEdit.price;
    productToEdit.description = newDescription || productToEdit.description;
    productToEdit.imageUrl = newImageUrl || productToEdit.imageUrl;
    res.status(200).send("Produto atualizado com sucesso.");
  } catch (error) {
    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.status(500).send("Unexpected Error");
    }
  }
});
