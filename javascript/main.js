//* GV & DOM ELEMENTS

const splashScreenDOM = document.querySelector("#splash-screen"); // Splash screen
const instructionsScreenDOM = document.querySelector("#instructions-screen"); // Instructions
const gameOverScreenDOM = document.querySelector("#gameover-screen"); // Game over screen
const scoresScreenDOM = document.querySelector("#score-screens");
const canvas = document.querySelector("#my-canvas"); // Canvas
const ctx = canvas.getContext("2d"); // Canvas tools

const audio = document.querySelector("#bcg-song"); // Background song
audio.volume = 0.05;

const startBtnDOM = document.querySelector("#start-btn"); // Start button
const restartBtnDOM = document.querySelector("#restart-btn"); // Restart button
const instructionsBtnDOM = document.querySelector("#instructions-btn"); // Go to instructions button

const muteBtnDOM = document.querySelector("#boton-sonidos"); // Pause - resume music button
let isMuted = false;

const playPauseBtnDOM = document.querySelector("#play-pause"); // Play - pause the game button

const difficultyBtnDOM = document.querySelector('#difficulty-button');

const scissorsScoreDOM = document.querySelector(".scissors-counter"); // Number of scissors collected
const razorsScoreDOM = document.querySelector(".razors-counter"); // Number of razors collected

const life1ImageDOM = document.querySelector(".life-1"); // Lives
const life2ImageDOM = document.querySelector(".life-2");
const life3ImageDOM = document.querySelector(".life-3");

const scoreDOM = document.querySelector(".score-points"); // Score
const finalScoreDOM = document.querySelector(".final-score"); // Score in gameover screen
const hairWarningDOM = document.querySelector(".warning-cut"); // warning element
const beardWarningDOM = document.querySelector(".warning-shave"); // warning element

let gravitySpeed = 3; // Falling speed
let isGameOn = true;

let gameObj;

//* STATE MANAGEMENT FUNCTIONS

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
  gameOverScreenDOM.style.display = "none"; // Hide gameover
  playPauseBtnDOM.style.display = "flex" // Show pause button
  difficultyBtnDOM.style.display = "flex" // Show difficulty button

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
  playPauseBtnDOM.style.display = "flex" // Show pause button
  difficultyBtnDOM.style.display = "flex" // Show difficulty button
  // Reset DOM elements
  life3ImageDOM.src = "images/heart.png";
  life2ImageDOM.src = "images/heart.png";
  life1ImageDOM.src = "images/heart.png";
  scissorsScoreDOM.innerText = `0`;
  razorsScoreDOM.innerText = `0`;
  scoreDOM.innerText = `Score: 0`;
  // isGameOn
  isGameOn = true;

  // 2. Create game element
  gameObj = new Game();
  gameObj.customer.growBeard();
  gameObj.customer.growHair();

  // 3. Start the recursion
  gameObj.gameLoop();
};

//* ADD EVENT LISTENERS

// Click events
instructionsBtnDOM.addEventListener("click", goToInstructions);
startBtnDOM.addEventListener("click", startGame);
restartBtnDOM.addEventListener("click", restartGame);
playPauseBtnDOM.addEventListener("click", () => {
  if (isGameOn === true){
    isGameOn = false;
    playPauseBtnDOM.innerHTML = `- Click to Resume -<img src="images/play.png" alt="play">`
  }else{
    isGameOn = true;
    playPauseBtnDOM.innerHTML = `- Click to Pause -<img src="images/pause.png" alt="pause">`
    gameObj.gameLoop(); // Volver a llamar a gameLoop
  } 
});
difficultyBtnDOM.addEventListener('click', () => {
  if (gravitySpeed === 3) {
    gravitySpeed = 3.5;
    difficultyBtnDOM.innerHTML = '- Click to Change Difficulty -<br>- Level 2 -';
  } else if (gravitySpeed === 3.5) {
    gravitySpeed = 4;
    difficultyBtnDOM.innerHTML = '- Click to Change Difficulty -<br>- Level 3 -';
  } else if (gravitySpeed === 4) {
    gravitySpeed = 4.5;
    difficultyBtnDOM.innerHTML = '- Click to Change Difficulty -<br>- Level 4 -';
  } else if (gravitySpeed === 4.5) {
    gravitySpeed = 5;
    difficultyBtnDOM.innerHTML = '- Click to Change Difficulty -<br>- Level 5 -';
  } else {
    gravitySpeed = 3;
    difficultyBtnDOM.innerHTML = '- Click to Change Difficulty -<br>- Level 1 -';
  }
});

// Customer movement
window.addEventListener("keydown", (event) => {
  if (gameObj !== undefined && event.code === "ArrowLeft") {
    gameObj.customer.moveLeft();
  } else if (gameObj !== undefined && event.code === "ArrowRight") {
    gameObj.customer.moveRight();
  }
});
