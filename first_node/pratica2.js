/* Prática guiada 2 */

import { countries } from "./countries.js";

const paisBuscado = process.argv[2];

if (!paisBuscado) {
  console.log("Falta passar o país desejado!");
} else {
  const resultadoBusca = countries.filter((country) => {
    return country.name[0].toLowerCase().includes(paisBuscado.toLowerCase());
  });
  console.log(resultadoBusca);
}
