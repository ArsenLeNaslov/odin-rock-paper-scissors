// Declare Players' score variables and the number of rounds played
let humanScore = 0;
let machineScore = 0;
let roundsPlayed = 0;

// The game will be played against the Computer, using a function. 
// getComputerChoice() will randomly return one of the available 3 choices: "rock", "paper", or "scissors".
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

// The game will be played by a human player. 
// getHumanChoice() function will take the user's valid choices and return it, depending on the input.  
function getHumanChoice() {
    let choice = prompt("Enter your choice (rock, paper, scissors):");
    choice = choice ? choice.toLowerCase() : "";
    while (!["rock", "paper", "scissors"].includes(choice)) {
        choice = prompt("Invalid choice. Please enter rock, paper, or scissors:");
        choice = choice ? choice.toLowerCase() : "";
    }
    return choice;
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// The game will be played round by round for 5 rounds in total. Using the function playRound(), with 2 arguments: humanChoice and computerChoice.
// Game plays for a single round, increments the round winner’s score and logs a winner announcement.
// humanChoice parameters are case-insensitive so that players can input “rock”, “ROCK”, “RocK”, or other variations.
// playRound() will print to console.log a string value representing the round winner, such as: “You lose! Paper beats Rock”.
// The function will check if the human player wins, loses, or ties against the computer.
// humanScore or computerScore variable will increment based on the round's winner.

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        console.log("Draw! It's a tie!");
    } else if (
        (humanChoice === "rock" && computerChoice === "scissors") ||
        (humanChoice === "paper" && computerChoice === "rock") ||
        (humanChoice === "scissors" && computerChoice === "paper")
    ) {
        console.log(`Human, You win! ${capitalizeFirstLetter(humanChoice)} beats ${computerChoice}`);
        humanScore++;
    } else {
        console.log(`Human, You lose, Machine Wins! ${capitalizeFirstLetter(computerChoice)} beats ${humanChoice}`);
        machineScore++;
    }
}

// The playgame() function will calls playround to play 5 rounds of the game.
// It keeps track of the scores and declares a winner at the end.
function playGame() {
    humanScore = 0;
    machineScore = 0;
    roundsPlayed = 0;
    console.log("Welcome to Rock, Paper, Scissors!");
    console.log("You will play 5 rounds against the Machine.");
    console.log("Let's start the game!");
    while (roundsPlayed < 5) {
        const humanChoice = getHumanChoice();
        const computerChoice = getComputerChoice();
        console.log(`Round ${roundsPlayed + 1}:`);
        console.log(`Human, You chose: ${humanChoice}`);
        console.log(`Computer chose: ${computerChoice}`);
        playRound(humanChoice, computerChoice);
        roundsPlayed++;
    }
    console.log(`Final Score - You, Human: ${humanScore}, Machine: ${machineScore}`);
    if (humanScore > machineScore) {
        console.log("Congratulations Human! You are the overall winner!");
    } else if (humanScore < machineScore) {
        console.log("Better luck next time! The Machine is the overall winner.");
    } else {
        console.log("Draw! It's a Tie overall!");
    }
}

playGame();

