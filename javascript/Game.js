class Game {
  constructor() {
    // ELEMENTS AND INITIAL VALUES OF THE GAME

    // background
    this.background = new Image();
    this.background.src = "images/LogoBackground.png";

    // Customer
    this.customer = new Customer();

    // Scissor
    this.scissorsArray = [];

    // Razor
    this.razorArray = [];

    // Bomb
    this.bombArray = [];

    // Score & Lives
    this.score = 0;
    this.hairScore = 2;
    this.beardScore = 1;
    this.lives = 3;
    this.scissorsCounter = 0;
    this.razorsCounter = 0;

    // Checks
    //this.isGameOn = true;
    this.randomLimit = 900;
    this.canLoseLife = true;
    this.canLoseLifeHair = true;
    this.canLoseLifeBeard = true;
  }

  // METHODS OF THE GAME
  drawBackground = () => {
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, canvas.height - 4, canvas.width, 4);
    ctx.fillRect(0, 0, canvas.width, 4);
    ctx.fillRect(0, 0, 4, canvas.height);
    ctx.fillRect(canvas.width - 4, 0, 4, canvas.height);
  };

  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // todo: BONUS ??
  randomObjectSelector = () => {
    // todo: selects a random object to deploy
    let randomObject = Math.random() * 3;

    if (randomObject <= 1) {
      this.spawnScissors();
    } else if (randomObject <= 2 && randomObject > 1) {
      this.spawnRazors();
    } else {
      this.spawnBombs();
    }
  };

  spawnScissors = () => {
    // when empty array / position / time
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
    // when empty array / position / time
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
    // when empty array / position / time
    let randomBombsPosition = Math.random() * this.randomLimit;
    if (
      this.bombArray.length === 0 ||
      this.bombArray[this.bombArray.length - 1].y > 200
    ) {
      let newBomb = new Bomb(randomBombsPosition); // create new
      this.bombArray.push(newBomb); // add to array
    }
  };

  checkColisionCustomerScissor = () => {
    this.scissorsArray.forEach((eachScissor) => {
      if (
        eachScissor.x < this.customer.x + this.customer.w &&
        eachScissor.x + eachScissor.w > this.customer.x &&
        eachScissor.y < this.customer.y + this.customer.h &&
        eachScissor.h + eachScissor.y > this.customer.y
      ) {
        this.score += this.hairScore;
        this.scissorsArray.shift();
        const scissorAudio = new Audio("audio/scissors.wav");
        scissorAudio.volume = 0.8;
        scissorAudio.play();
        this.scissorsCounter += 1;
        this.customer.cutHair();
        this.canLoseLifeHair = true;
        scissorsScoreDOM.innerText = `${this.scissorsCounter}`;
        scoreDOM.innerText = `Score: ${this.score}`;
      }
    });
  };

  checkColisionCustomerRazor = () => {
    this.razorArray.forEach((eachRazor) => {
      if (
        eachRazor.x < this.customer.x + this.customer.w &&
        eachRazor.x + eachRazor.w > this.customer.x &&
        eachRazor.y < this.customer.y + this.customer.h &&
        eachRazor.h + eachRazor.y > this.customer.y
      ) {
        this.score += this.beardScore;
        this.razorArray.shift();
        const razorAudio = new Audio("audio/razor.wav");
        razorAudio.volume = 0.6;
        razorAudio.play();
        this.razorsCounter += 1;
        this.customer.shaveBeard();
        this.canLoseLifeBeard = true;
        razorsScoreDOM.innerText = `${this.razorsCounter}`;
        scoreDOM.innerText = `Score: ${this.score}`;
      }
    });
  };

  checkColisionCustomerBomb = () => {
    this.bombArray.forEach((eachBomb) => {
      if (
        eachBomb.x < this.customer.x + this.customer.w &&
        eachBomb.x + eachBomb.w > this.customer.x &&
        eachBomb.y < this.customer.y + this.customer.h &&
        eachBomb.h + eachBomb.y > this.customer.y
      ) {
        this.bombArray.shift();
        this.lives -= 1;
        const bombAudio = new Audio("audio/bang.wav");
        bombAudio.volume = 0.04;
        bombAudio.play();
        this.livesCounter();
        const ouchAudio = new Audio("audio/ouch.wav");
        ouchAudio.play();
      }
    });
  };

  removeScissors = () => {
    // remove when out or when colide
    if (this.scissorsArray[0].y > canvas.height) this.scissorsArray.shift();
  };

  removeRazors = () => {
    // remove when out or when colide
    if (this.razorArray[0].y > canvas.height) this.razorArray.shift();
  };

  removeBombs = () => {
    // remove when out or when colide
    if (this.bombArray[0].y > canvas.height) this.bombArray.shift();
  };

  livesCounter = () => {
    if (this.lives <= 0) {
      this.gameOver();
      finalScoreDOM.innerText = `- You Scored ${this.score} points -`;
    }
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

  canLoseLifeChecker = () => {
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

  gameOver = () => {
    // 1. Stop the game
    //this.isGameOn = false;
    isGameOn = false;
    // 2. Hide canvas
    canvas.style.display = "none";
    scoresScreenDOM.style.display = "none";
    playPauseBtnDOM.style.display = "none";
    difficultyBtnDOM.style.display = "none";

    // 3. Show game over screen
    gameOverScreenDOM.style.display = "flex";
  };

  gameLoop = () => {
    //* 1. Clear canvas
    this.clearCanvas();

    //* 2. Actions and movements of the elements
    this.spawnScissors();
    this.spawnRazors();
    this.spawnBombs();

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

    // Check collisions
    this.checkColisionCustomerScissor();
    this.checkColisionCustomerRazor();
    this.checkColisionCustomerBomb();

    // Remove elements
    this.removeScissors();
    this.removeRazors();
    this.removeBombs();

    // Lives system
    this.hairTooLong();
    this.canLoseLifeChecker();

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

    //* 4. Recursion ( requestAnimationFrame )
    //this.isGameOn
    if (isGameOn === true) {
      requestAnimationFrame(this.gameLoop); // 60ps invokes gameloop()
    }
  };
}
