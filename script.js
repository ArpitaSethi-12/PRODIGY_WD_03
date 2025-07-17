let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let playWithAI = false;

const statusDisplay = document.getElementById("status");
const boardElement = document.getElementById("board");
const modeSelect = document.getElementById("mode");

function handleCellClick(index) {
  if (!gameActive || board[index] !== "") return;

  makeMove(index);

  if (playWithAI && gameActive && currentPlayer === "O") {
    setTimeout(aiMove, 500);
  }
}

function makeMove(index) {
  board[index] = currentPlayer;
  renderBoard();
  if (checkWin()) {
    statusDisplay.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (!board.includes("")) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `${currentPlayer}'s turn`;
  }
}

function aiMove() {
  const emptyIndices = board.map((val, i) => val === "" ? i : null).filter(i => i !== null);
  if (emptyIndices.length > 0) {
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeMove(randomIndex);
  }
}

function checkWin() {
  const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winConditions.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.textContent = cell;
    cellElement.addEventListener("click", () => handleCellClick(index));
    boardElement.appendChild(cellElement);
  });
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  playWithAI = modeSelect.value === "ai";
  statusDisplay.textContent = `${currentPlayer}'s turn`;
  renderBoard();
}

modeSelect.addEventListener("change", restartGame);

renderBoard();
statusDisplay.textContent = `${currentPlayer}'s turn`;
