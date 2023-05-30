"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log("Exercício criado!");
console.log("Usuarios:");
console.log(database_1.users);
console.log("___________________");
console.log("Produtos:");
console.log(database_1.products);
(0, database_1.createUser)("u003", "Astrodev", "astrodev@email.com", "astrodev99");
console.log((0, database_1.getAllUsers)());
(0, database_1.createProduct)("prod003", "SSD gamer", 349.99, "Acelere seu sistema com velocidades incríveis de leitura e gravação.", "https://picsum.photos/seed/Mouse%20gamer/400");
console.log((0, database_1.getAllProducts)());
console.log((0, database_1.searchProductsByName)("88"));
//# sourceMappingURL=index.js.map