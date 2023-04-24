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
    this.isGameOn = true;
    this.randomLimit = 900;
    this.canLoseLife = true;
  }

  // METHODS OF THE GAME
  drawBackground = () => {
    ctx.drawImage(this.background, 0, 0, canvas.width, canvas.height);
  };

  clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

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
        scissorAudio.play();
        this.scissorsCounter += 1;
        this.customer.cutHair();
        this.canLoseLife = true;
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
        razorAudio.play();
        this.razorsCounter += 1;
        this.customer.shaveBeard();
        this.canLoseLife = true;
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
        console.log(this.lives);
        const bombAudio = new Audio("audio/bang.wav");
        bombAudio.volume = 0.1;
        bombAudio.play();
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

  drawScore = () => {
    ctx.font = "50px serif";
    ctx.fillText(Math.floor(this.score), 480, 40);
  };

  livesCounter = () => {
    if (this.lives <= 0) {
      this.gameOver();
    }
    /*  if (this.lives === 3){
      livesImageDOM.innerHTML = `${<img src="images/heart.png" alt="full"/>}`
    } */
/*     if (this.lives === 3){
      life3ImageDOM.src = 'images/heart.png'
      life2ImageDOM.src = 'images/heart.png'
      life1ImageDOM.src = 'images/heart.png'
    }
    else if (this.lives === 2.5){
      life3ImageDOM.src = 'images/half-hear.png'
      life2ImageDOM.src = 'images/heart.png'
      life1ImageDOM.src = 'images/heart.png'
    } else if (this.lives === 2) {
      life3ImageDOM.src = 'images/empty-heart.png'
      life2ImageDOM.src = 'images/heart.png'
      life1ImageDOM.src = 'images/heart.png'
    } else if (this.lives === 1.5) {
      life3ImageDOM.src = 'images/empty-heart.png'
      life2ImageDOM.src = 'images/half-hear.png'
      life1ImageDOM.src = 'images/heart.png'
    }else if (this.lives === 1) {
      life3ImageDOM.src = 'images/empty-heart.png'
      life2ImageDOM.src = 'images/empty-heart.png'
      life1ImageDOM.src = 'images/heart.png'
    } else if (this.lives === 0.5) {
      life3ImageDOM.src = 'images/empty-heart.png'
      life2ImageDOM.src = 'images/empty-heart.png'
      life1ImageDOM.src = 'images/half-hear.png'
    } */
  };

  hairTooLong = () => {
    if (
      this.canLoseLife === true &&
      (this.customer.beardCounter === this.customer.maxGrowLength ||
        this.customer.hairCounter === this.customer.maxGrowLength)
    ) {
      this.lives -= 0.5;
      this.canLoseLife = false;
      console.log(this.lives);
    }
  };

  gameOver = () => {
    // 1. Stop the game
    this.isGameOn = false;

    // 2. Hide canvas
    canvas.style.display = "none";

    // 3. Show game over screen
    gameOverScreenDOM.style.display = "flex";
  };

  gameLoop = () => {
    //* 1. Clear canvas
    this.clearCanvas();

    //* 2. Actions and movements of the elements
    //this.randomObjectSelector();
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
    this.livesCounter();
    this.hairTooLong();

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

    this.drawScore();

    //* 4. Recursion ( requestAnimationFrame )
    if (this.isGameOn === true) {
      requestAnimationFrame(this.gameLoop); // 60ps invokes gameloop()
    }
  };
}
