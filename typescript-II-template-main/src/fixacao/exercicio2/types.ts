/* EXERCÍCIO DE FIXAÇÃO
Considere que você esteja implementando uma rede social composta por posts de usuários. Cada um dos posts possui um 
autor e um texto. Abaixo, temos um exemplo de array de posts em JS!

Tendo isso em mente, faça o que se pede:
*/

/* 
1. Crie um type para representar um post;
2. Utilize o tipo criado acima para fazer a tipagem do array posts;
3. Analise a função buscarPostsPorAutor, escrita em JS:
  a. Quais são as entradas e saídas dessa função? 
  b. Faça a tipagem da função.
*/

export type TPost = {
  autor: string;
  texto: string;
};
