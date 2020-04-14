// grab everything from the dom 
const choicesSection = document.getElementById("choices");
const playSection = document.getElementById("play-section");

// targets choice class
const choices = document.querySelectorAll(".choice");

// important to have [0] here, review notes later
const playerSelection = document.getElementsByClassName("player-selection")[0];
const computerPlaceholder = document.getElementsByClassName("computer-placeholder")[0];
const computerSelection = document.getElementsByClassName("computer-selection")[0];

const outcome = document.getElementsByClassName("outcome")[0];

// get score 
const score = document.querySelector("#score");
const playerScore = document.getElementsByClassName("player-score")[0];
const computerScore = document.getElementsByClassName("computer-score")[0];

// result of each game
// const result = document.getElementById("result");
const restart = document.getElementById("restart");

const playAgainBtn = document.getElementById("playAgain");

const rules = document.getElementById("rules");


// modal
const modal = document.querySelector(".modal");
const modalClose = document.getElementById("close-modal-btn");


// Player choice to be displayed
const pRock = document.getElementById("p-rock");
const pPaper = document.getElementById("p-paper");
const pScissors = document.getElementById("p-scissors");
const pSlide = document.getElementsByClassName("player-slide-left")[0];



// Computer choices 
const cRock = document.getElementById("c-rock");
const cPaper = document.getElementById("c-paper");
const cScissors = document.getElementById("c-scissors");
const cSlide = document.getElementsByClassName("house-slide-right")[0];

// outcomes 
const draw = document.getElementsByClassName("draw")[0];
const win = document.getElementsByClassName("win")[0];
const lose = document.getElementsByClassName("lose")[0];




// Keep score with a scoreboard object
const scoreboard = {
  player: 0,
  computer: 0
}

// winner background
const winnerBg = document.getElementsByClassName("winner-bg")[0];

// store values for later 
let playerClicked = ""
let computerClicked = ""
let finalOutcome = ""

// Toggle display none on and off
const displayNoneToggle = function (hideToggle1, hideToggle2, hideToggle3, hideToggle4, hideToggle5, hideToggle6) {

  hideToggle1.classList.toggle("d-none");

  if (hideToggle2) {
    // if another parameter listed
    hideToggle2.classList.toggle("d-none");
  }

  if (hideToggle3) {
    hideToggle3.classList.toggle("d-none");
  }

  if (hideToggle4) {
    hideToggle4.classList.toggle("d-none");
  }

  if (hideToggle5) {
    hideToggle5.classList.toggle("d-none");
  }

  if (hideToggle6) {
    hideToggle5.classList.toggle("d-none");
  }
};

// when page is loaded, hide the following: 
displayNoneToggle(modal, playSection, playerSelection, computerSelection, outcome);
displayNoneToggle(pRock, pPaper, pScissors);
displayNoneToggle(cRock, cPaper, cScissors);


// Play game (once player makes a selection)
// create a play function using (e) event parameter to target the id of what we click. doing so starts the game

function play(e) {

  // Player choice - what player clicks will be saved as the playerChoice variable
  const playerChoice = e.target.id;
  playerClicked = playerChoice;

  // After selection made, Choices section display none is toggled ON and playSection toggled OFF
  displayNoneToggle(choicesSection, playSection)

  // player-selection is now displayed  
  displayPlayerClick(playerChoice);

  const computerChoice = getComputerChoice();

  // Computer choice 
  setTimeout(function () {
    displayNoneToggle(computerSelection);

  }, 1 * 1000);


  // console.log(playerChoice, computerChoice, winner);
  const winner = getWinner(playerChoice, computerChoice);

  setTimeout(function () {
    showWinner(winner, computerChoice);
  }, 3.5 * 1000);


  setTimeout(function () {
    displayNoneToggle(outcome);
    console.log("The value of outcome is +" + outcome);
  }, 3.5 * 1000);


  finalOutcome = winner;

  // slide animation
  setTimeout(function () {
    slideToggle();
  }, 2 * 1000);

  // winner background
  setTimeout(function () {
    showWinnerBg(winner, playerChoice, computerChoice);
  }, 3 * 1000);


}




// display what player chose, display none the other choices
function displayPlayerClick(playerSelected) {

  // displays playerSelection
  displayNoneToggle(playerSelection);

  if (playerSelected === 'rock') {
    console.log("You selected " + playerSelected);
    displayNoneToggle(pRock);

  } else if (playerSelected === 'paper') {
    console.log("You selected " + playerSelected);
    displayNoneToggle(pPaper);

  } else {
    console.log("You selected " + playerSelected);
    displayNoneToggle(pScissors);
  }

}


// computer choice, display none what wasn't chosen
function getComputerChoice() {

  // setTimeout(function () {

  // toggle on ComputerSelection
  // displayNoneToggle(computerSelection);

  const random = Math.random();
  if (random < 0.34) {
    displayNoneToggle(cRock)
    computerClicked = 'rock'
    console.log("computer selected " + computerClicked)
    return 'rock';

  } else if (random <= 0.67) {
    displayNoneToggle(cPaper)
    computerClicked = 'paper'
    console.log("computer selected " + computerClicked)
    return 'paper';

  } else {
    displayNoneToggle(cScissors)
    computerClicked = 'scissors'
    console.log("computer selected " + computerClicked)
    return 'scissors';
  }

  // }, 400);
}

// Logic to determine game winner 

