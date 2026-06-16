const resultDiv = document.getElementById("result");
const scoreDiv = document.getElementById("score");
const gameWinnerDiv = document.getElementById("gameWinner");

let humanScore = 0;
let computerScore = 0;
let roundCount = 0;

function getComputerChoice(){
    const choices = ["rock", "paper", "scissor"];

    const randomIndex = Math.floor(Math.random() * 3);
    const choice = choices[randomIndex];
    
    return choice;
}

function playRound(humanChoice, computerChoice) {
  
  updateImages(humanChoice, computerChoice);
  if (humanChoice === computerChoice) {
    resultDiv.textContent = "It's a tie!";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissor") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissor" && computerChoice === "paper")
  ) {
    humanScore++;
    resultDiv.textContent = "You win this round!";
  } else {
    computerScore++;
    resultDiv.textContent = "Computer wins this round!";
  }

  updateScore();
  roundCount++;

  if (roundCount === 5) {
    endGame();
  }
}

function updateImages(humanChoice, computerChoice) {
    const humanImage = document.getElementById("myImage1");
    const computerImage = document.getElementById("myImage2");

    humanImage.src = `images/files/${humanChoice}left.jpg`;
    computerImage.src = `images/files/${computerChoice}right.jpg`;
}

function startRound(humanChoice) {
  if (roundCount >= 5) {
    console.log("Game over! Press Reset to play again.");
    return;
  }

  const computerChoice = getComputerChoice();
  playRound(humanChoice, computerChoice);
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    roundCount = 0;

    resultDiv.textContent = "Choose Rock, Paper, or Scissors!";
    scoreDiv.textContent = "Player: 0 | Computer: 0";
    gameWinnerDiv.textContent = "";

    document.getElementById("myImage1").src = "images/files/paperleft.jpg";
    document.getElementById("myImage2").src = "images/files/paperright.jpg";

    document.getElementById("rock").disabled = false;
    document.getElementById("paper").disabled = false;
    document.getElementById("scissor").disabled = false;
}

function endGame() {
    if (humanScore > computerScore) {
        gameWinnerDiv.textContent = "🎉 You won the game!";
    } else if (computerScore > humanScore) {
        gameWinnerDiv.textContent = "💻 Computer won the game!";
    } else {
        gameWinnerDiv.textContent = "🤝 It's a tie!";
    }

    document.getElementById("rock").disabled = true;
    document.getElementById("paper").disabled = true;
    document.getElementById("scissor").disabled = true;
}

document.getElementById("rock").addEventListener("click", () => {
    startRound("rock");
});

document.getElementById("paper").addEventListener("click", () => {
    startRound("paper");
});

document.getElementById("scissor").addEventListener("click", () => {
    startRound("scissor");
});

document.getElementById("reset").addEventListener("click", resetGame);

function updateScore() {
    scoreDiv.textContent =
        `Player: ${humanScore} | Computer: ${computerScore}`;
}
