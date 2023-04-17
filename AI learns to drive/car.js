class Car {
    constructor(carX, carY, width, height){
        this.x = carX;
        this.y = carY;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;
        this.speed = 0;
        this.acceleration = 0.1;
        this.maxSpeed = 10;
        this.friction = 0.05;

    }

    draw(){
        // ctx.beginPath();
        // ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height); //auto rechthoek
        // ctx.fill();
        fill(0);
        rect(this.x, this.y, this.width, this.height);
        console.log(this.speed);
        
    }
    
    // move() {
    //     if (keyIsDown(UP_ARROW)) {
    //       if(this.speedY <= this.maxSpeed){
    //         this.y -= this.speedY;
    //         this.speedY += this.acceleration;
    //       }else if(this.speedY >= 3){
    //         this.y -= this.speedY;
    //       }
    //     } else if (keyIsDown(DOWN_ARROW)) {
    //       if(this.speedY <= this.maxSpeed / 2){
    //         this.y += this.speedY;
    //         this.speedY += this.acceleration;
    //       }else if(this.speedY >= 3){
    //         this.y += this.speedY;
    //       }
    //     } else if (keyIsDown(RIGHT_ARROW)) {
    //       this.x += 1; // Move right by increasing x position
    //     } else if (keyIsDown(LEFT_ARROW)) {
    //       this.x -= 1; // Move left by decreasing x position
    //     }
    //   }

    move(){
      if(keyIsDown(UP_ARROW)){
        this.speed += this.acceleration;
      }
      if(keyIsDown(DOWN_ARROW)){
        this.speed -= this.acceleration;
      }
      if(this.speed > this.maxSpeed){
        this.speed = this.maxSpeed;
      }
      if(this.speed < -this.maxSpeed / 2){
        this.speed = -this.maxSpeed / 2;
      }
      if(this.speed > 0){
        this.speed -= this.friction;
      }
      if(this.speed < 0){
        this.speed += this.friction;
      }
      if(Math.abs(this.speed) < this.friction){     //Hierdoor wordt speed 0 als geen toets ingedrukt is, anders is speed ~ friction
        this.speed = 0;
      }
      this.y -= this.speed;
    }

    setSpeed(speedX, speedY){
        this.speedX = speedX;
        this.speedY = speedY;
    }


}
  