var board;
let restartButton = document.getElementById('resetButton');
let playerChanceLabel = document.getElementById('playerChanceLabel');
let winningPlayer = document.getElementById('winningPlayer');
var currentMode = document.getElementById('currentMode');
currentMode.style.fontStyle = 'italic';
currentMode.innerHTML = 'Player vs Computer (Extreme)';
currentMode.style.left = '80.2%'
const playerO = 'O';
const playerX = 'X';
let currPlayer = playerO;
let currPlayerName = localStorage.getItem('difficultyLevelsplayer1Name');
var playerOName = 'Your';
var playerXName = 'Computer';  // Name for player X
let gameOver = false;
var playerTurn = true;

// Rest of the code...



board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

const winningCombinations = [
  // Rows
  [[0, 0], [0, 1], [0, 2]], // Top row
  [[1, 0], [1, 1], [1, 2]], // Middle row
  [[2, 0], [2, 1], [2, 2]], // Bottom row
  
  // Columns
  [[0, 0], [1, 0], [2, 0]], // Left column
  [[0, 1], [1, 1], [2, 1]], // Middle column
  [[0, 2], [1, 2], [2, 2]], // Right column
  
  // Diagonals
  [[0, 0], [1, 1], [2, 2]], // Top-left to bottom-right diagonal
  [[0, 2], [1, 1], [2, 0]]  // Top-right to bottom-left diagonal
];

var menu = document.getElementById('menu');
var menuContainer = document.getElementById('menuContainer');
var menuElement = document.getElementById('menuElement');
var isMenuOpen = false;
var difficultySelect = document.getElementById('difficultySelect');

menuContainer.addEventListener('click', function() {
    isMenuOpen = !isMenuOpen; // Toggle the menu's visibility state
    if (isMenuOpen) {
        menuElement.style.left = '0';
        menuElement.style.zIndex = '1'; // Set a lower z-index when the menu is open
        menu.style.transform = 'rotate(90deg)'; // Rotate the menu icon
        menu.classList.remove('fa-bars');
        menu.classList.add('fa-xmark');
    } else {
        menuElement.style.left = '-250px';
        menuElement.style.zIndex = '-1'; // Set a lower z-index when the menu is closed
        menu.style.transform = 'rotate(0deg)'; // Rotate the menu icon back to its original position
        menu.classList.add('fa-bars');
        menu.classList.remove('fa-xmark');
    } 
});

function displayArray(array) {
  console.clear()
  const formattedArray = array.map(row => JSON.stringify(row));
  const result = `[\n    ${formattedArray.join(',\n    ')}\n]\n`;
  console.log(result);
}

window.onload = createBoard();

function createBoard() {
  for(let r = 0; r < 3; r++) {
    for(let c = 0; c < 3; c++) {
      let tile = document.createElement('div');
      tile.id = r.toString() + '-' + c.toString();
      tile.classList.add('tile');
      if(r == 0 || r == 1) {
        tile.classList.add('horizontal-line');
      }
      if(c == 0 || c == 1) {
        tile.classList.add('vertical-line');
      }
      document.getElementById('board').append(tile);
      document.getElementById(`${r}-${c}`).style.cursor = 'pointer';
    }
  }
  
}

let box1 = document.getElementById('0-0');
let box2 = document.getElementById('0-1');
let box3 = document.getElementById('0-2');
let box4 = document.getElementById('1-0');
let box5 = document.getElementById('1-1');
let box6 = document.getElementById('1-2');
let box7 = document.getElementById('2-0');
let box8 = document.getElementById('2-1');
let box9 = document.getElementById('2-2');

array = [
  box1,
  box2,
  box3,
  box4,
  box5,
  box6,
  box7,
  box8,
  box9
];

array.forEach(element => {
    element.addEventListener('click', function () {
      if (!gameOver && playerTurn && element.innerHTML === '') {
        // Make the player's move
        element.innerHTML = currPlayer;
        playerTurn = false;
        const var1 = element.id;
        const [row, col] = var1.split('-').map(Number);
        board[row][col] = currPlayer;
  
        // Check for a winner
        if (checkWinner(currPlayer)) {
          winningPlayer.style.display = 'block';
          if(currPlayerName === 'Your' || currPlayerName === 'You') {
            a = 'Win';
          } else {
            a = 'Wins';
          }
          currPlayerName = localStorage.getItem('difficultyLevelsplayer1Name');
          winningPlayer.innerHTML = `${currPlayerName.replace('Your', 'You')} ${a}`;
          playerChanceLabel.innerHTML = 'Game Over';
          gameOver = true;
        } else if (isBoardFull()) {
          winningPlayer.style.display = 'block';
          winningPlayer.innerHTML = `It's a tie!`;
          playerChanceLabel.innerHTML = 'Game Over';
          gameOver = true;
        } else {
          // Switch to the computer's turn
          currPlayer = playerX;
          currPlayerName = playerXName;
          playerChanceLabel.innerHTML = `${currPlayerName}'s (X) Chance`;
  
          // Make the computer's move after a short delay
          setTimeout(makeComputerMove, 800);
          
        }
      }
    });
  });

