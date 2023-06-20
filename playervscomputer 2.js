var board;
let restartButton = document.getElementById('resetButton');
let playerChanceLabel = document.getElementById('playerChanceLabel');
let winningPlayer = document.getElementById('winningPlayer');
var currentMode = document.getElementById('currentMode');
currentMode.style.fontStyle = 'italic';
currentMode.innerHTML = 'Player vs Computer (Medium)';
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
        const var1 = element.id;
        const [row, col] = var1.split('-').map(Number);
        board[row][col] = currPlayer;
        playerTurn = false;
  
        // Check for a winner
        if (checkWinner(currPlayer)) {
            var a;
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
  array.forEach(element => {
    element.innerHTML = '';
    element.style.cursor = 'pointer';
  });
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
  playerChanceLabel.innerHTML = `${currPlayerName} (O) Chance`;
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
      animationVar = combination;
      flashingAnimation(animationVar);
      return true;
    }
  }
  return false;
}


function flashingAnimation(combination) {
  var elements = [];
  console.log(combination);
  for (var i = 0; i < combination.length; i++) {
    var rowIndex = combination[i][0];
    var columnIndex = combination[i][1];
    var elementId = rowIndex + '-' + columnIndex;

    // Store the elements in an array
    elements.push(elementId);
  }
  Animation(elements);
}

function Animation(elementsList) {
  const fadeOutDuration = 300; // Duration for fading out in milliseconds
  const blankDuration = 50; // Duration for keeping the symbols blank in milliseconds
  const fadeInDuration = 300; // Duration for fading in in milliseconds
  const repeatCount = 2; // Number of repetitions

  const element1 = document.getElementById(elementsList[0]);
  const element2 = document.getElementById(elementsList[1]);
  const element3 = document.getElementById(elementsList[2]);

  const originalContent1 = element1.innerText;
  const originalContent2 = element2.innerText;
  const originalContent3 = element3.innerText;

  let repetition = 0;
  e1 = document.getElementById(elementsList[0]);
  e2 = document.getElementById(elementsList[1]);
  e3 = document.getElementById(elementsList[2]);
  animate();

  function animate() {

    if (repetition < repeatCount) {
      // Clear existing content
      e1.innerHTML = '';
      e2.innerHTML = '';
      e3.innerHTML = '';

      // Create fade element for text
      const fadeElement1 = document.createElement('span');
      const fadeElement2 = document.createElement('span');
      const fadeElement3 = document.createElement('span');

      fadeElement1.innerText = originalContent1;
      fadeElement2.innerText = originalContent2;
      fadeElement3.innerText = originalContent3;

      // Append fade element
      element1.appendChild(fadeElement1);
      element2.appendChild(fadeElement2);
      element3.appendChild(fadeElement3);

      // Animate fade out
      fadeElement1.classList.add('fade-out');
      fadeElement2.classList.add('fade-out');
      fadeElement3.classList.add('fade-out');

      setTimeout(function () {
        // Set symbols to blank
        fadeElement1.innerText = '';
        fadeElement2.innerText = '';
        fadeElement3.innerText = '';

        // Animate fade in
        fadeElement1.classList.remove('fade-out');
        fadeElement2.classList.remove('fade-out');
        fadeElement3.classList.remove('fade-out');

        fadeElement1.classList.add('fade-in');
        fadeElement2.classList.add('fade-in');
        fadeElement3.classList.add('fade-in');

        setTimeout(function () {
          // Restore original symbols
          element1.innerHTML = originalContent1;
          element2.innerHTML = originalContent2;
          element3.innerHTML = originalContent3;

          repetition++;
          animate();
        }, fadeInDuration);
      }, fadeOutDuration + blankDuration);
    }
  }
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

function makeComputerMove() {
    // Check if it's the computer's turn
    if (currPlayer === playerX && !gameOver) {
        let availableMoves = [];
        
        // Iterate through each empty cell on the board
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === ' ') {
                    // Add available moves to the list
                    availableMoves.push({ row: i, col: j });
                }
            }
        }
        
        // Choose a random move from the available moves
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        const { row, col } = randomMove;
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

            currPlayerName = localStorage.getItem('difficultyLevelsplayer1Name');
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
            currPlayerName = localStorage.getItem('difficultyLevelsplayer1Name');
            playerChanceLabel.innerHTML = `${currPlayerName}'s (O) Chance`;
        }
    }
}
  

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
      playerChanceLabel.innerHTML = `${currPlayerName}'s (O) Chance`;
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