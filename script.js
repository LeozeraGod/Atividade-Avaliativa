const gameBoard = document.getElementById('game-board');

// Pares de valores para as cartas
const cardValues = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍍', '🍓', '🍋', 
                    '🍎', '🍌', '🍇', '🍉', '🍒', '🍍', '🍓', '🍋'];

// Embaralha as cartas
const shuffledValues = cardValues.sort(() => 0.5 - Math.random());

// Variáveis para armazenar cartas viradas
let firstCard = null;
let secondCard = null;

// Função para criar o tabuleiro
function createBoard() {
  shuffledValues.forEach(value => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${value}</div>
        <div class="card-back"></div>
      </div>
    `;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

// Função para virar as cartas
function flipCard() {
  // Não permitir clique se a carta já está virada
  if (this.classList.contains('flipped')) return;

  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this; // Primeira carta virada
  } else {
    secondCard = this; // Segunda carta virada
    checkForMatch();
  }
}

// Função para verificar se as cartas são iguais
function checkForMatch() {
  const isMatch = firstCard.querySelector('.card-front').textContent === 
                  secondCard.querySelector('.card-front').textContent;

  if (isMatch) {
    // Se for um par, desativa as cartas
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetCards();
  } else {
    // Se não for um par, desvira as cartas
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetCards();
    }, 1000);
  }
}

// Função para resetar as variáveis
function resetCards() {
  firstCard = null;
  secondCard = null;
}

// Inicializa o jogo
createBoard();
