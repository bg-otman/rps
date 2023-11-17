let score = JSON.parse(localStorage.getItem("score")) || {
  win: 0,
  tie: 0,
  loose: 0,
};

updateScoreElement();

function gameResult(result1, result2, result3) {
  const computerMove = pickComputerMove();

  let result = "";

  if (computerMove === result1) {
    result = "Tie.";
  } else if (computerMove === result2) {
    result = "Computer Won !";
  } else {
    result = "You Won !";
  }
  // Update the result
  if (result === "You Won !") {
    score.win++;
  } else if (result === "Computer Won !") {
    score.loose++;
  } else {
    score.tie++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  // display result in the page
  document.querySelector(".js-result").innerHTML = result;

  //display moves
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You picked a ${result3}, Computer choosed a ${computerMove}`;
}

// when click rock button run gameResult fun, with the given parametres
document.querySelector(".js-rock-button").addEventListener("click", () => {
  gameResult("Rock ✊", "Paper ✋", "Rock ✊");
});
// when click paper button run gameResult fun, with the given parametres
document.querySelector(".js-paper-button").addEventListener("click", () => {
  gameResult("Paper ✋", "Scissor ✌️", "Paper ✋");
});
// when click scissor button run gameResult fun, with the given parametres
document.querySelector(".js-scissor-button").addEventListener("click", () => {
  gameResult("Scissor ✌️", "Rock ✊", "Scissor ✌️");
});

// pick a move using keyboard
// r => rock | p => paper | s => scissor
document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    gameResult("Rock ✊", "Paper ✋", "Rock ✊");
  } else if (event.key === "p") {
    gameResult("Paper ✋", "Scissor ✌️", "Paper ✋");
  } else if (event.key === "s") {
    gameResult("Scissor ✌️", "Rock ✊", "Scissor ✌️");
  } else if (event.key === "Backspace") {
    confirmReset();
  }
});

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "Rock ✊";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "Paper ✋";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "Scissor ✌️";
  }

  return computerMove;
}

// display score in the page
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.win} | Ties: ${score.tie} | Losses: ${score.loose}`;
}

// when click Reset Score Button, display confirm message
document.querySelector(".js-reset-button").addEventListener("click", () => {
  confirmReset();
});

function confirmReset() {
  // display confirm message
  document.querySelector(".js-confirm-message").innerHTML = `
          <p class="js-confirm-reset">
            Are you sure you want to reset the score ?
            <button class="yes-btn">Yes</button>
            <button class="js-no-btn">No</button>
          </p>`;
  // when click yes, remove the confirm message
  // and reset the score
  document.querySelector(".yes-btn").addEventListener("click", () => {
    document.querySelector(".js-confirm-message").innerHTML = ``;
    resetScore();
  });

  // when click no, remove the confirm message
  document.querySelector(".js-no-btn").addEventListener("click", () => {
    document.querySelector(".js-confirm-message").innerHTML = ``;
  });
}

// when confirm Reseting Score, All score back to 0
// remove any data on the Local-Storage
// update the score on the page & remove last move from the page
function resetScore() {
  score.win = 0;
  score.loose = 0;
  score.tie = 0;
  localStorage.removeItem("score");
  updateScoreElement();
  removeLastPlayed();
}

function autoPlay() {
  // bring auto play button to js, and change it to Stop
  const autoPlayElement = document.querySelector(".js-auto-play");
  autoPlayElement.innerHTML = "Stop";

  // if the button is Stop add attribute,
  // to be able to run the stopAutoplay fun separtely
  if (autoPlayElement.innerHTML === "Stop") {
    autoPlayElement.setAttribute(
      "onclick",
      "stopAutoPlay(); removeLastPlayed();"
    );
  }

  // playerInterval is the ID of setInterval to let us
  // able to stop it later
  playInterval = setInterval(() => {
    let myMove = pickComputerMove();
    let result2 = "";
    let result3 = "";

    // reset my move
    if (myMove === "Rock ✊") {
      result2 = "Paper ✋";
      result3 = myMove;
    } else if (myMove === "Paper ✋") {
      result2 = "Scissor ✌️";
      result3 = myMove;
    } else if (myMove === "Scissor ✌️") {
      result2 = "Rock ✊";
      result3 = myMove;
    }

    gameResult(myMove, result2, result3);
  }, 1500);
}

// stop the Auto PLay
function stopAutoPlay() {
  clearInterval(playInterval);
  backToAutoplay();
}

// after the changes we did to the Auto play button
// this function to make it back normal
function backToAutoplay() {
  const autoPlayElement = document.querySelector(".js-auto-play");
  autoPlayElement.innerHTML = "Auto Play";

  autoPlayElement.setAttribute("onclick", "autoPlay()");
}

// remove last move, result & played on the page
function removeLastPlayed() {
  document.querySelector(".js-result").innerHTML = "";
  document.querySelector(".js-moves").innerHTML = "";
}
