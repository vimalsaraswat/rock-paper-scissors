const options = ["stone", "paper", "scissors"];

const userCards = document.querySelectorAll(".option");
const compCard = document.querySelector("#comp-card");
const userScoreCard = document.querySelector("#user-score");
const compScoreCard = document.querySelector("#comp-score");

const score = document.querySelector("#score");
const result = document.querySelector("#result");
const modal = document.querySelector("#modal");

let compScore = 0;
let userScore = 0;

async function handleClick(ccard) {
  userCards.forEach((card) => {
    card.classList.add("hidden");
  });
  ccard.classList.remove("hidden");
  compCard.classList.remove("hidden");

  let user = ccard.getAttribute("value");
  let comp = compPlay();
  let winner = chooseWinner(user, comp);

  await displayWinner(winner);
}

function compPlay() {
  let opt = options[Math.floor(Math.random() * 3)];
  compCard.setAttribute("value", opt);
  return opt;
}

async function displayWinner(winner) {
  let resStr;
  if (winner === "user") {
    resStr = "You Won";
    userScore += 1;
  } else if (winner === "comp") {
    resStr = "You Lose";
    compScore++;
  } else if (winner === "tie") {
    resStr = "Its a tie.";
  }
  userScoreCard.innerHTML = userScore;
  compScoreCard.innerHTML = compScore;

  console.log(resStr);
  result.innerHTML = resStr;
  modal.showModal();

  await new Promise((resolve) => {
    setTimeout(() => {
      result.innerHTML = "";
      userCards.forEach((card) => {
        card.classList.remove("hidden");
      });
      compCard.classList.add("hidden");
      modal.close();

      resolve(); // Resolve the promise to signal completion
    }, 800);
  });
}

function showFinalWinner() {
  let winStr = "";
  if (userScore > compScore) {
    winStr = "You just defeated the Bot";
  } else if (compScore > userScore) {
    winStr = "The Bot defeated You!";
  }
  document.querySelector("#replay").classList.remove("hidden");

  result.innerHTML = winStr;
  modal.showModal();
}

async function gameStart() {
  resetGame();
  score.classList.remove("hidden");
  document.querySelector("#start-button").classList.add("hidden");
  document.querySelector("#restart").classList.remove("hidden");

  function handleClickWrapper(card) {
    return async () => {
      await handleClick(card);

      if (compScore >= 5 || userScore >= 5) {
        console.log(userScore);
        showFinalWinner();
        userCards.forEach((card) => {
          card.removeEventListener("click", handleClickWrapper);
        });
        console.log("I am out of main");
      }
    };
  }

  userCards.forEach((card) => {
    card.addEventListener("click", handleClickWrapper(card));
  });
}

// Choose winner from the winning criteria
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

// Resets the game to the original state
function resetGame() {
  // Reset scores and score cards
  compScore = 0;
  userScore = 0;
  userScoreCard.innerHTML = 0;
  compScoreCard.innerHTML = 0;

  // Show all user cards and hide comp card
  userCards.forEach((card) => {
    card.classList.remove("hidden");
  });
  compCard.classList.add("hidden");

  // Hide result modal, replay button, restart button and show start button
  modal.close();
  document.querySelector("#replay").classList.add("hidden");
  document.querySelector("#restart").classList.add("hidden");
  document.querySelector("#start-button").classList.remove("hidden");
}
