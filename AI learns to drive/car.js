class Car {
    constructor(carX, carY, width, height){
        this.x = carX;
        this.y = carY;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;

        // this.controls = new Controls();
    }

    draw(){
        // ctx.beginPath();
        // ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height); //auto rechthoek
        // ctx.fill();
        fill(0);
        rect(this.x, this.y, this.width, this.height);
        
    }
    
    move() {
        if (keyIsDown(UP_ARROW)) {
          this.y -= 1; // Move up by decreasing y position
        } else if (keyIsDown(DOWN_ARROW)) {
          this.y += 1; // Move down by increasing y position
        } else if (keyIsDown(RIGHT_ARROW)) {
          this.x += 1; // Move right by increasing x position
        } else if (keyIsDown(LEFT_ARROW)) {
          this.x -= 1; // Move left by decreasing x position
        }
      }

    setSpeed(speedX, speedY){
        this.speedX = speedX;
        this.speedY = speedY;
    }


}
  