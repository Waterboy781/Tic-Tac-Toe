var textBox = document.querySelector('.textBox');
var difficultyLevelsplayer1Name = document.getElementById('difficultyLevelsplayer1Name');
var screenWidth = document.documentElement.clientWidth;
var xmarkOpen = false;
let player1Name = document.getElementById('player1Name');
let player2Name = document.getElementById('player2Name');
if (screenWidth >= 280) {
    var titleMsg = document.getElementById('titleMsg');
    try {
        titleMsg.innerHTML = 'Welcome to \nTic Tac Toe';
    titleMsg.style.textAlign = 'center';  
    } catch(err) {
    }
      
} else {
    titleMsg.innerHTML = 'Welcome to Tic Tac Toe!'
}



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



var playerNames = document.getElementById('playerNames');
var playervsplayer = document.getElementById('playervsplayer');

let playervsplayerLabel = document.getElementById('computer');
playervsplayerLabel.addEventListener('click', function() {
    if(xmarkOpen) {
        playerNames.style.left = '-50%';
        xmarkOpen = false;
        changeOpacity(xmarkOpen);
    } else {
        if(!difficultyLevelsOpen) {
            playerNames.style.left = '50%';
            xmarkOpen = true;
            changeOpacity(xmarkOpen);
        } else {
            difficultyLevels.style.left = '-50%';
            difficultyLevelsOpen = false;
            playerNames.style.left = '50%';
            xmarkOpen = true;
            changeOpacity(xmarkOpen);
        }
    }
})

playervsplayer.addEventListener('click', function() {
    if(xmarkOpen) {
        playerNames.style.left = '-50%';
        xmarkOpen = false;
        changeOpacity(xmarkOpen);
    } else {
        if(!difficultyLevelsOpen) {
            playerNames.style.left = '50%';
            xmarkOpen = true;
            changeOpacity(xmarkOpen);
        } else {
            difficultyLevels.style.left = '-50%';
            difficultyLevelsOpen = false;
            playerNames.style.left = '50%';
            xmarkOpen = true;
            changeOpacity(xmarkOpen);
        }
        
    }
    
})
 

let btn = document.getElementById("button");

btn.addEventListener("click", active);

function active() {
  btn.classList.toggle("is_active");
}

let btn2 = document.getElementById("button2");

btn2.addEventListener("click", active2);

function active2() {
  btn2.classList.toggle("is_active_true");
}




btn2.onclick = function() {

}

btn.onclick = function() {
    setTimeout(function() {
        location.href = 'playervsplayer.html';
        player1Name.value = '';
        player2Name.value = '';
    }, 2500)
}

let xmark = document.getElementById('x-mark');

xmark.addEventListener('click', function() {
    playerNames.style.left = '-50%';
    xmarkOpen = false;
    changeOpacity(xmarkOpen);
})




function changeOpacity(element) {
    if(element) {
        titleMsg.style.opacity = '.3';
    } else if(!element) {
        titleMsg.style.opacity = '1'
    }
}



let submitButton = document.getElementById("button");

submitButton.addEventListener('click', function() {
  
  let name1 = player1Name.value;
  let name2 = player2Name.value;
  if(name1 === '') {
      name1 = 'Player 1';
  } else if(name2 === '') {
      name2 = 'Player 2';
  }
  localStorage.setItem('Player1Name', name1);
  localStorage.setItem('Player2Name', name2);
});

function show(anything) {
    document.querySelector('.textBox').value = anything;
}
let dropdown = document.querySelector('.dropdown');
dropdown.onclick = function() {
    dropdown.classList.toggle('active');
}
var dropdownMenuOpen = false;
var wrapper2 = document.querySelector('.wrapper2')
dropdown.addEventListener('click', function() {
    if(dropdown.classList.contains('active')) {
        dropdownMenuOpen = true;
    } else {
        dropdownMenuOpen = false;
    }
    wrapper2.style.top = '300px';
    if(dropdownMenuOpen) {
        wrapper2.style.transition = '0.29s ease-in-out'
        wrapper2.style.top = '470px';
    } else {
        wrapper2.style.top = '300px';
    }
})


var playervscomputer = document.getElementById('playervscomputer');
var difficultyLevels = document.getElementById('difficultyLevels')
var difficultyLevelsOpen = false;
var xmark2 = document.getElementById('x-mark2');
xmark2.addEventListener('click', function() {
    difficultyLevelsOpen = false;
    difficultyLevels.style.left = '-50%';
    changeOpacity();
})

playervscomputer.addEventListener('click', function() {
    if(difficultyLevelsOpen) {
        difficultyLevels.style.left = '-50%';
        difficultyLevelsOpen = false;
        changeOpacity(difficultyLevelsOpen);
    } else {
        if(!xmarkOpen) {
            difficultyLevels.style.left = '50%';
            difficultyLevelsOpen = true;
            changeOpacity(difficultyLevelsOpen);
        } else {
            playerNames.style.left = '-50%';
            xmarkOpen = false;
            difficultyLevels.style.left = '50%';
            difficultyLevelsOpen = true;
            changeOpacity(difficultyLevelsOpen);
        }
        
    }
})

var playervscomputerLabel = document.getElementById('player');
playervscomputerLabel.addEventListener('click', function() {
        if(difficultyLevelsOpen) {
            difficultyLevels.style.left = '-50%';
            difficultyLevelsOpen = false;
            changeOpacity(difficultyLevelsOpen);
        } else {
            if(!xmarkOpen) {
                difficultyLevels.style.left = '50%';
                difficultyLevelsOpen = true;
                changeOpacity(difficultyLevelsOpen);
            } else {
                playerNames.style.left = '-50%';
                xmarkOpen = false;
                difficultyLevels.style.left = '50%';
                difficultyLevelsOpen = true;
                changeOpacity(difficultyLevelsOpen);
            }
            
        }
})
let chosenDifficulty;

wrapper2.addEventListener('click', function() {
    var difficultyPlayer1Name = difficultyLevelsplayer1Name.value;
    if(difficultyPlayer1Name === '') {
        difficultyPlayer1Name = 'Your';
    }
    localStorage.setItem('difficultyLevelsplayer1Name', difficultyPlayer1Name);
    chosenDifficulty = textBox.value;
    if(chosenDifficulty === '') {
        setTimeout(function() {
            location.href = 'playervscomputer 1.html'
        }, 2500)
    }
    console.log(chosenDifficulty);
    if(chosenDifficulty === 'Easy') {
        setTimeout(function() {
            location.href = 'playervscomputer 1.html'
        }, 2500)
    } else if(chosenDifficulty === 'Medium') {
        setTimeout(function() {
            location.href = 'playervscomputer 2.html'
        }, 2500)
    } else if(chosenDifficulty === 'Hard') {
        setTimeout(function() {
            location.href = 'playervscomputer 3.html'
        }, 2500)
    } else if(chosenDifficulty === 'Extreme') {
        setTimeout(function() {
            location.href = 'playervscomputer 4.html'
        }, 2500)
    } else {
        
    }
})

