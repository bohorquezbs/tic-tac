// Variables globales
let board = ['', '', '', '', '', '', '', '', '']; // Representa el tablero
let currentPlayer = 'x'; // Jugador actual
let isGameActive = true; // Estado del juego
let scoreX = 0;
let scoreO = 0;
let ties = 0;

// Elementos del DOM
const boardItems = document.querySelectorAll('.board_item');
const turnDisplay = document.querySelector('.turn span');
const scoreXDisplay = document.querySelector('.score_item-x .score');
const scoreODisplay = document.querySelector('.score_item-o .score');
const scoreTiesDisplay = document.querySelector('.score_item-ties .score');
const modal = document.querySelector('.modal');
const winnerIcon = document.querySelector('#winner');
const restartButton = document.getElementById('restart');
const quit = document.querySelectorAll('.btn')
// Función para manejar el clic en una casilla
function handleCellClick(index) {
    if (board[index] === '' && isGameActive) {
        board[index] = currentPlayer;
        renderBoard();
        checkWinner();
        switchPlayer();
    }
}

// Función para renderizar el tablero
function renderBoard() {
    boardItems.forEach((item, index) => {
        item.innerHTML = board[index] ? `<svg class="icon ${board[index].toLowerCase()}"><use xlink:href="./icons/icon-${board[index].toLowerCase()}.svg#icon-${board[index].toLowerCase()}"></use></svg>` : '';
    });
    turnDisplay.textContent = currentPlayer;
}

// Función para verificar el ganador
function checkWinner() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            isGameActive = false;
            showWinner(board[a]);
            return;
        }
    }

    // Comprobar si hay un empate
    if (!board.includes('')) {
        isGameActive = false;
        ties++;
        scoreTiesDisplay.textContent = ties;
        showTie();
    }
}

// Función para mostrar el ganador
function showWinner(winner) {
    if (winner === 'X') {
        scoreX++;
        scoreXDisplay.textContent = scoreX;
        winnerIcon.setAttribute('xlink:href', './icons/icon-x.svg#icon-x');
    } else {
        scoreO++;
        scoreODisplay.textContent = scoreO;
        winnerIcon.setAttribute('xlink:href', './icons/icon-o.svg#icon-o');
    }
    modal.classList.remove('d-none');
}

// Función para mostrar empate
function showTie() {
    modal.classList.remove('d-none');
    winnerIcon.setAttribute('xlink:href', ''); // No hay ganador
}

// Función para cambiar de jugador
function switchPlayer() {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    turnDisplay.textContent = currentPlayer;
}

// Función para reiniciar el juego
function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'x';
    isGameActive = true;
    renderBoard();
    modal.classList.add('d-none');

}
restartGame()
function cero() {
    scoreXDisplay.innerHTML = ""
    board.forEach((element) => {
        const scoreX = `
          <span class="score">${element}</span>
            `
        scoreXDisplay.innerHTML += scoreX
    })
}
cero()
function score() {
    scoreTiesDisplay.innerHTML = ""
    board.forEach((element) => {
        const scoreTies = `
          <span class="score">${element}</span>
            `
        scoreTiesDisplay.innerHTML += scoreTies
    })
}
score()
function scoreDisplay() {
    scoreODisplay.innerHTML = ""
    board.forEach((element) => {
        const score0 = `
          <span class="score">${element}</span>
            `
        scoreODisplay.innerHTML += score0
    })
}
scoreDisplay()
// Event listeners para las casillas
boardItems.forEach((item, index) => {
    item.addEventListener('click', () => handleCellClick(index));
});

// Event listener para el botón de reinicio
restartButton.addEventListener('click', restartGame);

