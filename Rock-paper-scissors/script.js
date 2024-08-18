const computerChoice = document.getElementById("computer-choice");
const optionsArray = ["rock", "scissor", "paper"];
const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissor = document.getElementById("scissor");
const winner = document.getElementById("winner");
let userChoice;

rock.onclick = function () {
  userChoice = "rock";
  rock.style.border = "2px solid red" 
  paper.style.border = "1px solid black"
  scissor.style.border = "1px solid black"
  generateRandomChoice();
};

paper.onclick = function () {
  userChoice = "paper";
  rock.style.border = "1px solid black" 
  paper.style.border = "2px solid red"
  scissor.style.border = "1px solid black"
  generateRandomChoice();
};

scissor.onclick = function () {
  userChoice = "scissor";
  rock.style.border = "1px solid black" 
  paper.style.border = "1px solid black"
  scissor.style.border = "2px solid red"
  generateRandomChoice();
};

function generateRandomChoice() {
  setTimeout(() => {
    const num = Math.floor(Math.random() * 3);
    console.log(optionsArray[num]);

    computerChoice.textContent = optionsArray[num];

    console.log(computerChoice.textContent);

    getWinner();
  }, 2000);
}

function getWinner() {
  console.log(userChoice);
  if (
    (userChoice == "rock" && computerChoice.textContent == "paper") ||
    (userChoice == "scissor" && computerChoice.textContent == "rock") ||
    (userChoice == "paper" && computerChoice.textContent == "scissor")
  ) {
    winner.textContent = "computer";
  }

  if (
    (userChoice == "paper" && computerChoice.textContent == "rock") ||
    (userChoice == "rock" && computerChoice.textContent == "scissor") ||
    (userChoice == "scissor" && computerChoice.textContent == "paper")
  ) {
    winner.textContent = "user";
  }

  if (userChoice == computerChoice.textContent) {
    winner.textContent = "draw";
  }
}
