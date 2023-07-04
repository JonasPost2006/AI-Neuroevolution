class Car {
  constructor(carX, carY, width, height, brain){
      this.x = carX;
      this.y = carY;
      this.width = width;
      this.height = height;
      this.position = createVector(carX, carY);
      this.walls = walls;

      this.speedX = 0;
      this.speedY = 0;
      this.speed = 0;
      this.acceleration = 0.1;
      this.maxSpeed = 5;
      this.friction = 0.05;
      this.angle = -PI/2;
      this.direction = p5.Vector.fromAngle(radians(this.angle) - PI / 2); //Zorgt dat rays de goede kant gericht zijn


      this.rays = [];
      this.fov = 100;
      this.heading = 0;
      for(let a = 0; a < 180; a += 10){
        this.rays.push(new Ray(this.position, radians(a - 90)));
      }
      this.rayCount = this.rays.length;

      this.lastCheckpointTime = millis();
      this.score = 0;
      this.fitness = 0;
      if(brain){
        this.brain = brain.copy();  //Als er al een brein is moet hij gekopiëerd worden
      } else{
        this.brain = new NeuralNetwork(this.rayCount, ceil((this.rayCount + 2) / 2), 2); //inputs - hidden layer - output: voor, achter, links, rechts - misschien eerst 2 voor alleen links rechts, later snelheid bepalen
      }
      
  }

  update(){
    this.#move();
    this.carUp();
    const rayLengths = this.getRayLenghths(walls);
    this.think(rayLengths);
    
  }

  draw(){
    fill(255, 0, 0);
    push();
    stroke(0);
    strokeWeight(1);
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    fill(255);
    pop();
  }

  turn(angle) {
    this.angle += angle;
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      const rayAngle = radians(i * 10 - 90) + this.angle + PI / 2;
      ray.setAngle(rayAngle);
    }
  }

  think(rayLengths){
    let inputs = [];
    for(const record of rayLengths){
      inputs.push(record / this.width);

    }
    let output = this.brain.predict(inputs);
    const left = output[0];
    const right = output[1];

    if(left > 0.5){
      this.carLeft();
    }
    if(right > 0.5){             
      this.carRight();
    }
  }

  getRayLenghths(walls){
    let rayLengths = [];
    for(const i in this.rays) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;

      for(const wall of walls) {
        if(!wall.checkpoint){  
          const point = ray.cast(wall);
          if (point) {
            let distance = p5.Vector.dist(this.position, point);
            const angle = ray.direction.heading() - this.direction.heading();
            distance *= abs(cos(angle));

            if (distance < record) {
              record = distance;
              closest = point;
            }
          }
        }
      }
      rayLengths[i] = record;
      this.drawRays(closest);
      this.drawRayLengths(closest, record);
    }
    return rayLengths;

}

  drawRays(closest){
    push();
    stroke(255, 100);
    if(closest){
      line(this.position.x, this.position.y, closest.x, closest.y);
    }
    pop();
  }

  drawRayLengths(closest, record){
    push();
    fill(255);
    strokeWeight(0);
    if(closest){
      text(Math.trunc(record), (this.position.x + closest.x) / 2, (this.position.y + closest.y) / 2);
    }
    pop();
  }

  mutate(){
    this.brain.mutate(mutationPer); //muteer 10% van weights
  }

  carUp(){
    this.speed += this.acceleration;
  }
  carDown(){
    this.speed -= this.acceleration;
  }
  carLeft(){
    this.setHeading(-0.15);
    this.turn(-0.15);
  }
  carRight(){
    this.setHeading(0.15);
    this.turn(0.15);
  }
  
  #move(){
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
    this.position.x += this.speed * cos(this.angle + HALF_PI);
    this.position.y += this.speed * sin(this.angle + HALF_PI);
  }

  setSpeed(speedX, speedY){
    this.speedX = speedX;    //speedX wordt nog niet gebruikt!!
    this.speedY = speedY;
  }

  setHeading(angle){
    let speed = this.speed / this.maxSpeed;
    this.angle += angle * speed;
  }
  
  
  increaseScore(){
    this.score += 10;
    // console.log(this.score);
  }

  updateCheckpointTime(){
    this.lastCheckpointTime = millis();
  }

  getTimeSinceLastCheckpoint(){
    return millis() - this.lastCheckpointTime;
  }

  show(){
    for(let ray of this.rays){
      ray.show();
    }
  }
}
