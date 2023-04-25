//* GV

const splashScreenDOM = document.querySelector("#splash-screen"); // Splash screen
const instructionsScreenDOM = document.querySelector("#instructions-screen"); // Instructions
const gameOverScreenDOM = document.querySelector("#gameover-screen"); // Game over screen
const scoresScreenDOM = document.querySelector("#score-screens");
const canvas = document.querySelector("#my-canvas"); // Canvas
const ctx = canvas.getContext("2d"); // Canvas tools

const audio = document.querySelector("#bcg-song");
audio.volume = 0.05;

const startBtnDOM = document.querySelector("#start-btn"); // Start button
const restartBtnDOM = document.querySelector("#restart-btn"); // Restart button
const instructionsBtnDOM = document.querySelector("#instructions-btn"); // Go to instructions button

const scissorsScoreDOM = document.querySelector(".scissors-counter");
const razorsScoreDOM = document.querySelector(".razors-counter");

const life1ImageDOM = document.querySelector(".life-1");
const life2ImageDOM = document.querySelector(".life-2");
const life3ImageDOM = document.querySelector(".life-3");

const scoreDOM = document.querySelector(".score-points");
const finalScoreDOM = document.querySelector(".final-score");
const hairWarningDOM = document.querySelector(".warning-cut");
const beardWarningDOM = document.querySelector(".warning-shave");

const gravitySpeed = 3;

let gameObj;

//* STATE MANAGEMENT FUNCTIONS
// const FUNCTIONNAME = () => {}

const goToInstructions = () => {
  // 1. Swap screens
  splashScreenDOM.style.display = "none"; // Hides splash
  instructionsScreenDOM.style.display = "flex"; // Shows info
  scoresScreenDOM.style.display = "none";
};

const startGame = () => {
  // 1. Swap screens
  instructionsScreenDOM.style.display = "none"; // Hides info
  canvas.style.display = "flex"; // Shows canvas
  scoresScreenDOM.style.display = "flex"; // Show scores
  gameOverScreenDOM.style.display = "none";

  // 2. Create game element
  gameObj = new Game();
  gameObj.customer.growBeard();
  gameObj.customer.growHair();

  // 3. Start the recursion
  gameObj.gameLoop();
};

const restartGame = () => {
  // 1. Swap screens
  gameOverScreenDOM.style.display = "none";
  canvas.style.display = "block";
  scoresScreenDOM.style.display = "flex"; // Show scores
  // Reset DOM elements
  life3ImageDOM.src = "images/heart.png";
  life2ImageDOM.src = "images/heart.png";
  life1ImageDOM.src = "images/heart.png";
  /*     beardWarningDOM.innerHTML = ``;
    hairWarningDOM.innerHTML = ``; */
  scissorsScoreDOM.innerText = `0`;
  razorsScoreDOM.innerText = `0`;
  scoreDOM.innerText = `Score: 0`;

  // 2. Create game element
  gameObj = new Game();
  gameObj.customer.growBeard();
  gameObj.customer.growHair();

  // 3. Start the recursion
  gameObj.gameLoop();
};

//* ADD EVENT LISTENERS

instructionsBtnDOM.addEventListener("click", goToInstructions);
startBtnDOM.addEventListener("click", startGame);
restartBtnDOM.addEventListener("click", restartGame);

window.addEventListener("keydown", (event) => {
  if (gameObj !== undefined && event.code === "ArrowLeft") {
    gameObj.customer.moveLeft();
  } else if (gameObj !== undefined && event.code === "ArrowRight") {
    gameObj.customer.moveRight();
  }
});
