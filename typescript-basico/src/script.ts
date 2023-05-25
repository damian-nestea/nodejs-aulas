let num1 = document.getElementById("num1") as HTMLInputElement;
let num2 = document.getElementById("num2") as HTMLInputElement;

let botao = document.getElementById("somar") as HTMLInputElement;
let res = document.getElementById("resultado") as HTMLInputElement;

function somar(n1: number, n2: number) {
  return n1 * n2;
}

botao.addEventListener("click", function () {
  res.innerHTML = somar(+num1.value, +num2.value).toString();
});