function resetBoard() {
  
  board = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
  ];
  displayArray(board);
  currPlayer = playerO;
  gameOver = false;
  winningPlayer.innerHTML = '';
  currPlayerName = localStorage.getItem('difficultyLevelsplayer1Name');
  playerChanceLabel.innerHTML = `${currPlayerName}'s (O) Chance`;
  if (currentMode.innerHTML === 'Player vs Computer') {
    if (currPlayerName === 'Computer') {
      makeComputerMove();
    }
  }
}

function checkWinner(player) {
  for (let i = 0; i < winningCombinations.length; i++) {
    const combination = winningCombinations[i];
    let hasWon = true;
    for (let j = 0; j < combination.length; j++) {
      const position = combination[j];
      const row = position[0];
      const col = position[1];
      if (board[row][col] !== player) {
        hasWon = false;
        break;
      }
    }
    if (hasWon) {
      return true;
    }
  }
  return false;
}

function isBoardFull() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === ' ') {
        return false;
      }
    }
  }
  return true;
}

function switchPlayer() {
  currPlayer = currPlayer === playerO ? playerX : playerO;
  currPlayerName = currPlayer === playerO ? playerOName : playerXName;
  currPlayerName = localStorage.getItem('difficultyLevelsplayer1Name');
  playerChanceLabel.innerHTML = `${currPlayerName}'s (${currPlayer}) Chance`;
}

// ...

// Function to make the computer's move
function makeComputerMove() {
    
    // Check if it's the computer's turn
    if (currPlayer === playerX && !gameOver) {
      let bestScore = -Infinity;
      let bestMove;
  
      // Iterate through each empty cell on the board
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === ' ') {
            // Simulate the computer's move
            board[i][j] = playerX;
  
            // Evaluate the resulting board state
            let score = minimax(board, 0, false, -Infinity, Infinity);
  
            // Undo the simulated move
            board[i][j] = ' ';
  
            // Update the best move if the current move has a higher score
            if (score > bestScore) {
              bestScore = score;
              bestMove = { row: i, col: j };
            }
          }
        }
      }
  
      // Make the computer's move
      const { row, col } = bestMove;
      const boxId = `${row}-${col}`;
      const box = document.getElementById(boxId);
      box.innerHTML = playerX;
      board[row][col] = playerX;
      playerTurn = true;
      // Check for a winner
      if (checkWinner(playerX)) {
        winningPlayer.style.display = 'block';
        if(playerXName === 'Your') {
          playerXName = 'You';
        }
        winningPlayer.innerHTML = `${playerXName} Wins!`;
        playerChanceLabel.innerHTML = 'Game Over';
        gameOver = true;
      } else if (isBoardFull()) {
        winningPlayer.style.display = 'block';
        winningPlayer.innerHTML = `It's a tie!`;
        playerChanceLabel.innerHTML = 'Game Over';
        gameOver = true;
      } else {
        // Switch back to the player's turn
        currPlayer = playerO;
        currPlayerName = playerOName;
        playerChanceLabel.innerHTML = `${currPlayerName}'s (O) Chance`;
      }
      
    }
    
  }
  
  // Minimax algorithm with alpha-beta pruning for evaluating board states
  function minimax(board, depth, isMaximizingPlayer, alpha, beta) {
    if (checkWinner(playerO)) {
      return -1;
    } else if (checkWinner(playerX)) {
      return 1;
    } else if (isBoardFull()) {
      return 0;
    }
  
    if (isMaximizingPlayer) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === ' ') {
            board[i][j] = playerX;
            let score = minimax(board, depth + 1, false, alpha, beta);
            board[i][j] = ' ';
            bestScore = Math.max(score, bestScore);
            alpha = Math.max(alpha, bestScore);
            if (beta <= alpha) {
              break;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === ' ') {
            board[i][j] = playerO;
            let score = minimax(board, depth + 1, true, alpha, beta);
            board[i][j] = ' ';
            bestScore = Math.min(score, bestScore);
            beta = Math.min(beta, bestScore);
            if (beta <= alpha) {
              break;
            }
          }
        }
      }
      return bestScore;
    }
  }
  
  // ...
  
  

function getAvailableMoves() {
  const availableMoves = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] === ' ') {
        availableMoves.push([row, col]);
      }
    }
  }
  return availableMoves;
}

function displayArray(array) {
  console.clear();
  const formattedArray = array.map(row => JSON.stringify(row));
  const result = `[\n    ${formattedArray.join(',\n    ')}\n]\n`;
  console.log(result);
}

restartButton.addEventListener('click', function() {
    gameOver = false;
      currPlayer = playerO;
      currPlayerName = 'Player O';
      winningPlayer.style.display = 'none';
      currPlayerName = localStorage.getItem('difficultyLevelsplayer1Name');
      playerChanceLabel.innerHTML = `${currPlayerName}'s Chance`;
      playerTurn = true;
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          let tile = document.getElementById(`${r}-${c}`);
          tile.innerHTML = '';
          tile.style.cursor = 'pointer';
        }
      }

      board = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
      ];
});