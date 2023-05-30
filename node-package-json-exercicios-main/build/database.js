"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchProductsByName = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.products = exports.users = void 0;
exports.users = [
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
exports.products = [
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
const createUser = (id, name, email, password) => {
    const user = {
        id,
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
    };
    exports.users.push(user);
    console.log("Cadastro realizado com sucesso!");
};
exports.createUser = createUser;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
const createProduct = (id, name, price, description, imageUrl) => {
    const product = {
        id,
        name,
        price,
        description,
        imageUrl,
    };
    exports.products.push(product);
    console.log("Produto criado com sucesso!");
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const searchProductsByName = (name) => {
    return exports.products.filter((product) => {
        return product.name.toLowerCase().includes(name.toLowerCase());
    });
};
exports.searchProductsByName = searchProductsByName;
//# sourceMappingURL=database.js.map