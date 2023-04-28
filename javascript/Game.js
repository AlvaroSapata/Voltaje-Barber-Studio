class Game {
  constructor() {
    // ELEMENTS AND INITIAL VALUES OF THE GAME

    // background
    this.background = new Image();
    if (isDarkMode === true) {
      this.background.src = "images/dark/canvas1000x600.jpg";
    } else {
      this.background.src = "images/CanvasBackground600x1000.jpg";
    }

    // Customer
    this.customer = new Customer();

    // Scissor
    this.scissorsArray = [];

    // Razor
    this.razorArray = [];

    // Bomb
    this.bombArray = [];

    // Trimmer
    this.trimmerArray = [];

    // Score & Lives
    this.score = 0;
    this.hairScore = 2;
    this.beardScore = 1;
    this.lives = 3;
    this.scissorsCounter = 0;
    this.razorsCounter = 0;

    // Checks
    this.randomLimit = 900;
    this.canLoseLife = true;
    this.canLoseLifeHair = true;
    this.canLoseLifeBeard = true;
    this.canSpawnTrimmer = true;
    this.isImmune = false;
  }

  // METHODS OF THE GAME
  drawBackground = () => {
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
    if ( isDarkMode === true){
      ctx.fillStyle = "white"
      ctx.fillRect(0, canvas.height - 4, canvas.width, 4);
      ctx.fillRect(0, 0, canvas.width, 4);
      ctx.fillRect(0, 0, 4, canvas.height);
      ctx.fillRect(canvas.width - 4, 0, 4, canvas.height);
    } else {
      ctx.fillStyle = "black"
      ctx.fillRect(0, canvas.height - 4, canvas.width, 4);
      ctx.fillRect(0, 0, canvas.width, 4);
      ctx.fillRect(0, 0, 4, canvas.height);
      ctx.fillRect(canvas.width - 4, 0, 4, canvas.height);
    };

  };

  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  spawnScissors = () => {
    // when empty array / position
    let randomScissorsPosition = Math.random() * this.randomLimit;
    if (
      this.scissorsArray.length === 0 ||
      this.scissorsArray[this.scissorsArray.length - 1].y > 200
    ) {
      let newScissor = new Scissor(randomScissorsPosition); // create new
      this.scissorsArray.push(newScissor); // add to array
    }
  };

  spawnRazors = () => {
    // when empty array / position
    let randomRazorsPosition = Math.random() * this.randomLimit;
    if (
      this.razorArray.length === 0 ||
      this.razorArray[this.razorArray.length - 1].y > 200
    ) {
      let newRazor = new Razor(randomRazorsPosition); // create new
      this.razorArray.push(newRazor); // add to array
    }
  };

  spawnBombs = () => {
    // when empty array / position
    let randomBombsPosition = Math.random() * this.randomLimit;
    if (
      this.bombArray.length === 0 ||
      this.bombArray[this.bombArray.length - 1].y > 200
    ) {
      let newBomb = new Bomb(randomBombsPosition); // create new
      this.bombArray.push(newBomb); // add to array
    }
  };

  spawnTrimmers = () => {
    // when < 1 and 12 seconds since last
    let randomPossibility = Math.random() * 100;
    let randomTrimmersPosition = Math.random() * this.randomLimit;

    if (randomPossibility < 1 && this.canSpawnTrimmer === true) {
      let newtrimmer = new Trimmer(randomTrimmersPosition); // create new
      this.trimmerArray.push(newtrimmer); // add to array
      this.canSpawnTrimmer = false;
      setTimeout(() => {
        this.canSpawnTrimmer = true;
      }, 12000);
    }
  };

  checkColisionCustomerScissor = () => {
    this.scissorsArray.forEach((eachScissor) => {
      if (
        eachScissor.canCollide === true &&
        eachScissor.x < this.customer.x + this.customer.w &&
        eachScissor.x + eachScissor.w > this.customer.x &&
        eachScissor.y < this.customer.y + this.customer.h &&
        eachScissor.h + eachScissor.y > this.customer.y
      ) {
        if (this.isImmune === true) {
          this.score += this.hairScore * 3; // if imune, triple score
          const scissorAudio = new Audio("audio/scissors.wav");
          scissorAudio.volume = 0.7;
          scissorAudio.play();
          this.scissorsCounter += 1;
          this.customer.cutHair();
          this.canLoseLifeHair = true;
          scissorsScoreDOM.innerText = `${this.scissorsCounter}`;
          scoreDOM.innerText = `Score: ${this.score}`;
          if (isDarkMode === true) {
            eachScissor.img.src = "images/dark/ScissorDownClosed.png"; // animation
          } else {
            eachScissor.img.src = "images/ScissorsDownClosed.png"; // animation
          }

          eachScissor.canCollide = false;
          setTimeout(() => {
            this.scissorsArray.shift();
          }, 100);
        } else {
          this.score += this.hairScore;
          const scissorAudio = new Audio("audio/scissors.wav");
          scissorAudio.volume = 0.7;
          scissorAudio.play();
          this.scissorsCounter += 1;
          this.customer.cutHair();
          this.canLoseLifeHair = true;
          scissorsScoreDOM.innerText = `${this.scissorsCounter}`;
          scoreDOM.innerText = `Score: ${this.score}`;
          if (isDarkMode === true) {
            eachScissor.img.src = "images/dark/ScissorDownClosed.png"; // animation
          } else {
            eachScissor.img.src = "images/ScissorsDownClosed.png"; // animation
          }

          eachScissor.canCollide = false;
          setTimeout(() => {
            this.scissorsArray.shift();
          }, 100);
        }
      }
    });
  };

  checkColisionCustomerRazor = () => {
    this.razorArray.forEach((eachRazor) => {
      if (
        eachRazor.canCollide === true &&
        eachRazor.x < this.customer.x + this.customer.w &&
        eachRazor.x + eachRazor.w > this.customer.x &&
        eachRazor.y < this.customer.y + this.customer.h &&
        eachRazor.h + eachRazor.y > this.customer.y
      ) {
        if (this.isImmune === true) {
          this.score += this.beardScore * 3; // if imune, triple score
          const razorAudio = new Audio("audio/razor.wav");
          razorAudio.volume = 0.4;
          razorAudio.play();
          this.razorsCounter += 1;
          this.customer.shaveBeard();
          this.canLoseLifeBeard = true;
          razorsScoreDOM.innerText = `${this.razorsCounter}`;
          scoreDOM.innerText = `Score: ${this.score}`;
          if (isDarkMode === true) {
            eachRazor.img.src = "images/dark/razorClosed.png"; // animation
          } else {
            eachRazor.img.src = "images/razorClosed.png"; // animation
          }
          eachRazor.canCollide = false;
          setTimeout(() => {
            this.razorArray.shift();
          }, 100);
        } else {
          this.score += this.beardScore ;
          const razorAudio = new Audio("audio/razor.wav");
          razorAudio.volume = 0.4;
          razorAudio.play();
          this.razorsCounter += 1;
          this.customer.shaveBeard();
          this.canLoseLifeBeard = true;
          razorsScoreDOM.innerText = `${this.razorsCounter}`;
          scoreDOM.innerText = `Score: ${this.score}`;
          if (isDarkMode === true) {
            eachRazor.img.src = "images/dark/razorClosed.png"; // animation
          } else {
            eachRazor.img.src = "images/razorClosed.png"; // animation
          }
          eachRazor.canCollide = false;
          setTimeout(() => {
            this.razorArray.shift();
          }, 100);
        }
      }
    });
  };

  checkColisionCustomerBomb = () => {
    this.bombArray.forEach((eachBomb) => {
      if (
        eachBomb.canCollide === true &&
        eachBomb.x < this.customer.x + this.customer.w &&
        eachBomb.x + eachBomb.w > this.customer.x &&
        eachBomb.y < this.customer.y + this.customer.h &&
        eachBomb.h + eachBomb.y > this.customer.y
      ) {
        if (this.isImmune === true) {
          // if immune doesnt lose life
          const bombAudio = new Audio("audio/bang.wav");
          bombAudio.volume = 0.05;
          bombAudio.play();
          this.livesCounter();
          const ouchAudio = new Audio("audio/ouch.wav");
          ouchAudio.play();
          if (isDarkMode === true) {
            eachBomb.img.src = "images/dark/explosion2.png"; // animation
          } else {
            eachBomb.img.src = "images/explosion2.png"; // animation
          }
          eachBomb.canCollide = false;
          setTimeout(() => {
            this.bombArray.shift();
          }, 100);
        } else {
          this.lives -= 1;
          const bombAudio = new Audio("audio/bang.wav");
          bombAudio.volume = 0.05;
          bombAudio.play();
          this.livesCounter();
          const ouchAudio = new Audio("audio/ouch.wav");
          ouchAudio.play();
          if (isDarkMode === true) {
            eachBomb.img.src = "images/dark/explosion2.png"; // animation
          } else {
            eachBomb.img.src = "images/explosion2.png";
          }
          eachBomb.canCollide = false;
          setTimeout(() => {
            this.bombArray.shift();
          }, 100);
        }
      }
    });
  };

  checkColisionCustomerTrimmer = () => {
    this.trimmerArray.forEach((eachTrimmer) => {
      if (
        eachTrimmer.canCollide === true &&
        eachTrimmer.x < this.customer.x + this.customer.w &&
        eachTrimmer.x + eachTrimmer.w > this.customer.x &&
        eachTrimmer.y < this.customer.y + this.customer.h &&
        eachTrimmer.h + eachTrimmer.y > this.customer.y
      ) {
        const trimmerAudio = new Audio("audio/trimmer.wav");
        trimmerAudio.volume = 0.8;
        trimmerAudio.play();
        this.isImmune = true;
        this.trimmerArray.shift();
        setTimeout(() => {
          const immunityAudio = new Audio("audio/Immune5sec.mp3");
          immunityAudio.volume = 0.4;
          immunityAudio.play();
        }, 50);
        setTimeout(() => {
          this.isImmune = false;
        }, 5000);
      }
    });
  };

  removeScissors = () => {
    // remove when out of canvas or when colide
    if (this.scissorsArray[0].y > canvas.height) this.scissorsArray.shift();
  };

  removeRazors = () => {
    // remove when out of canvas or when colide
    if (this.razorArray[0].y > canvas.height) this.razorArray.shift();
  };

  removeBombs = () => {
    // remove when out of canvas or when colide
    if (this.bombArray[0].y > canvas.height) this.bombArray.shift();
  };

  removeTrimmers = () => {
    // remove when out of canvas or when colide
    if (
      this.trimmerArray.length !== 0 &&
      this.trimmerArray[0].y > canvas.height
    )
      this.trimmerArray.shift();
  };

  livesCounter = () => {
    // Game over
    if (this.lives <= 0) {
      this.gameOver();
      finalScoreDOM.innerText = `- You Scored ${this.score} points -`;
    }
    // Hearts
    if ( isDarkMode === true){
      if (this.lives === 3) {
        life3ImageDOM.src = "images/dark/heart.png";
        life2ImageDOM.src = "images/dark/heart.png";
        life1ImageDOM.src = "images/dark/heart.png";
      } else if (this.lives === 2.5) {
        life3ImageDOM.src = "images/dark/half-heart.png";
        life2ImageDOM.src = "images/dark/heart.png";
        life1ImageDOM.src = "images/dark/heart.png";
      } else if (this.lives === 2) {
        life3ImageDOM.src = "images/dark/empty-heart.png";
        life2ImageDOM.src = "images/dark/heart.png";
        life1ImageDOM.src = "images/dark/heart.png";
      } else if (this.lives === 1.5) {
        life3ImageDOM.src = "images/dark/empty-heart.png";
        life2ImageDOM.src = "images/dark/half-heart.png";
        life1ImageDOM.src = "images/dark/heart.png";
      } else if (this.lives === 1) {
        life3ImageDOM.src = "images/dark/empty-heart.png";
        life2ImageDOM.src = "images/dark/empty-heart.png";
        life1ImageDOM.src = "images/dark/heart.png";
      } else if (this.lives === 0.5) {
        life3ImageDOM.src = "images/dark/empty-heart.png";
        life2ImageDOM.src = "images/dark/empty-heart.png";
        life1ImageDOM.src = "images/dark/half-heart.png";
      } else {
        life3ImageDOM.src = "images/dark/empty-heart.png";
        life2ImageDOM.src = "images/dark/empty-heart.png";
        life1ImageDOM.src = "images/dark/empty-heart.png";
      }
    } else {
      if (this.lives === 3) {
        life3ImageDOM.src = "images/heart.png";
        life2ImageDOM.src = "images/heart.png";
        life1ImageDOM.src = "images/heart.png";
      } else if (this.lives === 2.5) {
        life3ImageDOM.src = "images/half-hear.png";
        life2ImageDOM.src = "images/heart.png";
        life1ImageDOM.src = "images/heart.png";
      } else if (this.lives === 2) {
        life3ImageDOM.src = "images/empty-heart.png";
        life2ImageDOM.src = "images/heart.png";
        life1ImageDOM.src = "images/heart.png";
      } else if (this.lives === 1.5) {
        life3ImageDOM.src = "images/empty-heart.png";
        life2ImageDOM.src = "images/half-hear.png";
        life1ImageDOM.src = "images/heart.png";
      } else if (this.lives === 1) {
        life3ImageDOM.src = "images/empty-heart.png";
        life2ImageDOM.src = "images/empty-heart.png";
        life1ImageDOM.src = "images/heart.png";
      } else if (this.lives === 0.5) {
        life3ImageDOM.src = "images/empty-heart.png";
        life2ImageDOM.src = "images/empty-heart.png";
        life1ImageDOM.src = "images/half-hear.png";
      } else {
        life3ImageDOM.src = "images/empty-heart.png";
        life2ImageDOM.src = "images/empty-heart.png";
        life1ImageDOM.src = "images/empty-heart.png";
      }
    };
    
  };

  canLoseLifeChecker = () => {
    // With this we avoid losing another half life after picking anything good
    if (this.canLoseLifeHair === true && this.canLoseLifeBeard === true) {
      this.canLoseLife = true;
    } else {
      this.canLoseLife = false;
    }
  };

  hairTooLong = () => {
    if (
      this.canLoseLife === true &&
      (this.customer.beardCounter === this.customer.maxGrowLength ||
        this.customer.hairCounter === this.customer.maxGrowLength)
    ) {
      this.lives -= 0.5;
      this.canLoseLifeHair = false;
      this.canLoseLifeBeard = false;
      this.livesCounter();
      const ouchAudio2 = new Audio("audio/ouch.wav");
      ouchAudio2.play();
    }
    if (this.customer.beardCounter >= 3) {
      beardWarningDOM.style.opacity = 1;
    } else {
      beardWarningDOM.style.opacity = 0;
    }
    if (this.customer.hairCounter >= 3) {
      hairWarningDOM.style.opacity = 1;
    } else {
      hairWarningDOM.style.opacity = 0;
    }
  };

  autoIncreaseDifficulty = () => {
    if (isAutoIncreaseOn === true) {
      if (this.score >= 25 && this.score < 50) {
        gravitySpeed = 4;
      } else if (this.score >= 50 && this.score < 75) {
        gravitySpeed = 5;
      } else if (this.score >= 75 && this.score < 100) {
        gravitySpeed = 6;
      } else if (this.score >= 100 && this.score < 125) {
        gravitySpeed = 7;
      } else if (this.score >= 125) {
        gravitySpeed = 8;
      } else {
        gravitySpeed = 3;
      }
    }
  };

  updateHighScore = () => {
    let actualScore = this.score;
    // Get the highscore from the local storage
    let highScore = localStorage.getItem("highscore");
    // Check whether the actual score is higher, and if so set it as the new highscore
    if (highScore === null || actualScore > parseInt(highScore)) {
      localStorage.setItem("highscore", actualScore.toString());
      highScore = localStorage.getItem("highscore");
    }
    
    highScoreDOM.innerText = `- The Highscore is: ${highScore} -`;
  };

  gameOver = () => {
    // 1. Stop the game
    isGameOn = false;

    // 2. Hide canvas
    canvas.style.display = "none";
    scoresScreenDOM.style.display = "none";
    playPauseBtnDOM.style.display = "none";
    difficultyBtnDOM.style.display = "none";
    autoDifficultyBtnDOM.style.display = "none";
    toggleThemeDOM.style.display = "flex"

    // 3. Show game over screen
    gameOverScreenDOM.style.display = "flex";

    // 4. Update Highscore
    this.updateHighScore();
  };

  gameLoop = () => {
    //* 1. Clear canvas
    this.clearCanvas();

    //* 2. Actions and movements of the elements
    this.spawnScissors();
    this.spawnRazors();
    this.spawnBombs();
    this.spawnTrimmers();

    // Gravity
    this.scissorsArray.forEach((eachScissor) => {
      eachScissor.gravity();
    });
    this.razorArray.forEach((eachRazor) => {
      eachRazor.gravity();
    });
    this.bombArray.forEach((eachBomb) => {
      eachBomb.gravity();
    });
    this.trimmerArray.forEach((eachTrimmer) => {
      eachTrimmer.gravity();
    });

    this.customer.moveLeftFlow();
    this.customer.moveRightFlow();

    // Check collisions
    this.checkColisionCustomerScissor();
    this.checkColisionCustomerRazor();
    this.checkColisionCustomerBomb();
    this.checkColisionCustomerTrimmer();

    // Remove elements
    this.removeScissors();
    this.removeRazors();
    this.removeBombs();
    this.removeTrimmers();

    // Lives system
    this.hairTooLong();
    this.canLoseLifeChecker();

    // Difficulty level
    this.autoIncreaseDifficulty();

    //* 3. Drawing of the elements
    this.drawBackground();
    this.customer.draw();

    this.scissorsArray.forEach((eachScissor) => {
      eachScissor.draw();
    });
    this.razorArray.forEach((eachRazor) => {
      eachRazor.draw();
    });
    this.bombArray.forEach((eachBomb) => {
      eachBomb.draw();
    });
    this.trimmerArray.forEach((eachTrimmer) => {
      eachTrimmer.draw();
    });

    //* 4. Recursion ( requestAnimationFrame )
    //this.isGameOn
    if (isGameOn === true) {
      requestAnimationFrame(this.gameLoop); // 60ps invokes gameloop()
    }
  };
}
