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
  res.status(200).send(users);
});

/* Get all products */
app.get("/products", (req: Request, res: Response) => {
  res.status(200).send(products);
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
  const {
    id,
    name,
    email,
    password,
  }: { id: string; name: string; email: string; password: string } = req.body;
  if (id && name && email && password) {
    const newUser: TUser = {
      id,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso");
    console.log(users);
  } else {
    res.status(400).send("Requisição sem os dados necessários");
  }
});

/* Create product */
app.post("/products", (req: Request, res: Response) => {
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
  if (id && name && price && description && imageUrl) {
    const newProduct: TProduct = {
      id,
      name,
      price,
      description,
      imageUrl,
    };
    products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso");
    console.log(products);
  } else {
    res.status(400).send("Requisição sem os dados necessários");
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
