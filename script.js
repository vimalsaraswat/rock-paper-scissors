const options = ["stone", "paper", "scissors"];
const cards = document.querySelectorAll(".card");
const result = document.querySelector("#result");

cards.forEach((card) => {
  card.addEventListener("click", () => {
    cards.forEach((card) => {
      card.classList.add("hidden");
    });
    card.classList.remove("hidden");
    let user = card.getAttribute("value");
    let comp = compCard();
    let winner = chooseWinner(user, comp);
    displayWinner(winner);
  });
});

function compCard() {
  let compCard = document.querySelector("#comp");
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

function displayWinner(winner) {
  if (winner === "user") {
    result.innerHTML = "You Won";
  } else if (winner === "comp") {
    result.innerHTML = "You Lose";
  } else if (winner === "tie") {
    result.innerHTML = "Its a tie.";
  }
}
