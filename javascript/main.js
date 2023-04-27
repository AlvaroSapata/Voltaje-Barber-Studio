//* GV & DOM ELEMENTS

const splashScreenDOM = document.querySelector("#splash-screen"); // Splash screen
const instructionsScreenDOM = document.querySelector("#instructions-screen"); // Instructions
const gameOverScreenDOM = document.querySelector("#gameover-screen"); // Game over screen
const scoresScreenDOM = document.querySelector("#score-screens"); // Scores screen
const canvas = document.querySelector("#my-canvas"); // Canvas
const ctx = canvas.getContext("2d"); // Canvas tools

const audio = document.querySelector("#bcg-song"); // Background song
audio.volume = 0.04; // Background song volume

const startBtnDOM = document.querySelector("#start-btn"); // Start button
const restartBtnDOM = document.querySelector("#restart-btn"); // Restart button
const instructionsBtnDOM = document.querySelector("#instructions-btn"); // Go to instructions button

const muteBtnDOM = document.querySelector("#boton-sonidos"); // Pause - resume music button
let isMuted = false;

const playPauseBtnDOM = document.querySelector("#play-pause"); // Play - pause the game button

const difficultyBtnDOM = document.querySelector("#difficulty-button"); // manual difficulty button
const autoDifficultyBtnDOM = document.querySelector("#auto-difficulty-button"); // automatic difficulty button
let isAutoIncreaseOn = false;

// DARK THEME ________________________________________________________________________
const toggleThemeDOM = document.querySelector("#toggle-themes");
let isDarkMode = false;

const bodyDOM = document.querySelector("#body-theme");
const imgBcg = document.querySelector("#img-bcg");
const textBtn = document.querySelector(".instructionsP");
// INSTRUCTIONS
const imageInfo = document.querySelector("#img-info");
const image1 = document.querySelector(".grown1");
const image2 = document.querySelector(".grown2");
const image3 = document.querySelector(".grown3");
const image4 = document.querySelector(".grown4");
const arrow1 = document.querySelector(".arrow1");
const arrow2 = document.querySelector(".arrow2");
const arrow3 = document.querySelector(".arrow3");
const heartFull = document.querySelector(".heartFull");
const heartHalf = document.querySelector(".heartHalf");
const heartEmpty = document.querySelector(".heartEmpty");
const imgScissors = document.querySelector(".imgScissors");
const imgRazors = document.querySelector(".imgRazors");
const imgBombs = document.querySelector(".imgBombs");
const imgTrimmers = document.querySelector(".imgTrimmers");
// CANVAS
const warningShaveImg = document.querySelector(".warningShave-Icon-img");
const razorImg = document.querySelector(".razor-img");
const life1Img = document.querySelector(".life-1");
const life2Img = document.querySelector(".life-2");
const life3Img = document.querySelector(".life-3");
const scissorImg = document.querySelector(".scissor-img");
const warningCutImg = document.querySelector(".warningCut-Icon-img");
// GAME OVER
const imgGameOver = document.querySelector("#img-gameover");
const textBtnGameover = document.querySelector(".btn");

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

