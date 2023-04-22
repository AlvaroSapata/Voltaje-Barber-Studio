class Customer {
  constructor() {
    // ELEMENTS AND INITIAL VALUES OF CUSTOMER
    this.img = new Image();
    this.img.src = "images/Face.png";
    this.x = 460; // X position
    this.y = 480; // Y position
    this.w = 80; // Width
    this.h = 100; // Height referenced to height
    this.movementSpeed = 30; // Movement speed of the customer

    // beard
    this.beardCounter = 0;

    this.imgBeard1 = new Image();
    this.imgBeard1.src = "images/beard1.png";
    this.xBeard1 = 470; // X position
    this.yBeard1 = 520; // Y position
    this.wBeard1 = 60; // Width
    this.hBeard1 = 60; // Height referenced to height

    this.imgBeard2 = new Image();
    this.imgBeard2.src = "images/beard2.png";
    this.xBeard2 = 470; // X position
    this.yBeard2 = 530; // Y position
    this.wBeard2 = 60; // Width
    this.hBeard2 = 60; // Height referenced to height

    this.imgBeard3 = new Image();
    this.imgBeard3.src = "images/beard3.png";
    this.xBeard3 = 465; // X position
    this.yBeard3 = 525; // Y position
    this.wBeard3 = 70; // Width
    this.hBeard3 = 70; // Height referenced to height

    this.imgBeard4 = new Image();
    this.imgBeard4.src = "images/beard4.png";
    this.xBeard4 = 460; // X position
    this.yBeard4 = 530; // Y position
    this.wBeard4 = 80; // Width
    this.hBeard4 = 70; // Height

    // Hair
    this.hairCounter = 0;

    this.imgHair1 = new Image();
    this.imgHair1.src = "images/hair1.png";
    this.xHair1 = 460; // X position
    this.yHair1 = 453; // Y position
    this.wHair1 = 87; // Width
    this.hHair1 = 90; // Height referenced to height

    this.imgHair2 = new Image();
    this.imgHair2.src = "images/hair2.png";
    this.xHair2 = 448; // X position
    this.yHair2 = 472; // Y position
    this.wHair2 = 110; // Width
    this.hHair2 = 90; // Height referenced to height

    this.imgHair3 = new Image();
    this.imgHair3.src = "images/hair3.png";
    this.xHair3 = 452; // X position
    this.yHair3 = 468; // Y position
    this.wHair3 = 95; // Width
    this.hHair3 = 90; // Height referenced to height

    this.imgHair4 = new Image();
    this.imgHair4.src = "images/hair4.png";
    this.xHair4 = 435; // X position
    this.yHair4 = 480; // Y position
    this.wHair4 = 130; // Width
    this.hHair4 = 130; // Height referenced to height
  }

  // METHODS OF CUSTOMER
  draw = () => {
    // Plain face
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);

    //ctx.drawImage(this.imgBeard1, this.xBeard1, this.yBeard1, this.wBeard1, this.hBeard1);
    //ctx.drawImage(this.imgBeard2, this.xBeard2, this.yBeard2, this.wBeard2, this.hBeard2);
    ctx.drawImage(this.imgBeard3, this.xBeard3, this.yBeard3, this.wBeard3, this.hBeard3);
    //ctx.drawImage(this.imgBeard4, this.xBeard4, this.yBeard4, this.wBeard4, this.hBeard4);

    //ctx.drawImage(this.imgHair1, this.xHair1, this.yHair1, this.wHair1, this.hHair1);
    //ctx.drawImage(this.imgHair2, this.xHair2, this.yHair2, this.wHair2, this.hHair2);
    ctx.drawImage(this.imgHair3, this.xHair3, this.yHair3, this.wHair3, this.hHair3);
    //ctx.drawImage(      this.imgHair4,      this.xHair4,      this.yHair4,      this.wHair4,      this.hHair4);
  };
  moveLeft = () => {
    if (this.x > 10) {
      this.x -= this.movementSpeed;
      this.xBeard1 -= this.movementSpeed;
      this.xBeard2 -= this.movementSpeed;
      this.xBeard3 -= this.movementSpeed;
      this.xBeard4 -= this.movementSpeed;
      this.xHair1 -= this.movementSpeed;
      this.xHair2 -= this.movementSpeed;
      this.xHair3 -= this.movementSpeed;
      this.xHair4 -= this.movementSpeed;
    }
  };
  moveRight = () => {
    if (this.x < canvas.width - 100) {
      this.x += this.movementSpeed;
      this.xBeard1 += this.movementSpeed;
      this.xBeard2 += this.movementSpeed;
      this.xBeard3 += this.movementSpeed;
      this.xBeard4 += this.movementSpeed;
      this.xHair1 += this.movementSpeed;
      this.xHair2 += this.movementSpeed;
      this.xHair3 += this.movementSpeed;
      this.xHair4 += this.movementSpeed;
    }
  };

  growBeard = () => {
    // each second grows
    setInterval(() => {
      if (this.beardCounter === 1) {
        ctx.drawImage(
          this.imgBeard2,
          this.xBeard2,
          this.yBeard2,
          this.wBeard2,
          this.hBeard2
        );

        draw = () => {
          ctx.drawImage(
            this.imgBeard1,
            this.xBeard1,
            this.yBeard1,
            this.wBeard1,
            this.hBeard1
          );
        };
      } else if (this.beardCounter === 2) {
        ctx.drawImage(
          this.imgBeard3,
          this.xBeard3,
          this.yBeard3,
          this.wBeard3,
          this.hBeard3
        );
      } else if (this.beardCounter === 3) {
        ctx.drawImage(
          this.imgBeard4,
          this.xBeard4,
          this.yBeard4,
          this.wBeard4,
          this.hBeard4
        );
      } else {
        ctx.drawImage(
          this.imgBeard1,
          this.xBeard1,
          this.yBeard1,
          this.wBeard1,
          this.hBeard1
        );
      }
      this.beardCounter++;
      console.log(this.beardCounter)

      //todo: si esta mas de X que empiece a quitar vidas
    }, 1000);
  };

  shaveBeard = () => {
    if (this.beardCounter > 0) {
      this.beardCounter -= 1;
      console.log(this.beardCounter);
    }
  };
}
