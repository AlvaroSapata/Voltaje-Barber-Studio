class Bomb {
  constructor(randomBombsPosition) {
    // ELEMENTS AND INITIAL VALUES OF THE BOMB
    this.img = new Image();
    this.img.src = "images/bomba.png";
    this.x = randomBombsPosition; // X position
    this.w = 60; // Width
    this.h = (5 / 5) * this.w; // Height referenced to width
    this.y = 0 - this.h; // Y position referenced to height
  }

  // METHODS OF THE BOMB

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  gravity = () => {
    if (this.y < canvas.height + this.h) {
      this.y += gravitySpeed;
    }
  };
}