const toggleTheme = () => {
  if (isDarkMode === true) {
    toggleThemeDOM.innerText = "- Click to go to Light Mode -";
    bodyDOM.style.backgroundImage = "url(../images/dark/LogoBackground.png)";
    bodyDOM.style.color = "white";
    // SPLASH
    imgBcg.style.border = "4px solid white";
    imgBcg.src = "../images/dark/VoltajeBarberStudio.png";
    textBtn.style.color = "white";
    // INSTRUCTIONS
    imageInfo.src = "images/dark/LogoBackground.png";
    imageInfo.style.border = "4px solid white";
    image1.src = "images/dark/grown1.png";
    image2.src = "images/dark/grown2.png";
    image3.src = "images/dark/grown3.png";
    image4.src = "images/dark/grown4.png";
    arrow1.src = "images/dark/flechaizda.png";
    arrow2.src = "images/dark/flechaizda.png";
    arrow3.src = "images/dark/flechaizda.png";
    heartFull.src = "images/dark/heart.png";
    heartHalf.src = "images/dark/half-heart.png";
    heartEmpty.src = "images/dark/empty-heart.png";
    imgScissors.src = "images/dark/ScissorDown.png";
    imgRazors.src = "images/dark/razor.png";
    imgBombs.src = "images/dark/bomba.png";
    imgTrimmers.src = "images/dark/trimmer.png";
    // CANVAS
    scoresScreenDOM.style.borderColor = "white";
    warningShaveImg.src = "images/dark/warning.png";
    razorImg.src = "images/dark/razor.png";
    life1Img.src = "images/dark/heart.png";
    life2Img.src = "images/dark/heart.png";
    life3Img.src = "images/dark/heart.png";
    scissorImg.src = "images/dark/ScissorDown.png";
    warningCutImg.src = "images/dark/warning.png";
    // GAME OVER
    imgGameOver.src = "../images/dark/VoltajeBarberStudio.png";
    imgGameOver.style.borderColor = "white";
    textBtnGameover.style.color = "white";
    // BUTTONS
    toggleThemeDOM.style.color = "white";
    toggleThemeDOM.style.border = "4px solid white";
    toggleThemeDOM.style.backgroundImage =
      "url(../images/dark/LogoBackground.png)";
    playPauseBtnDOM.style.color = "white";
    playPauseBtnDOM.style.border = "4px solid white";
    playPauseBtnDOM.style.backgroundImage =
      "url(../images/dark/LogoBackground.png)";
    difficultyBtnDOM.style.color = "white";
    difficultyBtnDOM.style.border = "4px solid white";
    difficultyBtnDOM.style.backgroundImage =
      "url(../images/dark/LogoBackground.png)";
    autoDifficultyBtnDOM.style.color = "white";
    autoDifficultyBtnDOM.style.border = "4px solid white";
    autoDifficultyBtnDOM.style.backgroundImage =
      "url(../images/dark/LogoBackground.png)";
    if (isGameOn === true) {
      playPauseBtnDOM.innerHTML = `- Click to Pause -<img src="images/dark/pause.png" alt="play">`;
    } else {
      playPauseBtnDOM.innerHTML = `- Click to Resume -<img src="images/dark/play.png" alt="pause">`;
    }
    if (isAutoIncreaseOn === true) {
      autoDifficultyBtnDOM.innerHTML = `- Click to Deactivate -<br>- Auto Difficulty - <img src="images/dark/tick.png" alt="deactivate">`;
    } else {
      autoDifficultyBtnDOM.innerHTML = `- Click to Activate -<br>- Auto Difficulty - <img src="images/dark/x.png" alt="activate">`;
    }
  } else {
    toggleThemeDOM.innerText = "- Click to go to Dark Mode -";
    bodyDOM.style.backgroundImage = "url(../images/LogoBackground.png)";
    bodyDOM.style.color = "black";
    // SPLASH
    imgBcg.style.border = "4px solid black";
    imgBcg.src = "../images/VoltajeBarberStudio.png";
    textBtn.style.color = "black";

    // INSTRUCTIONS
    imageInfo.src = "images/LogoBackground.png";
    imageInfo.style.border = "4px solid black";
    image1.src = "images/grown1.png";
    image2.src = "images/grown2.png";
    image3.src = "images/grown3.png";
    image4.src = "images/grown4.png";
    arrow1.src = "images/felcha-izda.png";
    arrow2.src = "images/felcha-izda.png";
    arrow3.src = "images/felcha-izda.png";
    heartFull.src = "images/heart.png";
    heartHalf.src = "images/half-hear.png";
    heartEmpty.src = "images/empty-heart.png";
    imgScissors.src = "images/ScissorsDown.png";
    imgRazors.src = "images/razor.png";
    imgBombs.src = "images/bomba.png";
    imgTrimmers.src = "images/trimmer.png";
    // CANVAS
    scoresScreenDOM.style.borderColor = "black";
    warningShaveImg.src = "images/warning.png";
    razorImg.src = "images/razor.png";
    life1Img.src = "images/heart.png";
    life2Img.src = "images/heart.png";
    life3Img.src = "images/heart.png";
    scissorImg.src = "images/ScissorsDown.png";
    warningCutImg.src = "images/warning.png";
    // GAME OVER
    imgGameOver.src = "../images/VoltajeBarberStudio.png";
    imgGameOver.style.borderColor = "black";
    textBtnGameover.style.color = "black";
    // BUTTONS
    toggleThemeDOM.style.color = "black";
    toggleThemeDOM.style.border = "4px solid black";
    toggleThemeDOM.style.backgroundImage = "url(../images/LogoBackground.png)";
    playPauseBtnDOM.style.color = "black";
    playPauseBtnDOM.style.border = "4px solid black";
    playPauseBtnDOM.style.backgroundImage = "url(../images/LogoBackground.png)";
    difficultyBtnDOM.style.color = "black";
    difficultyBtnDOM.style.border = "4px solid black";
    difficultyBtnDOM.style.backgroundImage =
      "url(../images/LogoBackground.png)";
    autoDifficultyBtnDOM.style.color = "black";
    autoDifficultyBtnDOM.style.border = "4px solid black";
    autoDifficultyBtnDOM.style.backgroundImage =
      "url(../images/LogoBackground.png)";
    if (isGameOn === true) {
      playPauseBtnDOM.innerHTML = `- Click to Pause -<img src="images/pause.png" alt="play">`;
    } else {
      playPauseBtnDOM.innerHTML = `- Click to Resume -<img src="images/play.png" alt="pause">`;
    }
    if (isAutoIncreaseOn === true) {
      autoDifficultyBtnDOM.innerHTML = `- Click to Deactivate -<br>- Auto Difficulty - <img src="images/tick.png" alt="deactivate">`;
    } else {
      autoDifficultyBtnDOM.innerHTML = `- Click to Activate -<br>- Auto Difficulty - <img src="images/x.png" alt="activate">`;
    }
  }
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
    if (isDarkMode === true) {
      playPauseBtnDOM.innerHTML = `- Click to Resume -<img src="images/dark/play.png" alt="play">`;
    } else {
      playPauseBtnDOM.innerHTML = `- Click to Resume -<img src="images/play.png" alt="play">`;
    }
  } else {
    isGameOn = true;
    if (isDarkMode === true) {
      playPauseBtnDOM.innerHTML = `- Click to Pause -<img src="images/dark/pause.png" alt="pause">`;
    } else {
      playPauseBtnDOM.innerHTML = `- Click to Pause -<img src="images/pause.png" alt="pause">`;
    }

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
    if (isDarkMode === true) {
      autoDifficultyBtnDOM.innerHTML = `- Click to Deactivate -<br>- Auto Difficulty - <img src="images/dark/tick.png" alt="deactivate">`;
      difficultyBtnDOM.style.display = "none";
    } else {
      autoDifficultyBtnDOM.innerHTML = `- Click to Deactivate -<br>- Auto Difficulty - <img src="images/tick.png" alt="deactivate">`;
      difficultyBtnDOM.style.display = "none";
    }
  } else {
    if (isDarkMode === true) {
      autoDifficultyBtnDOM.innerHTML = `- Click to Activate -<br>- Auto Difficulty - <img src="images/dark/x.png" alt="activate">`;
      difficultyBtnDOM.style.display = "flex";
    } else {
      autoDifficultyBtnDOM.innerHTML = `- Click to Activate -<br>- Auto Difficulty - <img src="images/x.png" alt="activate">`;
      difficultyBtnDOM.style.display = "flex";
    }
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

// Dark mode
toggleThemeDOM.addEventListener("click", () => {
  isDarkMode = !isDarkMode;
  toggleTheme();
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
window.addEventListener(
  "touchend",
  (event) => {
    const now = new Date().getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  false
);
