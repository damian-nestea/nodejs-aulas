import { getRndInteger } from "./get-rnd-integer.js";

const opcoesJogo = ["pedra", "papel", "tesoura"];
const jogoUsuario = { user: "Jogador 1", jogo: process.argv[2] };
const jogoPc = { user: "PC", jogo: opcoesJogo[getRndInteger(0, 2)] };

const jogoUsuarioValido = () => {
  if (jogoUsuario.jogo) {
    return jogoUsuario.jogo.toLowerCase() === "pedra" ||
      jogoUsuario.jogo.toLowerCase() === "papel" ||
      jogoUsuario.jogo.toLowerCase() === "tesoura"
      ? true
      : false;
  }
};

const confereGanhador = () => {
  return jogoUsuario.jogo === "pedra" && jogoPc.jogo === "tesoura"
    ? "user"
    : jogoUsuario.jogo === "papel" && jogoPc.jogo === "pedra"
    ? "user"
    : jogoUsuario.jogo === "tesoura" && jogoPc.jogo === "papel"
    ? "user"
    : "pc";
};

if (jogoUsuarioValido()) {
  if (jogoUsuario.jogo === jogoPc.jogo) {
    console.log(
      `O Jogador 1 escolheu ${jogoUsuario.jogo} e o PC escolheu ${jogoPc.jogo}. Empate!`
    );
  } else {
    confereGanhador() === "user"
      ? console.log(
          `O ${jogoUsuario.user} escolheu ${jogoUsuario.jogo} e o ${jogoPc.user} escolheu ${jogoPc.jogo}. O ${jogoUsuario.user} ganhou!`
        )
      : console.log(
          `O ${jogoUsuario.user} escolheu ${jogoUsuario.jogo} e o ${jogoPc.user} escolheu ${jogoPc.jogo}. O ${jogoPc.user} ganhou!`
        );
  }
} else {
  console.log("Opcão inválida ou faltante. Tente de novo!");
}
