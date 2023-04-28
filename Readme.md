# Voltaje Barber Studio

## [Play the Game!](https://alvarosapata.github.io/Voltaje-Barber-Studio/)

![Game Logo](www.your-image-logo-here.com)


# Description

Welcome to Voltaje Barber Studio game, where your goal is to collect various objects that fall randomly from the top of the screen. These items are crucial for keeping your beard and hair trimmed, as failure to do so will result in the loss of lives. In addition to collecting items, you must also avoid bombs to stay alive and try to achieve the highest score possible as the difficulty of the game increases.


# Main Functionalities

- Customer moves left and right by pressing the corresponding keyboard arrows.
- Various objets fall randomly from the top of the screen.
- Your beard and hair will grow each second up to a point where you will lose lives.
- Collect Scissors to cut your hair and Razors to trim your Beard as well as to increase your score.
- Avoid Bombs as they will make you lose lives.
- Collect trimmers (they wont spawn that often) to became immune to Bombs and gain a score multiplier for a short time.
- The score is calculated based on the amount of Scissors and Razors collected.
- Highscores are tracked locally.
- Game can be paused by clicking the Play/Pause Button
- Difficulty can be changed manually up to 5 levels
- Difficulty can be changed automatically clicking the Auto-Difficulty button, which will make the game faster depending of your score
- Game theme can be toggle between Light Mode and Dark Mode pressing the Toggle Button

# Backlog Functionalities

- Making the Game responsive.
- Adding touchstart and touchend funcionallities so it can be played on mobile devices.
- Adding animations for transitions between screens.
- Adding a selectable character.

# Technologies used

- HTML
- CSS
- JavaScript
- DOM Manipulation
- JS Canvas
- JS Classes
- Local Storage
- JS Audio() and JS Image()

# States

- Start Screen
- Game Screen
- Game Over Screen

# Proyect Structure

- List here sections for your your different JS files.
- One for main.js to manage DOM elements, one for the Game class and one for each other class file of your game.
- Inside each file you can list the functions, clases, properties and methods of your code.

Example:

## main.js

- goToInstructions
- startGame
- restartGame
- toggleTheme

## Game.js

- Game ()
     - this.background;
     - this.customer;
     - this.scissorsArray;
     - this.razorArray;
     - this.bombArray;
     - this.trimmerArray;
     - this.score;
     - this.hairScore;
     - this.beardScore;
     - this.lives;
     - this.scissorsCounter;
     - this.razorsCounter;
     - this.randomLimit;
     - this.canLoseLife;
     - this.canLoseLifeHair;
     - this.canLoseLifeBeard;
     - this.canSpawnTrimmer;
     - this.isImmune;
  
- drawBackground;
- clearCanvas
- spawnScissors
- spawnRazors
- spawnBombs
- spawnTrimmers
- checkColisionCustomerScissor
- checkColisionCustomerRazor
- checkColisionCustomerBomb
- checkColisionCustomerTrimmer
- removeScissors
- removeRazors
- removeBombs
- removeTrimmers
- livesCounter
- canLoseLifeChecker
- hairTooLong
- autoIncreaseDifficulty
- updateHighScore
- gameOver
- gameLoop   
   


## Customer.js 

- Customer () {
    - this.img;
    - this.x;
    - this.y;
    - this.w;
    - this.h;
    - this.growSpeed;
    - this.maxGrowLength;
    - this.movementSpeed;
    - this.movementSpeedFlow;
    - this.isMovingLeft;
    - this.canMoveLeft;
    - this.isMovingRight;
    - this.beardCounter;
    - this.imgBeard1;
    - this.xBeard1;
    - this.yBeard1;
    - this.wBeard1;
    - this.hBeard1;
    - this.imgBeard2;
    - this.xBeard2;
    - this.yBeard2;
    - this.wBeard2;
    - this.hBeard2;
    - this.imgBeard3;
    - this.xBeard3;
    - this.yBeard3;
    - this.wBeard3;
    - this.hBeard3;
    - this.imgBeard4;
    - this.xBeard4;
    - this.yBeard4;
    - this.wBeard4;
    - this.hBeard4;
    - this.hairCounter;
    - this.imgHair1;
    - this.xHair1;
    - this.yHair1;
    - this.wHair1;
    - this.hHair1;
    - this.imgHair2;
    - this.xHair2;
    - this.yHair2;
    - this.wHair2;
    - this.hHair2;
    - this.imgHair3;
    - this.xHair3;
    - this.yHair3;
    - this.wHair3;
    - this.hHair3;
    - this.imgHair4;
    - this.xHair4;
    - this.yHair4;
    - this.wHair4;
    - this.hHair4;
}
- draw () 
- moveLeft () 
- moveRight ()
- moveLeftFlow () 
- moveLeftFlow2 () 
- moveRightFlow () 
- moveRightFlow2 () 
- growBeard () 
- growHair () 
- shaveBeard ()
- cutHair ()

## Scissor.js 
- Scissor () {
    - this.img;
    - this.x;
    - this.y;
    - this.w;
    - this.h;
    - this.canCollide
}
- draw ()
- gravity ()

## Razor.js 
- Razor () {
    - this.img;
    - this.x;
    - this.y;
    - this.w;
    - this.h;
    - this.canCollide
}
- draw ()
- gravity ()

## Bomb.js 
- Bomb () {
    - this.img;
    - this.x;
    - this.y;
    - this.w;
    - this.h;
    - this.canCollide
}
- draw ()
- gravity ()

## Trimmer.js 
- Trimmer () {
    - this.img;
    - this.x;
    - this.y;
    - this.w;
    - this.h;
    - this.canCollide
}
- draw ()
- gravity ()

# Extra Links 

### Slides
[Link](https://onedrive.live.com/edit.aspx?resid=ED4CE5E87C66A465!164&ithint=file%2cpptx&ct=1682673341374&wdOrigin=OFFICECOM-WEB.START.EDGEWORTH&wdPreviousSessionSrc=HarmonyWeb&wdPreviousSession=76cb13f8-2097-4374-91cf-b342825bee7c)

## Deploy
[Link](https://alvarosapata.github.io/Voltaje-Barber-Studio/)
