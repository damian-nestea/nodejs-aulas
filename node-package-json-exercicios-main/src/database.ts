import { TUser, TProduct } from "./types";

export const users: TUser[] = [
  {
    id: "u001",
    name: "Damian",
    email: "damian@gmail.com",
    password: "1010101",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u002",
    name: "Brenda",
    email: "brenda@gmail.com",
    password: "dkaskdkas",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u003",
    name: "Isis",
    email: "isis@gmail.com",
    password: "senhaDaIsis",
    createdAt: new Date().toISOString(),
  },
  {
    id: "u004",
    name: "Lana",
    email: "lala@gmail.com",
    password: "parecoOLeoncio",
    createdAt: new Date().toISOString(),
  },
];

export const products: TProduct[] = [
  {
    id: "prod001",
    name: "Mouse",
    price: 250,
    description: "Melhor mouse da história da computação",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
  },
  {
    id: "prod002",
    name: "Teclado",
    price: 550,
    description: "Melhor teclado da história da computação",
    imageUrl: "https://picsum.photos/seed/Monitor/400",
  },
];

// Função para criar usuário
export const createUser = (
  id: string,
  name: string,
  email: string,
  password: string
): void => {
  const user: TUser = {
    id,
    name,
    email,
    password,
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  console.log("Cadastro realizado com sucesso!");
};

// Função pára chamar os usuários
export const getAllUsers = (): TUser[] => {
  return users;
};

// Função para criar produtos
export const createProduct = (
  id: string,
  name: string,
  price: number,
  description: string,
  imageUrl: string
): void => {
  const product: TProduct = {
    id,
    name,
    price,
    description,
    imageUrl,
  };
  products.push(product);
  console.log("Produto criado com sucesso!");
};

// Função para chamar os produtos
export const getAllProducts = (): TProduct[] => {
  return products;
};

// Função para procurar produto por nome
export const searchProductsByName = (name: string): TProduct[] => {
  return products.filter((product) => {
    return product.name.toLowerCase().includes(name.toLowerCase());
  });
};
