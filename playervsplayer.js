var board;
var currPlayerName;
var playerO = 'O';
var playerX = 'X';
var currPlayer = playerO;
var gameOver = false;
let restartButton = document.getElementById('resetButton');
let playerChanceLabel = document.getElementById('playerChanceLabel');
let winningPlayer = document.getElementById('winningPlayer');
var currentMode = document.getElementById('currentMode');
currentMode.style.fontStyle = 'italic';
currentMode.innerHTML = 'Player vs Player';
name1 = localStorage.getItem('playerOneName');
name2 = localStorage.getItem('playerTwoName');
nameArray = [name1, name2];
var y = Math.random();
if (y < 0.5)
  y = 0
else
  y = 1
var playerOName = nameArray[y];
var playerXName;
if(playerOName === name1) {
  playerXName = name2;
} else {
  playerXName = name1;
}

var players = { 
  "symbol": currPlayer,
  "name": currPlayerName
}


function changeChance() {
  if(players["symbol"] === playerX) {
    players["symbol"] = playerO;
  } else {
    players["symbol"] === playerX;
  }

  if(players["name"] === name1) {
    players["name"] = name2;
  } else {
    players["name"] = name1;
  }
}


console.log(players);

var randomIndex = Math.floor(Math.random() * 2);
console.log(playerOName);
console.log(playerXName);



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
]



array.forEach(element => {
  
  
  element.addEventListener('click', function() {
    if(!gameOver) {

    
    if(element.innerHTML === '') {
      
      element.innerHTML = currPlayer;
      element.style.cursor = 'not-allowed';
      var var1 = element.id;
      if(var1 === '0-0') {
        board[0][0] = currPlayer;
      } else if (var1 === '0-1') {
        board[0][1] = currPlayer;
      } else if(var1 === '0-2') {
        board[0][2] = currPlayer;
      } else if(var1 === '1-0') {
        board[1][0] = currPlayer;
      } else if(var1 === '1-1') {
        board[1][1] = currPlayer;
      } else if(var1 === '1-2') {
        board[1][2] = currPlayer;
      } else if(var1 === '2-0') {
        board[2][0] = currPlayer;
      } else if(var1 === '2-1') {
        board[2][1] = currPlayer;
      } else if(var1 === '2-2') {
        board[2][2] = currPlayer;
      }
      displayArray(board);
      changeChance();
      if(restartButton.disabled === true) {
        restartButton.disabled = false;
      }
      if (checkWinner(currPlayer)) {
        winningPlayer.style.display = 'block';
        winningPlayer.innerHTML = `${currPlayerName} Wins!`
        playerChanceLabel.innerHTML = 'Game Over'
        gameOver = true;
      } else if (isBoardFull()) {
        winningPlayer.style.display = 'block';
        winningPlayer.innerHTML = `It's a tie!`
        playerChanceLabel.innerHTML = 'Game Over'
        gameOver = true;
      } else {
        
        if(currPlayer === playerO) {
          currPlayer = playerX
          currPlayerName = playerXName
          playerChanceLabel.innerHTML = `${currPlayerName}'s (X) Chance`;
        } else if(currPlayer === playerX) {
          currPlayer = playerO
          currPlayerName = playerOName
          playerChanceLabel.innerHTML = `${currPlayerName}'s (O) Chance`;
        }
      }
    } else if(element.innerHTML === 'O' || element.innerHTML === 'X') {
    }

    if (gameOver) {
      // Disable further clicks on the board
      array.forEach(elem => {
        elem.style.cursor = 'not-allowed';
      });
    } else {
        array.forEach(elem => {
          elem.style.cursor = 'pointer';
        })
    }
  }

  })
  
});
  
try {
  restartButton.addEventListener('click', function() {
    array.forEach(element => {
      element.innerHTML = '';
    });
    board.forEach(function(row) {
      row.forEach(function(_, columnIndex) {
        row[columnIndex] = ' ';
      });
    });
    displayArray(board);

    // Randomize player names and symbols
    
    localStorage.setItem('Player1Name', playerOName);
    localStorage.setItem('Player2Name', playerXName);

    // Update current player name and label
    if(currPlayerName === playerXName && currPlayer === playerX) {
      currPlayerName = playerXName;
    } else if(currPlayerName === playerOName && currPlayer === playerO){
      currPlayerName = playerOName;
    }
    playerChanceLabel.innerHTML = `${currPlayerName}'s (${currPlayer}) Chance`;

    array.forEach(e => {
      e.style.cursor = 'pointer';
    });
    gameOver = false;
    winningPlayer.innerHTML = '';
  });
} catch (error) {
  // Handle the error
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

function abcd() {
  if(playerOName === name1) {
    currPlayerName = name2;
    playerChanceLabel.innerHTML = `${playerOName}'s (O) Chance`;
  } else {
    currPlayerName = name1;
    playerChanceLabel.innerHTML = `${playerOName}'s (O) Chance`;
  }
}

window.onload = abcd();