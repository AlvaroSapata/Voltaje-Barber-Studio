class Customer {
  constructor() {
    // ELEMENTS AND INITIAL VALUES OF CUSTOMER
    this.img = new Image();
    this.img.src = "images/Face.png";
    this.x = 460; // X position
    this.y = 480; // Y position
    this.w = 80; // Width
    this.h = 100; // Height referenced to height
    this.movementSpeed = 10; // Movement speed of the customer

    // beard
    this.BeardCounter = 0;

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
  }

  // METHODS OF CUSTOMER
  draw = () => {
    // Plain face
    ctx.drawImage(this.img, this.x, this.y, this.w, this.h);


  };
  moveLeft = () => {
    if (this.x > 10) {
      this.x -= this.movementSpeed;
      this.xBeard1 -= this.movementSpeed;
      this.xBeard2 -= this.movementSpeed;
      this.xBeard3 -= this.movementSpeed;
      this.xBeard4 -= this.movementSpeed;
    }
  };
  moveRight = () => {
    if (this.x < canvas.width - 100) {
      this.x += this.movementSpeed;
      this.xBeard1 += this.movementSpeed;
      this.xBeard2 += this.movementSpeed;
      this.xBeard3 += this.movementSpeed;
      this.xBeard4 += this.movementSpeed;
    }
  };

  growBeard = () => {
    // each second grows
    setInterval(() => {
        if ( this.BeardCounter === 1 ) {
            ctx.drawImage(this.imgBeard2, this.xBeard2, this.yBeard2, this.wBeard2, this.hBeard2);
        } else if ( this.BeardCounter === 2 ) {
            ctx.drawImage(this.imgBeard3, this.xBeard3, this.yBeard3, this.wBeard3, this.hBeard3);
        } else if ( this.BeardCounter === 3 ){
            ctx.drawImage(this.imgBeard4, this.xBeard4, this.yBeard4, this.wBeard4, this.hBeard4);
        } else {
            ctx.drawImage(this.imgBeard1, this.xBeard1, this.yBeard1, this.wBeard1, this.hBeard1);
        }
        this.BeardCounter++

        //todo: si esta mas de X que empiece a quitar vidas
    }, 1000);

    }

    
  };
