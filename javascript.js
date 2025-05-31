// Declare Players' score variables and the Number of Rounds played
let humanScore = 0;
let machineScore = 0;
let roundResult;
let tryAgain;
let humanChoice;
let machineChoice;
let clickHandler;

const buttonContainer = document.querySelector(".uiMove");
const playAg = document.querySelector(".tryAgain");
const humanScoreCount = document.querySelector(".Human-Score");
const machineScoreCount = document.querySelector(".Machine-Score");
const makeMove = document.querySelector(".makeMove");

let resultGame = document.querySelector(".resultGame");
let gameEnd = document.querySelector(".gameEnd");

playAg.style.display = "none";
machineScoreCount.textContent = `Machine Score: ${machineScore}`;
humanScoreCount.textContent = `Human Score: ${humanScore}`;

function startGame() {
    playAg.style.display = "none";

    if (clickHandler) {
        buttonContainer.removeEventListener("click", clickHandler);
    }

    clickHandler = (uiMove) => {
        if (uiMove.target.nodeName.toLowerCase() === "img") {
            humanChoice = uiMove.target.alt.toLowerCase();
            makeMove.style.display = "none";
        
            if (music.paused) {
            music.play().catch((err) => {
                console.warn("Music play failed:", err);
            });
        }
    }
            machineChoice = getMachineChoice();
            playRound();
        };
    buttonContainer.addEventListener("click", clickHandler);
}

// This gets the Machine's choice randomly
function getMachineChoice() {
    machineChoice = Math.floor(Math.random() * 3) +1;
    switch (machineChoice) {
        case 1:
            return "rock";
        case 2:
            return "paper";
        case 3:
            return "scissors";
        break;
    }
}

const gameChoices = {
    rock: {crushes: "scissors", message: "Ah! Rock crushes Scissors!"},
    paper: {crushes: "rock", message: "Ah! Paper envelopes Rock!"},
    scissors: {crushes: "paper", message: "Ah! Scissors cut through Paper!"}
};

// Rounds 
function playRound() { 

    let humanVanquish = gameChoices[humanChoice];
    let machineVanquish = gameChoices[machineChoice];

    if (humanChoice === machineChoice) {
        resultGame.textContent = `It's a tie! The Automatron also picked ${humanChoice}. Try again!`;
    }
    else if (humanVanquish.crushes === machineChoice) { 
        ++humanScore;
        humanScoreCount.textContent = `Human Score: ${humanScore}`;
        resultGame.textContent = `You Prevailed! ${humanVanquish.message} The Automatron picked ${machineChoice}!`;
    }
    else if (machineVanquish.crushes === humanChoice) {
        ++machineScore;
        machineScoreCount.textContent = `Machine Score: ${machineScore}`;
        resultGame.textContent = `You Lost! ${machineVanquish.message} The Automatron picked ${machineChoice}!`;
    }

    playGame();
}

// Text shown to player at Game's End
const arrWin = [
    "You Won! The Machine lost the game!🪐",
    "The Machine is defeated and you stopped their conquest! Congratulations!🎆",
    "You outsmarted the Machine! Well done!🎇"
];

const arrLost = [
    "You Lost! The Machine won the game!🛰",
    "The Machine is victorious! The Universe is theirs for the taking!🌌",
    "The Machine has outsmarted you! Try again to stop them or prepare to be assimilated!🌀"
];

// Allows to replay the game for 5 rounds
function playGame() {
  let tryAgain = document.querySelector(".tryAgain");
  switch (machineScore) {
    case 5:
      let random = Math.floor(Math.random() * arrLost.length);
      let endTxt = document.createElement("span");
      endTxt.className = "lostTxt";
      endTxt.textContent = `${arrLost[random]}`;
      gameEnd.appendChild(endTxt);
      tryAgain.style.display = "flex";
      newGame();
      break;
  }

  switch (humanScore) {
    case 5:
      let random = Math.floor(Math.random() * arrWin.length);
      let endTxt = document.createElement("span");
      endTxt.className = "winTxt";
      endTxt.textContent = `${arrWin[random]}`;
      gameEnd.appendChild(endTxt);
      tryAgain.style.display = "flex";
      newGame();
      break;
  }

  if (humanScore < 5 && machineScore < 5) {
    gameStart();
  }

  humanScoreCount.textContent = `Human Score: ${humanScore}`;
  machineScoreCount.textContent = `Machine Score: ${machineScore}`;
}

function newGame() {
  buttonContainer.removeEventListener("click", clickHandler);
  if (tryAgain) {
    playAg = removeEventListener("click", tryAgain);
  }

  tryAgain = (playAg) => {
    if (playAg.target.nodeName.toLowerCase() === "button") {
      console.log("test");
      humanScore = 0;
      machineScore = 0;
      humanScoreCount.textContent = `Human Score: ${humanScore}`;
      machineScoreCount.textContent = `Machine Score: ${machineScore}`;
      resultGame.textContent = "   ";
      gameEnd.textContent = "    ";
      makeMove.style.display = "block";

      startGame();
    }
  };
  playAg.addEventListener("click", tryAgain);
}

// Music Control Setup
const music = document.getElementById("bg-music");
const toggleMusicBtn = document.getElementById("toggle-music");

if (toggleMusicBtn && music) {
    toggleMusicBtn.textContent = music.muted ? "🔇" : "🎷";

    toggleMusicBtn.addEventListener("click", () => {
        music.muted = !music.muted;
        toggleMusicBtn.textContent = music.muted ? "🔇" : "🎷";
    });
}

startGame();


