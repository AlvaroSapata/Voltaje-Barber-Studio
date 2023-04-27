class Trimmer {
  constructor(randomTrimmersPosition) {
    // ELEMENTS AND INITIAL VALUES OF THE TRIMMER
    this.img = new Image();
    if (isDarkMode === true) {
      this.img.src = "images/dark/trimmer.png";
    } else {
      this.img.src = "images/trimmer.png";
    }
    this.x = randomTrimmersPosition; // X position
    this.w = 60; // Width
    this.h = (5 / 5) * this.w; // Height referenced to width
    this.y = 0 - this.h; // Y position referenced to height
    this.canCollide = true; // Made to add the visual effect on collision
  }

  // METHODS OF THE TRIMMER

  draw = () => {
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
  };

  gravity = () => {
    if (this.y < canvas.height + this.h) {
      this.y += gravitySpeed;
    }
  };
}
