import { getRndInteger } from "./get-rnd-integer.js";

const opcoesJogo = ["pedra", "papel", "tesoura"];
const jogoUsuario = { user: "Jogador 1", option: process.argv[2] };
const jogoPc = { user: "PC", option: opcoesJogo[getRndInteger(0, 2)] };

const opcaoUsuarioValida = () => {
  return jogoUsuario.toLowerCase() === "pedra" ||
    jogoUsuario.toLowerCase() === "papel" ||
    jogoUsuario.toLowerCase() === "tesoura"
    ? true
    : false;
};

if (jogoUsuario && opcaoUsuarioValida() === true) {
  console.log("dado válido");
} else {
  console.log("Opcão inválida ou faltante. Tente de novo!");
}
