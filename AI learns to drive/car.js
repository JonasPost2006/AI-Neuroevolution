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
      this.angle = -  PI/2;
      this.direction = p5.Vector.fromAngle(radians(this.angle) - PI / 2);

      this.diameter = Math.min(this.width, this.height);    

      this.rays = [5, 4, 2];
      this.rayCount = this.rays.length;

      // this.brain = new NeuralNetwork(4, 3, 4); //inputs - hidden layer - output: voor, achter, links, rechts
    }

  draw(){
      fill(255, 0, 0);
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      // rotate(this.direction.heading() + PI / 2);
      rectMode(CENTER);
      rect(0, 0, this.width, this.height);
      fill(255);
      let centerX = this.width / 2;
      let centerY = this.height / 2;
      // circle(centerX, centerY, this.diameter);
      // for(let wall of walls){
      //   let hit = collideLineCircle(wall.a.x, wall.a.y, wall.b.x, wall.b.y, this.x + centerX, this.y + centerY, this.diameter);
      //   if(hit){
      //     console.log('Collision: ', hit);
      //   }
      // }
      pop();

      // car.think();

      this.updateRayCount();
  }

  // think(){

  //   let inputs = [1.0, 0.5, 0.2, 0.3];
  //   let outputs = this.brain.predict(inputs);
  //   if(outputs > 0.5){
  //     this.carUp();
  //   }
  // }

  update(){
    this.#move();
    // const rayLengths = this.getRayLengths(this, walls);
  }

  updateRayCount(rayCount){
    this.rayCount = this.rays.length;
  }

  carUp(){
    this.speed += this.acceleration;
  }
  carDown(){
    this.speed -= this.acceleration;
  }
  carLeft(){
    this.setHeading(-0.1);
  }
  carRight(){
    this.setHeading(0.1);
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
    this.x += this.speed * cos(this.angle + HALF_PI);
    this.y += this.speed * sin(this.angle + HALF_PI);
  }

  setSpeed(speedX, speedY){
    this.speedX = speedX;    //speedX wordt nog niet gebruikt!!
    this.speedY = speedY;
  }

  setHeading(angle){
    let speed = this.speed / this.maxSpeed;
    this.angle += angle * speed;
  }

//   getRayLengths(car, walls){
//     let rayLengths = [];
//     for(const i in this.rays){
//       const ray = this.rays[i];
//       let closest = null;
//       let record = Infinity;
//       for(let wall of walls){
//         const point = ray.cast(car, wall);
//         if(point){
//           let distance = p5.Vector.dist(this.position, point);
//           const rayAngle = ray.direction.heading() - this.direction.heading();
//           distance *= abs(cos(rayAngle));

//           if(distance < record){
//             record = distance;
//             closest = point;
//           }
//         }
//       }
//       rayLengths[i] = record;
//       if(closest){
//         this.drawRays(closest);
//         this.drawRayLengths(closest, record);
//       }
//     }
//     return rayLengths;
//   }

//   drawRays(closest) {
//     push();
//     stroke(255, 127);
//     line(this.position.x, this.position.y, closest.x, closest.y);
//     pop();
//   }


//   drawRayLengths(closest, record) {
//     push();
//     fill(255);
//     strokeWeight(0);
//     text(Math.trunc(record), (this.position.x + closest.x) / 2, (this.position.y + closest.y) / 2);
//     pop();
//   }

}
