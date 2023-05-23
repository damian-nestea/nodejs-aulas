import { countries } from "./countries.js";

const name = process.argv[2];
const code = process.argv[3];

if (name && code) {
  const newCountry = {
    name,
    code,
  };
  countries.push(newCountry);
  countries.sort((a, b) => {
    let x = a.name.toLowerCase();
    let y = b.name.toLowerCase();
    return x == y ? 0 : x > y ? 1 : -1;
  });
  console.log(countries);
} else {
  console.log("Verifique os dados!");
}