function getWinner(player, computer) {

  // setTimeout(function () {
  if (player === computer) {
    return 'draw'
  } else if (player === 'rock') {
    if (computer === 'paper') {
      return 'computer wins';
    } else {
      return 'player wins';
    }

  } else if (player === 'paper') {
    if (computer === 'scissors') {
      return 'computer wins';
    } else {
      return 'player wins';
    }

  } else if (player === 'scissors') {
    if (computer === 'rock') {
      return 'computer wins';
    } else {
      return 'player wins';
    }
  }
  // }, 500);
}


// Show winner 
// create a function which displays the results and updates score

function showWinner(winner) {

  // setTimeout(function () {

  if (winner === 'player wins') {
    console.log(winner + " is toggled on")
    displayNoneToggle(win)
    // increment player score 
    scoreboard.player++
    playerScore.innerHTML = `<p>${scoreboard.player}</p>`;
  } else if (winner === 'computer wins') {
    console.log(winner + " is toggled on")
    displayNoneToggle(lose)
    scoreboard.player--
    playerScore.innerHTML = `<p>${scoreboard.player}</p>`;
  } else {
    console.log(winner + " is toggled on")
    displayNoneToggle(draw)
  }

  // }, 2000);

}


// slideToggle 

function slideToggle() {
  playerSelection.classList.toggle("player-slide-left");
  computerSelection.classList.toggle("house-slide-right");
}


// Winner background 

function showWinnerBg(winner, playerClicked, computerClicked) {

  // setTimeout(function () {
  if (winner === 'player wins') {
    if (playerClicked === 'rock') {
      pRock.classList.add("winner-bg");
    } else if (playerClicked === 'paper') {
      pPaper.classList.add("winner-bg");
    } else {
      pScissors.classList.add("winner-bg");
    }

  } else if (winner === 'computer wins') {
    if (computerClicked === 'rock') {
      cRock.classList.add("winner-bg");
    } else if (computerClicked === 'paper') {
      cPaper.classList.add("winner-bg")
    } else {
      cScissors.classList.add("winner-bg");
    }
  }
  // }, 2000);
}



// Play Again 

function playAgainGame() {

  // hide player- and computer-selection and winner results
  displayNoneToggle(choicesSection, playSection, playerSelection, computerSelection);

  // re hide what player selected
  if (playerClicked === 'rock') {
    console.log("hidding " + playerClicked);
    displayNoneToggle(pRock);

  } else if (playerClicked === 'paper') {
    console.log("hidding " + playerClicked);
    displayNoneToggle(pPaper);

  } else {
    console.log("hidding " + playerClicked);
    displayNoneToggle(pScissors);
  }

  // hide what computer selected 

  if (computerClicked === 'rock') {
    console.log("hidding computer's " + computerClicked);
    displayNoneToggle(cRock);

  } else if (computerClicked === 'paper') {
    console.log("hidding computer's " + computerClicked);
    displayNoneToggle(cPaper);

  } else {
    console.log("hidding computer's " + computerClicked);
    displayNoneToggle(cScissors);
  }

  // toggle outcome div
  displayNoneToggle(outcome)

  if (finalOutcome === 'player wins') {

    console.log("win div is toggled off, value of outcome is " + finalOutcome)
    displayNoneToggle(win)

  } else if (finalOutcome === 'computer wins') {
    console.log("lose div is toggled off, value of outcome is " + finalOutcome)
    displayNoneToggle(lose)

  } else {
    console.log("draw div is toggled off, value of outcome is " + finalOutcome)
    displayNoneToggle(draw)
  }

  // toggle off slide animation

  slideToggle()

  hideWinnerBg(finalOutcome, playerClicked, computerClicked);


}

// hide winner bg 

function hideWinnerBg(winner, playerClicked, computerClicked) {
  if (winner === 'player wins') {
    if (playerClicked === 'rock') {
      pRock.classList.remove("winner-bg");
    } else if (playerClicked === 'paper') {
      pPaper.classList.remove("winner-bg");
    } else {
      pScissors.classList.remove("winner-bg");
    }

  } else if (winner === 'computer wins') {
    if (computerClicked === 'rock') {
      cRock.classList.remove("winner-bg");
    } else if (computerClicked === 'paper') {
      cPaper.classList.remove("winner-bg")
    } else {
      cScissors.classList.remove("winner-bg")
    }
  }
}



// restart reset score game / score
function restartGame() {
  playAgainGame();
  scoreboard.player = 0;
  // scoreboard.computer = 0;
  playerScore.innerHTML = `<p>${scoreboard.player}</p>`;
  // computerScore.innerHTML = `<p>${scoreboard.computer}</p>`;
}


// open modal

function openModal(e) {
  if (e.target == rules) {
    displayNoneToggle(modal)
    console.log(rules)
  }

}

// clear modal
function clearModal(e) {
  if (e.target == modal) {
    displayNoneToggle(modal)
  }
}
// why won't this work in the other clearModal function? 
function clearModalOther(e) {
  if (e.target == modalClose) {
    displayNoneToggle(modal)
  }
}


// Event listeners 

// for loop also possible but use a forEach works too. This allows us to know which one was clicked. And once we click, thats when the play function starts 

// adding event listener to each .choice class. when one of the choices is clicked, the play function begins
choices.forEach(choice => choice.addEventListener('click', play));




// Modal event listener 
rules.addEventListener('click', openModal);

window.addEventListener('click', clearModal);
modalClose.addEventListener('click', clearModalOther);


// restart game option 
// restart.addEventListener('click', restartGame);

// play again option 
playAgainBtn.addEventListener('click', playAgainGame);


