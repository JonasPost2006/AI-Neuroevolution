const TOTAL = 50;
let walls = [];
let carX = 100;
let carY = 100;
let width = 15;
let height = 30;
let mutationPer = 0.08;
let savedCars = [];
let cars = [];
let bestScore = 0;
let highScore = 0;
let startTime = 0;
let longestTime = 0;
let generation = 1;


const mousePosText = document.getElementById('mouse-pos');
let mousePos = { x: undefined, y: undefined };

window.addEventListener('mousemove', (event) => {
  mousePos = { x: event.clientX, y: event.clientY };
  mousePosText.textContent = `(${mousePos.x}, ${mousePos.y - 200})`;
});

function setup(){
  createCanvas(1200, 800);
  for(let i = 0; i < TOTAL; i++){
    cars[i] = new Car(carX, carY, width, height);
  }
  startTime = millis(); //Start de timer
  createWalls();
}

function draw(){
  background(220)
  for(let wall of walls){     //Laat de muren zien
      wall.show();
      for(let i = cars.length -1; i >= 0; i--){
        let car = cars[i];
        let hit = collideLineRect(  //Geeft true als de muur hit met de auto op positie x, y en width height
          wall.a.x, 
          wall.a.y, 
          wall.b.x, 
          wall.b.y, 
          car.position.x, 
          car.position.y, 
          car.width, 
          car.height);
        if(hit){
          if(!wall.checkpoint){
            // console.log('Collision: ', hit);
            savedCars.push(cars.splice(i, 1)[0]); //Als auto een muur heeft geraakt die geen checkpoint is, moet hij uit de lijst van cars en in de lijst savedCars
          }if(wall.checkpoint){
            car.increaseScore();          //Als checkpoint moet de score omhoog en checkpointtimer gereset zodat hij niet zomaar dood gaat
            car.updateCheckpointTime();
          }
        }
        const elapsedTime = car.getTimeSinceLastCheckpoint();
        if(elapsedTime > 8000){ //Als tijd sinds de laatste checkpoint > 8sec. is, rijdt de auto waarschijnlijk rondjes. Om dit te voorkomen en naar de volgende gen. te gaan moet hij dood.
          savedCars.push(cars.splice(i, 1)[0]);
        }
      }
  }  
  for(let car of cars){
    car.update();
    car.draw();
  }

  //Timer
  const currentTime = millis() - startTime;
  const minutes = Math.floor(currentTime / 60000); //60000 ms in 1 min. Floor rondt af naar dichtsbijzijnde gehele getal
  const seconds = Math.floor((currentTime % 60000) / 1000);
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  document.getElementById('runningTime').textContent = timeString;

  if(currentTime > longestTime){
    longestTime = currentTime;
  }
  document.getElementById('bestScore').textContent = bestScore;
  if(cars.length === 0){
    bestScore = 0;        //reset timer and score
    startTime = millis();
    const longestMinutes = Math.floor(longestTime / 60000); //display longestTime
    const longestSeconds = Math.floor((longestTime % 60000) / 1000);
    document.getElementById('longestTime').textContent = `${longestMinutes}:${longestSeconds.toString().padStart(2, '0')}`;

    nextGeneration();
  }

  for (let car of cars) {
    if (car.score > bestScore) {
      bestScore = car.score;
    }
  }
  if (bestScore > highScore) {
    highScore = bestScore;
  }
  document.getElementById('highScore').textContent = highScore;
}

function createWalls(){
    walls.push(new Boundary(50, 50, 50, 700, false));
    walls.push(new Boundary(50, 700, 1100, 700, false));
    walls.push(new Boundary(1100, 700, 1100, 50, false));
    walls.push(new Boundary(1100, 50, 50, 50, false));
    walls.push(new Boundary(180, 180, 180, 550, false)); //Einde buitenbaan
    walls.push(new Boundary(180, 550, 200, 570, false));
    walls.push(new Boundary(200, 570, 950, 570, false));
    walls.push(new Boundary(950, 570, 970, 550, false));
    walls.push(new Boundary(970, 550, 970, 200, false));
    walls.push(new Boundary(970, 200, 950, 180, false));
    walls.push(new Boundary(950, 180, 180, 180, false));
    walls.push(new Boundary(50, 180, 180, 180, false));
    
    // walls.push(new Boundary(180, 180, 180, 50, true)); //Checkpoints
    walls.push(new Boundary(250, 180, 250, 50, true));
    walls.push(new Boundary(565, 180, 565, 50, true));
    walls.push(new Boundary(880, 180, 880, 50, true));
    walls.push(new Boundary(970, 200, 1100, 200, true));
    walls.push(new Boundary(970, 360, 1100, 360, true));
    // walls.push(new Boundary(970, 450, 1100, 450, true));
    walls.push(new Boundary(970, 530, 1100, 530, true));
    walls.push(new Boundary(960, 560, 1040, 700, true));
    walls.push(new Boundary(950, 570, 950, 700, true));
    walls.push(new Boundary(880, 570, 880, 700, true));
    walls.push(new Boundary(722, 570, 722, 700, true));
    walls.push(new Boundary(565, 570, 565, 700, true));
    walls.push(new Boundary(407, 570, 407, 700, true));
    walls.push(new Boundary(250, 570, 250, 700, true));
    walls.push(new Boundary(200, 570, 200, 700, true));
    walls.push(new Boundary(189, 555, 50, 670, true));
    walls.push(new Boundary(50, 530, 180, 530, true));
    walls.push(new Boundary(50, 360, 180, 360, true));
    // walls.push(new Boundary(50, 270, 180, 270, true));
    walls.push(new Boundary(50, 200, 180, 200, true));
    
}