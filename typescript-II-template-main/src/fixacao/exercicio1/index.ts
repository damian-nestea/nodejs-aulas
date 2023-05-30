/* EXERCÍCIO DE FIXAÇÃO
1. Crie um novo objeto. Este objeto é uma pessoa e deve possuir três propriedades:
  a. nome, que é uma string;
  b. idade, que é um número;
  c. corFavorita, que é uma string.



2. Crie mais três objetos, que também precisam ter apenas os campos definidos acima. Crie um type Pessoa para garantir
que todos os objetos tenham as mesmas propriedades.



3. Modifique o type Pessoa para que possamos escolher apenas entre as cores do arco-íris. Utilize um enum para isso.
*/

import { CORES_ARCO_IRIS, TPerson } from "./types";

// 2
const pessoa_1: TPerson = {
  nome: "Damian",
  idade: 35,
  corFavorita: CORES_ARCO_IRIS.AMARELO,
};

const pessoa_2: TPerson = {
  nome: "Brenda",
  idade: 30,
  corFavorita: CORES_ARCO_IRIS.AZUL,
};

const pessoa_3: TPerson = {
  nome: "Isis",
  idade: 2,
  corFavorita: CORES_ARCO_IRIS.VERDE,
};

console.log(pessoa_1);
console.log(pessoa_2);
console.log(pessoa_3);
