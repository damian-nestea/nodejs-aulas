import {
  users,
  products,
  createUser,
  getAllUsers,
  createProduct,
  getAllProducts,
  searchProductsByName,
} from "./database";

console.log("Exercício criado!");

console.log("Usuarios:");
console.log(users);

console.log("___________________");
console.log("Produtos:");
console.log(products);

//chamada de funções de criação e retorno de usuários
createUser("u003", "Astrodev", "astrodev@email.com", "astrodev99");
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
