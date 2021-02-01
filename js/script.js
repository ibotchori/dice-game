var btnNew = document.querySelector(".btn-new");
var btnRoll = document.querySelector(".btn-roll");
var btnHold = document.querySelector(".btn-hold");
var finalScore = document.querySelector(".final-score");
var dice = document.querySelector(".dice");
var dice2 = document.querySelector(".dice2");

var scores, currentScore, activePlayerPanel, gameStatus;

var init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameStatus = true;
  activePlayerPanel = document.querySelector(
    ".player-" + activePlayer + "-panel"
  );
  document.querySelector(".player-0-panel .player-score").textContent = 0;
  document.querySelector(".player-1-panel .player-score").textContent = 0;
  document.querySelector(
    ".player-0-panel .player-current-score"
  ).textContent = 0;
  document.querySelector(
    ".player-1-panel .player-current-score"
  ).textContent = 0;
  document.querySelector(".player-0-panel .player-name").textContent =
    "Player 1";
  document.querySelector(".player-1-panel .player-name").textContent =
    "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
  dice.style.display = "none";
  dice2.style.display = "none";
};

var next = function () {
  currentScore = 0;
  activePlayerPanel.querySelector(
    ".player-current-score"
  ).textContent = currentScore;
  activePlayerPanel.classList.remove("active");
  activePlayer = activePlayer == 0 ? 1 : 0; // 0 or 1
  activePlayerPanel = document.querySelector(
    ".player-" + activePlayer + "-panel"
  );
  activePlayerPanel.classList.add("active");
};

var rollDice = function () {
  if (gameStatus && finalScore.value) {
    var randomNumber = Math.floor(Math.random() * 6 + 1);
    dice.src = "img/dice-" + randomNumber + ".png";
    var randomNumber2 = Math.floor(Math.random() * 6 + 1);
    dice2.src = "img/dice-" + randomNumber2 + ".png";
    currentScore += randomNumber + randomNumber2;
    dice.style.display = "block";
    dice2.style.display = "block";

    if (randomNumber !== 1 && randomNumber2 !== 1) {
      activePlayerPanel.querySelector(
        ".player-current-score"
      ).textContent = currentScore;
    } else {
      //Next player
      next();
    }
  } else {
    finalScore.focus();
    finalScore.placeholder = "Please Insert Winner Score";
  }
};

var hold = function () {
  if (gameStatus && +finalScore.value) {
    scores[activePlayer] += currentScore;
    activePlayerPanel.querySelector(".player-score").textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= +finalScore.value) {
      //Winner
      activePlayerPanel.classList.remove("active");
      activePlayerPanel.classList.add("winner");
      activePlayerPanel.querySelector(".player-name").textContent = "Winner!!!";
      dice.style.display = "none";
      dice2.style.display = "none";
      gameStatus = false;
      finalScore.value = "";
      finalScore.placeholder = "Winner Score";
      currentScore = 0;
      activePlayerPanel.querySelector(
        ".player-current-score"
      ).textContent = currentScore;
    } else {
      //Next
      next();
    }
  }
};

init(); // Initialization
btnRoll.addEventListener("click", rollDice); // Roll DIce
btnHold.addEventListener("click", hold); // Hold
btnNew.addEventListener("click", function () {
  init();
}); // New Game
