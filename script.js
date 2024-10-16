const container = document.querySelector("#container"); // Seleciona o elemento container onde as cartas serão colocadas
const botoaReiniciar = document.querySelector("button"); // Botão para reiniciar
const tempoDisplay = document.querySelector("#tempo"); // Exibe o tempo

let cartas; // Armazena todas as cartas do jogo
let primeiraCarta = ""; //Armazena as cartas que vão ser viradas
let segundaCarta = ""; //Armazena as cartas que vão ser viradas
let paresFormados = 0; // Conta quantos pares o jogador encontrou
let totalPares = 8; // Número de pares no jogo
let tempo = 0; //Armazena o tempo decorrido desde que o jogo começou.
let intervalo;
let jogoIniciado = false; // Verifica se o jogo já começou

botoaReiniciar.addEventListener("click", () => location.reload()); // Reinicia o jogo

let items = [
  { nome: "aboboras", imagem: "./assets/img/aboboras.png" },
  { nome: "caveira", imagem: "./assets/img/caveira.png" },
  { nome: "ciclope", imagem: "./assets/img/ciclope.png" },
  { nome: "cova", imagem: "./assets/img/cova.png" },
  { nome: "frank", imagem: "./assets/img/frank.png" },
  { nome: "morte", imagem: "./assets/img/morte.png" },
  { nome: "ossos", imagem: "./assets/img/ossos.png" },
  { nome: "vampiro", imagem: "./assets/img/vampiro.png" },
]; //Todas as cartinhas que usei no código 

// Função para criar cartas
function criarCartas() {
  let itemsDuplicados = [...items, ...items]; //Duplica as cartas para criar um par de cada uma.
  let halloween = itemsDuplicados.sort(() => Math.random() - 0.5); //Embaralha as cartas

//Percorre cada carta e insere o html para cada uma delas e um ? para o verso
  halloween.map((rip) => {
    container.innerHTML += `
    <div class="carta" data-carta=${rip.nome}>
      <div class="atras">?</div>
      <div class="frente">
        <img src=${rip.imagem} width="180px" height="180px" />
      </div>
    </div>`;
  });
}

criarCartas();

// Função para virar as cartas
function virarCarta() {
  cartas = document.querySelectorAll(".carta");

  cartas.forEach((carta) => {
    carta.addEventListener("click", () => {
      if (!jogoIniciado) {
        iniciarContador(); // Inicia o contador no primeiro clique
        jogoIniciado = true;
      }

      if (primeiraCarta === "") {
        carta.classList.add("carta-virada");
        primeiraCarta = carta;
      } else if (segundaCarta === "") {
        carta.classList.add("carta-virada");
        segundaCarta = carta;
        checarCartas();
      }
    });
  });
}
virarCarta();

// Função para verificar se as cartas viradas são iguais
function checarCartas() {
    const primeiroAnimal = primeiraCarta.getAttribute("data-carta");
    const segundoAnimal = segundaCarta.getAttribute("data-carta");
  
    if (primeiroAnimal === segundoAnimal) {
      paresFormados++; // Incrementa o número de pares formados
      resetarCartas(); // Reseta as variáveis de controle
      if (paresFormados === totalPares) {
        pararContador(); // Para o contador quando todos os pares forem formados
        
      }
    } else {
      setTimeout(() => {
        primeiraCarta.classList.remove("carta-virada");
        segundaCarta.classList.remove("carta-virada");
        resetarCartas(); // Reseta as variáveis de controle
      }, 600); // Espera 600ms antes de desvirar as cartas
    }
  }
  

// Função para resetar as variáveis de controle das cartas
function resetarCartas() {
  primeiraCarta = "";
  segundaCarta = "";
}

// Função para iniciar o contador
function iniciarContador() {
  intervalo = setInterval(() => {
    tempo++;
    tempoDisplay.textContent = `Tempo: ${tempo}s`;
  }, 1000);
}

// Função para parar o contador
function pararContador() {
  clearInterval(intervalo);
}
