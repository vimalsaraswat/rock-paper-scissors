const options = ["stone", "paper", "scissors"];

const userCards = document.querySelectorAll(".option");
const compCard = document.querySelector("#comp-card");

const userScoreCard = document.querySelector("#user-score");
const compScoreCard = document.querySelector("#comp-score");
const result = document.querySelector("#result");

let compScore = 0;
let userScore = 0;

async function main() {
  userCards.forEach((card) => {
    card.addEventListener("click", handleClick);
  });
}

async function handleClick() {
  userCards.forEach((card) => {
    card.classList.add("hidden");
  });
  this.classList.remove("hidden");
  let user = this.getAttribute("value");
  let comp = compPlay();
  let winner = chooseWinner(user, comp);
  await displayWinner(winner);

  if (compScore >= 2 || userScore >= 2) {
    console.log(userScore);
    userCards.forEach((card) => {
      card.removeEventListener("click", handleClick); // Remove event listener here
    });
    return;
  }
}

function compPlay() {
  let opt = options[Math.floor(Math.random() * 3)];

  compCard.setAttribute("value", opt);
  compCard.classList.remove("hidden");

  return opt;
}

function chooseWinner(user, comp) {
  if (user === comp) {
    return "tie";
  } else if (user === "stone" && comp === "paper") {
    return "comp";
  } else if (user === "stone" && comp === "scissors") {
    return "user";
  } else if (user === "paper" && comp === "stone") {
    return "user";
  } else if (user === "paper" && comp === "scissors") {
    return "comp";
  } else if (user === "scissors" && comp === "stone") {
    return "comp";
  } else if (user === "scissors" && comp === "paper") {
    return "user";
  }
}

async function displayWinner(winner) {
  if (winner === "user") {
    result.innerHTML = "You Won";
    userScore += 1;
  } else if (winner === "comp") {
    result.innerHTML = "You Lose";
    compScore++;
  } else if (winner === "tie") {
    result.innerHTML = "Its a tie.";
  }
  result.showModal();
  setTimeout(() => {
    result.innerHTML = "";
    userCards.forEach((card) => {
      card.classList.remove("hidden");
    });
    compCard.classList.add("hidden");
    result.close();
  }, 500);
}

async function gameStart() {
  document.querySelector("#start-button").classList.add("hidden");
  await main();
  console.log("I am out of main");
  if (userScore > compScore) {
    result.innerHTML = "You just defeated the Bot";
    result.showModal();
  } else if (compScore > userScore) {
    result.innerHTML = "The Bot defeated You!";
    result.showModal();
  }
}
