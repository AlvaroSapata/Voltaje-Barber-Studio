//* GV & DOM ELEMENTS

const splashScreenDOM = document.querySelector("#splash-screen"); // Splash screen
const instructionsScreenDOM = document.querySelector("#instructions-screen"); // Instructions
const gameOverScreenDOM = document.querySelector("#gameover-screen"); // Game over screen
const scoresScreenDOM = document.querySelector("#score-screens");
const canvas = document.querySelector("#my-canvas"); // Canvas
const ctx = canvas.getContext("2d"); // Canvas tools

const audio = document.querySelector("#bcg-song"); // Background song
audio.volume = 0.05; // Background song volume

const startBtnDOM = document.querySelector("#start-btn"); // Start button
const restartBtnDOM = document.querySelector("#restart-btn"); // Restart button
const instructionsBtnDOM = document.querySelector("#instructions-btn"); // Go to instructions button

const muteBtnDOM = document.querySelector("#boton-sonidos"); // Pause - resume music button
let isMuted = false;

const playPauseBtnDOM = document.querySelector("#play-pause"); // Play - pause the game button

const difficultyBtnDOM = document.querySelector("#difficulty-button"); // manual difficulty button
const autoDifficultyBtnDOM = document.querySelector("#auto-difficulty-button"); // automatic difficulty button
let isAutoIncreaseOn = false;

const scissorsScoreDOM = document.querySelector(".scissors-counter"); // Number of scissors collected
const razorsScoreDOM = document.querySelector(".razors-counter"); // Number of razors collected

const life1ImageDOM = document.querySelector(".life-1"); // Lives
const life2ImageDOM = document.querySelector(".life-2");
const life3ImageDOM = document.querySelector(".life-3");

const scoreDOM = document.querySelector(".score-points"); // Score
const finalScoreDOM = document.querySelector(".final-score"); // Score in gameover screen
const highScoreDOM = document.querySelector(".highScore"); // Highscore
const hairWarningDOM = document.querySelector(".warning-cut"); // warning element
const beardWarningDOM = document.querySelector(".warning-shave"); // warning element

let gravitySpeed = 3; // Falling speed
let isGameOn = true;
let canMoveAgain = true; // Check

let gameObj;

//* STATE MANAGEMENT FUNCTIONS

const goToInstructions = () => {
  // 1. Swap screens
  splashScreenDOM.style.display = "none"; // Hides splash
  instructionsScreenDOM.style.display = "flex"; // Shows info
  scoresScreenDOM.style.display = "none"; // Hides scores
};

const startGame = () => {
  // 1. Swap screens
  instructionsScreenDOM.style.display = "none"; // Hides info
  canvas.style.display = "flex"; // Shows canvas
  scoresScreenDOM.style.display = "flex"; // Show scores
  gameOverScreenDOM.style.display = "none"; // Hide gameover
  playPauseBtnDOM.style.display = "flex"; // Show pause button
  autoDifficultyBtnDOM.style.display = "flex"; // Show auto difficulty button
  difficultyBtnDOM.style.display = "flex"; // Show difficulty button

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
  playPauseBtnDOM.style.display = "flex"; // Show pause button
  autoDifficultyBtnDOM.style.display = "flex"; // Show auto difficulty button
  difficultyBtnDOM.style.display = "flex"; // Show difficulty button
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
  // Pause - Resume the game
  if (isGameOn === true) {
    isGameOn = false;
    playPauseBtnDOM.innerHTML = `- Click to Resume -<img src="images/play.png" alt="play">`;
  } else {
    isGameOn = true;
    playPauseBtnDOM.innerHTML = `- Click to Pause -<img src="images/pause.png" alt="pause">`;
    gameObj.gameLoop(); // Call back gameLoop
  }
});
difficultyBtnDOM.addEventListener("click", () => {
  // Manual difficulty increase
  if (isAutoIncreaseOn === false) {
    if (gravitySpeed === 3) {
      gravitySpeed = 4;
      difficultyBtnDOM.innerHTML =
        "- Click to Change Difficulty -<br>- Level 2 -";
    } else if (gravitySpeed === 4) {
      gravitySpeed = 5;
      difficultyBtnDOM.innerHTML =
        "- Click to Change Difficulty -<br>- Level 3 -";
    } else if (gravitySpeed === 5) {
      gravitySpeed = 6;
      difficultyBtnDOM.innerHTML =
        "- Click to Change Difficulty -<br>- Level 4 -";
    } else if (gravitySpeed === 6) {
      gravitySpeed = 7;
      difficultyBtnDOM.innerHTML =
        "- Click to Change Difficulty -<br>- Level 5 -";
    } else {
      gravitySpeed = 3;
      difficultyBtnDOM.innerHTML =
        "- Click to Change Difficulty -<br>- Level 1 -";
    }
  }
});
autoDifficultyBtnDOM.addEventListener("click", () => {
  // Automatic difficulty increase
  isAutoIncreaseOn = !isAutoIncreaseOn;
  if (isAutoIncreaseOn === true) {
    autoDifficultyBtnDOM.innerHTML = `- Click to Deactivate -<br>- Auto Difficulty - <img src="images/tick.png" alt="deactivate">`;
    difficultyBtnDOM.style.display = "none";
  } else {
    autoDifficultyBtnDOM.innerHTML = `- Click to Activate -<br>- Auto Difficulty - <img src="images/x.png" alt="activate">`;
    difficultyBtnDOM.style.display = "flex";
  }
});

// Customer movement
window.addEventListener("keydown", (event) => {
  if (
    gameObj !== undefined &&
    canMoveAgain === true &&
    event.code === "ArrowLeft"
  ) {
    //gameObj.customer.moveLeft(); <-- this to move by "jumps"
    canMoveAgain = false;
    setTimeout(() => {
      canMoveAgain = true;
    }, 100);
    gameObj.customer.moveLeftFlow2();
  } else if (
    gameObj !== undefined &&
    canMoveAgain === true &&
    event.code === "ArrowRight"
  ) {
    //gameObj.customer.moveRight(); <-- this to move by "jumps"
    canMoveAgain = false;
    setTimeout(() => {
      canMoveAgain = true;
    }, 100);
    gameObj.customer.moveRightFlow2();
  }
});

//* Just to test how would react on a phone

window.addEventListener("touchstart", (event) => {
  // Get the touch position with clientX
  const touchX = event.touches[0].clientX;
  // Get the layout width
  const screenWidth = window.innerWidth;
  // Checks whether is a touch on the right side or in the left
  if (gameObj !== undefined && touchX < screenWidth / 2) {
    gameObj.customer.moveLeftFlow2();
  } else {
    gameObj.customer.moveRightFlow2();
  }
});

let lastTouchEnd = 0;
window.addEventListener('touchend', (event) => {
  const now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

