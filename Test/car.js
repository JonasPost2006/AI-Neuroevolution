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
        this.maxSpeed = 5;
        this.friction = 0.05;
        this.angle = 0;
        // this.colour = (255, 0, 0);

    }

    draw(){
        fill(255, 0, 0);
        push();
        translate(this.x, this.y);
        rotate(this.angle);
        rect(0, 0, this.height, this.width);
        pop();
        
    }

    update(){
      this.#move();
    }
    
    #move(){
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
      if(keyIsDown(LEFT_ARROW)){
        this.setHeading(-0.1);
      }
      if(keyIsDown(RIGHT_ARROW)){
        this.setHeading(0.1);
      }
      this.x += this.speed * cos(this.angle);
      this.y += this.speed * sin(this.angle);
    }

    setSpeed(speedX, speedY){
        this.speedY = speedY;
    }

    setHeading(angle){
      let speed = this.speed / this.maxSpeed;
      this.angle += angle * speed;
    }


}
  