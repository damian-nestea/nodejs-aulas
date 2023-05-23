/* process.argv = node[0] | nomeArquivo[1] | infos[2] */
/* const nome = process.argv[2];
const sobrenome = process.argv[3];

console.log(`O primeiro nome é ${nome} e o sobrenome é ${sobrenome}`); */

/* Prática guiada */

import { countries } from "./countries.js";

const paisBuscado = process.argv[2];

if (!paisBuscado) {
  console.log("Falta passar o país desejado!");
} else {
  const resultadoBusca = countries.filter((country) => {
    return country.name.toLowerCase().includes(paisBuscado.toLowerCase());
  });
  console.log(resultadoBusca);
}
