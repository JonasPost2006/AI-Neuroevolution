class Car {
  constructor(carX, carY, width, height){
      this.x = carX;
      this.y = carY;
      this.width = width;
      this.height = height;
      this.position = createVector(carX, carY);

      this.speedX = 0;
      this.speedY = 0;
      this.speed = 0;
      this.acceleration = 0.1;
      this.maxSpeed = 5;
      this.friction = 0.05;
      this.angle = -PI/2;
      this.direction = p5.Vector.fromAngle(radians(this.angle) - PI / 2);
      
      

      this.rays = [];
      
      this.hit = true;

      this.fov = 100;
      this.heading = 0;
      for(let a = 0; a < 180; a += 10){
        this.rays.push(new Ray(this.position, radians(a - 90)));
      }
      this.rayCount = this.rays.length;

      this.brain = new NeuralNetwork(this.rayCount, ceil((this.rayCount + 2) / 2), 2); //inputs - hidden layer - output: voor, achter, links, rechts - misschien eerst 2 voor alleen links rechts, later snelheid bepalen
  }

  update(){
    this.#move();
    // this.getRayLenghths();
    this.carUp();
    const rayLengths = this.getRayLenghths(walls);
    this.think(rayLengths);
    
  }

  draw(){
    fill(this.collided ? 255 : 255, 0, 0);
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    fill(255);
    pop();
    // car.think();

  }

  turn(angle) {
    this.angle += angle;
  
    for (let i = 0; i < this.rays.length; i++) {
      const ray = this.rays[i];
      const rayAngle = radians(i * 10 - 90) + this.angle + PI / 2;
      ray.setAngle(rayAngle);
    }
  }
  
  // rotate(angle){
  //   this.heading += angle;
  //   let index = 0;
  //   for(index < 0; i < this.rayCount; i += 1){
  //     this.rays[index].setAngle(radians(a) + this.heading);
  //     index++;
  //   }
  // }


    // updateRayCount(rayCount){
    //   this.rayCount = this.rays.length;
    // }
  think(rayLengths){
    // let inputs = [1.0, 0.5, 0.2, 0.3];
    let inputs = [];
    for(const record of rayLengths){
      inputs.push(record / this.width);

    }
    // console.log(inputs);

    let output = this.brain.predict(inputs);
    console.log(output);
    const left = output[0] > 0.5;
    const right = output[1] > 0.5;

    if(left){
      this.carLeft();
      console.log("left");
    }
    if(right){              //> 0.5?
      this.carRight();
      console.log("right");
    }
  }

  getRayLenghths(walls){
    let rayLengths = [];
    for(const i in this.rays) {
      const ray = this.rays[i];
      let closest = null;
      let record = Infinity;

      for(const wall of walls) {
        const point = ray.cast(wall);
        if (point) {
          let distance = p5.Vector.dist(this.position, point);
          const angle = ray.direction.heading() - this.direction.heading();       //const angle = ray.direction.heading() - this.heading;
          distance *= abs(cos(angle));

          if (distance < record) {
            record = distance;
            closest = point;
          }
        }
      }

      // if(closest){
      //   stroke(255, 100);
      //   line(this.position.x, this.position.y, closest.x, closest.y);
      // }
      rayLengths[i] = record;
      this.drawRays(closest);
      this.drawRayLengths(closest, record);
    }
    // console.log("Intersecting points: ", closest);
    return rayLengths;

}

  drawRays(closest){
    push();
    stroke(255, 100);
    if(closest){
      line(this.position.x, this.position.y, closest.x, closest.y);
    }
    else{
      console.log("ERROR")
    }
    // line(this.position.x, this.position.y, closest.x, closest.y);
    pop();
  }

  drawRayLengths(closest, record){
    push();
    fill(255);
    strokeWeight(0);
    if(closest){
      text(Math.trunc(record), (this.position.x + closest.x) / 2, (this.position.y + closest.y) / 2);
    }
    else{
      console.log("ERROR LENGTHS")
    }
    // text(Math.trunc(record), (this.position.x + closest.x) / 2, (this.position.y + closest.y) / 2);
    pop();
  }












  carUp(){
    this.speed += this.acceleration;
  }
  carDown(){
    this.speed -= this.acceleration;
  }
  carLeft(){
    this.setHeading(-0.1);
    this.turn(-0.05);
  }
  carRight(){
    this.setHeading(0.05);
    this.turn(0.1);
  }
  
  #move(){
    // if(keyIsDown(UP_ARROW)){
    //   this.carUp();
    // }
    // if(keyIsDown(DOWN_ARROW)){
    //   this.carDown();
    // }
    // if(keyIsDown(LEFT_ARROW)){
    //   this.carLeft();
    // }
    // if(keyIsDown(RIGHT_ARROW)){
    //   this.carRight();
    // }
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
  
  

  show(){
    for(let ray of this.rays){
      ray.show();
    }
  }
}
