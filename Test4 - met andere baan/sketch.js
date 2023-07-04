const TOTAL = 50;
let walls = [];
let carX = 100;
let carY = 100;
let width = 15;
let height = 30;
let mutationPer = 0.08;
let savedCars = [];
let cars = [];
let startTime = 0;
let currentTime = 0;
let longestTime = 0;


const mousePosText = document.getElementById('mouse-pos');
let mousePos = { x: undefined, y: undefined };

window.addEventListener('mousemove', (event) => {
  mousePos = { x: event.clientX, y: event.clientY };
  mousePosText.textContent = `(${mousePos.x - 7}, ${mousePos.y - 275})`;
});

// function setup(){
//     createCanvas(1200, 800);
//     car = new Car(carX, carY, width, height);
//     // createCircuit(circuit);
// }

function setup(){
  createCanvas(1200, 800);
  for(let i = 0; i < TOTAL; i++){
    cars[i] = new Car(carX, carY, width, height);
  }
  startTime = millis();
  createWalls();
}

function draw(){
  background(220)
  for(let wall of walls){     //Laat de muren zien
      wall.show();
      for(let i = cars.length -1; i >= 0; i--){
        let car = cars[i];
        let hit = collideLineRect(
          wall.a.x, 
          wall.a.y, 
          wall.b.x, 
          wall.b.y, 
          car.position.x, 
          car.position.y, 
          car.width, 
          car.height);
        // let hit = collideLineCircle(wall.a.x, wall.a.y, wall.b.x, wall.b.y, car.centerX, car.centerY, car.diameter);
        if(hit){
          if(!wall.checkpoint){
            // console.log('Collision: ', hit);
            savedCars.push(cars.splice(i, 1)[0]);
          }if(wall.checkpoint){
            car.increaseScore();
            car.updateCheckpointTime();
            // break;
          }
        }
        const elapsedTime = car.getTimeSinceLastCheckpoint();
        if(elapsedTime > 8000){
          savedCars.push(cars.splice(i, 1)[0]);
        }
      }
  }  
  for(let car of cars){
    car.update();
    car.draw();
  }



  const currentTime = millis() - startTime;

  const minutes = Math.floor(currentTime / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('runningTime').textContent = timeString;

  if(currentTime > longestTime){
    longestTime = currentTime;
  }

  if(cars.length === 0){
    //reset timer
    startTime = millis();
    //display longestTime
    const longestMinutes = Math.floor(longestTime / 60000);
    const longestSeconds = Math.floor((longestTime % 60000) / 1000);
    document.getElementById('longestTime').textContent = `${longestMinutes}:${longestSeconds.toString().padStart(2, '0')}`;

    nextGeneration();
  }
  // for(let i = 0; i < circuitInside.length - 1; i++){
  //   const p1 = circuitInside[i];
  //   const p2 = circuitInside[i + 1];
  //   let hit = collideLineRect(p1.x, p1.y, p2.x, p2.y, car.x, car.y, car.width, car.height);
  //   if(hit){
  //     console.log('Collision: ', hit);
  //   }
  // }
  // for(let i = 0; i < circuitOutside.length - 1; i++){
  //   const p1 = circuitOutside[i];
  //   const p2 = circuitOutside[i + 1];
  //   let hit = collideLineRect(p1.x, p1.y, p2.x, p2.y, car.x, car.y, car.width, car.height);
  //   if(hit){
  //     console.log('Collision: ', hit);
  //   }
  // }
  // createCircuit(circuitInside);
  // createCircuit(circuitOutside);
  

}

function createWalls(){
  walls.push(new Boundary(164, 175, 37, 175, false));
  walls.push(new Boundary(623, 47, 323, 37, false));
  walls.push(new Boundary(323, 37, 173, 62, false));
  walls.push(new Boundary(173, 62, 65, 99, false));
  walls.push(new Boundary(65, 99, 34, 173, false));
  walls.push(new Boundary(34, 173, 22, 317, false));
  walls.push(new Boundary(22, 317, 29, 408, false));
  walls.push(new Boundary(29, 408, 70, 580, false));
  walls.push(new Boundary(70, 580, 120, 700, false));
  walls.push(new Boundary(120, 700, 181, 739, false));
  walls.push(new Boundary(181, 739, 426, 751, false));
  walls.push(new Boundary(426, 751, 610, 754, false));
  walls.push(new Boundary(610, 754, 800, 755, false));
  walls.push(new Boundary(800, 755, 959, 755, false));
  walls.push(new Boundary(959, 755, 1110, 654, false));
  walls.push(new Boundary(1110, 654, 1160, 596, false));
  walls.push(new Boundary(1160, 596, 1180, 454, false));
  walls.push(new Boundary(1180, 454, 1160, 346, false));
  walls.push(new Boundary(1160, 346, 1100, 297, false));
  walls.push(new Boundary(1100, 297, 950, 280, false));
  walls.push(new Boundary(950, 280, 748, 380, false));
  walls.push(new Boundary(748, 380, 591, 428, false));
  walls.push(new Boundary(591, 428, 591, 421, false));
  walls.push(new Boundary(591, 421, 649, 390, false));
  walls.push(new Boundary(649, 390, 739, 350, false));
  walls.push(new Boundary(739, 350, 795, 320, false));
  walls.push(new Boundary(795, 320, 920, 242, false));
  walls.push(new Boundary(920, 242, 950, 180, false));
  walls.push(new Boundary(950, 180, 955, 155, false));
  walls.push(new Boundary(955, 155, 956, 101, false));
  walls.push(new Boundary(956, 101, 916, 47, false));
  walls.push(new Boundary(916, 47, 858, 26, false));
  walls.push(new Boundary(858, 26, 623, 47, false));
  walls.push(new Boundary(623, 137, 323, 137, false));
  walls.push(new Boundary(323, 137, 183, 162, false));
  walls.push(new Boundary(183, 162, 155, 179, false));
  walls.push(new Boundary(155, 179, 120, 250, false));
  walls.push(new Boundary(120, 250, 105, 350, false));
  walls.push(new Boundary(105, 350, 160, 575, false));
  walls.push(new Boundary(160, 575, 220, 655, false));
  walls.push(new Boundary(220, 655, 314, 665, false));
  walls.push(new Boundary(314, 665, 932, 655, false));
  walls.push(new Boundary(932, 655, 1050, 587, false));
  walls.push(new Boundary(1050, 587, 1081, 476, false));
  walls.push(new Boundary(1081, 476, 1066, 379, false));
  walls.push(new Boundary(1066, 379, 981, 370, false));
  walls.push(new Boundary(981, 370, 792, 450, false));
  walls.push(new Boundary(792, 450, 675, 512, false));
  walls.push(new Boundary(675, 512, 509, 529, false));
  walls.push(new Boundary(509, 529, 411, 497, false));
  walls.push(new Boundary(411, 497, 411, 422, false));
  walls.push(new Boundary(411, 422, 462, 380, false));
  walls.push(new Boundary(462, 380, 576, 308, false));
  walls.push(new Boundary(576, 308, 663, 260, false));
  walls.push(new Boundary(663, 260, 730, 226, false));
  walls.push(new Boundary(730, 226, 781, 196, false));
  walls.push(new Boundary(781, 196, 844, 161, false));
  walls.push(new Boundary(844, 161, 845, 145, false));
  walls.push(new Boundary(845, 145, 623, 137, false));
    
    // walls.push(new Boundary(180, 180, 180, 50, true)); //Checkpoints
    walls.push(new Boundary(250, 150, 250, 50, true));
    walls.push(new Boundary(565, 137, 565, 50, true));
    walls.push(new Boundary(847, 146, 938, 75, true));
    walls.push(new Boundary(845, 158, 949, 177, true));
    walls.push(new Boundary(792, 190, 876, 271, true));
    walls.push(new Boundary(578, 310, 648, 390, true));
    walls.push(new Boundary(592, 426, 509, 526, true));
    // walls.push(new Boundary(970, 530, 1100, 530, true));
    // walls.push(new Boundary(960, 560, 1040, 700, true));
    // walls.push(new Boundary(950, 570, 950, 700, true));
    // walls.push(new Boundary(880, 570, 880, 700, true));
    // walls.push(new Boundary(722, 570, 722, 700, true));
    // walls.push(new Boundary(565, 570, 565, 700, true));
    // walls.push(new Boundary(407, 570, 407, 700, true));
    // walls.push(new Boundary(250, 570, 250, 700, true));
    // walls.push(new Boundary(200, 570, 200, 700, true));
    // walls.push(new Boundary(189, 555, 50, 670, true));
    // walls.push(new Boundary(50, 530, 180, 530, true));
    // walls.push(new Boundary(50, 360, 180, 360, true));
    // // walls.push(new Boundary(50, 270, 180, 270, true));
    // walls.push(new Boundary(50, 200, 180, 200, true));
    
}

function createCheckpoints(){
  //misschien oplossing dat rays niet colliden met checkpointsz
}