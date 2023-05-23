/* Jogo par impar */

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

const parOuImparUsuario = process.argv[2];
const numeroUsuario = Number(process.argv[3]);
const parOuImparPc = parOuImparUsuario === "par" ? "impar" : "par";
const numeroPc = getRndInteger(0,5);
const resultado = numeroUsuario + numeroPc;

if(numeroUsuario && parOuImparUsuario){
    console.log("Escolha do usuário:" , parOuImparUsuario)
    console.log("Numero do Usuário:",numeroUsuario);
    console.log("-----------------------");
    console.log("Escolha do Pc:" , parOuImparPc);
    console.log("Numero do PC:", numeroPc);
    console.log("Resultado:",resultado);
    ((resultado % 2 == 0 &&  parOuImparUsuario =="par") || (resultado % 2 != 0 &&  parOuImparUsuario =="impar")) ?
        console.log(`Você escolheu ${parOuImparUsuario} e o computador escolheu ${parOuImparPc}. O resultado foi ${resultado}. Você ganhou!`) :
        console.log(`Você escolheu ${parOuImparUsuario} e o computador escolheu ${parOuImparPc}. O resultado foi ${resultado}. Você perdeu!`);
}else{
    console.log("Digite todos os campos requeridos!");
}