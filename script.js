const container = document.querySelector("#container"); // Seleciona o elemento container
const botoaReiniciar = document.querySelector("button"); // Botão para reiniciar
let cartas;
let primeiraCarta = "";
let segundaCarta = "";

botoaReiniciar.addEventListener("click", () => location.reload()); //Clica no botão para reiniciar

let items = [
  { nome: "aboboras", imagem: "./assets/img/aboboras.png" },
  { nome: "caveira", imagem: "./assets/img/caveira.png" },
  { nome: "ciclope", imagem: "./assets/img/ciclope.png" },
  { nome: "cova", imagem: "./assets/img/cova.png" },
  { nome: "frank", imagem: "./assets/img/frank.png" },
  { nome: "morte", imagem: "./assets/img/morte.png" },
  { nome: "ossos", imagem: "./assets/img/ossos.png" },
  { nome: "vampiro", imagem: "./assets/img/vampiro.png" },
]; //Array com as cartas

// duplicar o array de cartas e embaralhar os itens 

function criarCartas() {
  let itemsDuplicados = [...items, ...items];
  let halloween = itemsDuplicados.sort(() => Math.random() - 0.5);

  halloween.map((animal) => {
    container.innerHTML += `
    <div class="carta" data-carta=${animal.nome}>
    <div class="atras">?</div>
    <div class="frente">
      <img src=${animal.imagem} width="180px" height="180px" />
    </div>`; // a frente da carta com a imagem e o verso com ?
  });
}
criarCartas();

//adicionar comportamento de virar as cartas e chmar a função para verificar
function virarCarta() {
  cartas = document.querySelectorAll(".carta");

  cartas.forEach((carta) => {
    carta.addEventListener("click", () => {
      if (primeiraCarta == "") {
        carta.classList.add("carta-virada");
        primeiraCarta = carta;
      } else if (segundaCarta == "") {
        carta.classList.add("carta-virada");
        segundaCarta = carta;
        checarCartas(carta);
      }
    });
  });
}
virarCarta();

//Se as cartas viradas forem iguais tem o msm valor e permanecem viradas.
//Senão elas são desviradas apos meio segundo 

function checarCartas() {
  const primeiroAnimal = primeiraCarta.getAttribute("data-carta");
  const segundoAnimal = segundaCarta.getAttribute("data-carta");

  if (primeiroAnimal == segundoAnimal) {
    primeiraCarta = "";
    segundaCarta = "";
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove("carta-virada");
      segundaCarta.classList.remove("carta-virada");

      primeiraCarta = "";
      segundaCarta = "";
    }, 600);
  }
}