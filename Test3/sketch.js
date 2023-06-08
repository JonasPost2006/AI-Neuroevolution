const TOTAL = 40;
let walls = [];
let carX = 100;
let carY = 100;
let width = 15;
let height = 30;
let mutationPer = 0.1;
let savedCars = [];
let cars = [];


// const mousePosText = document.getElementById('mouse-pos');
// let mousePos = { x: undefined, y: undefined };

// window.addEventListener('mousemove', (event) => {
//   mousePos = { x: event.clientX, y: event.clientY };
//   mousePosText.textContent = `(${mousePos.x}, ${mousePos.y - 200})`;
// });

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
          // console.log('Collision: ', hit);
          savedCars.push(cars.splice(i, 1)[0]);
        }
      }
  }  
  for(let car of cars){
    car.update();
    car.draw();
  }

  if(cars.length === 0){
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
    walls.push(new Boundary(50, 50, 50, 700));
    walls.push(new Boundary(50, 700, 1100, 700));
    walls.push(new Boundary(1100, 700, 1100, 50));
    walls.push(new Boundary(1100, 50, 50, 50));
    walls.push(new Boundary(180, 180, 180, 570)); //Einde buitenbaan
    walls.push(new Boundary(180, 570, 970, 570));
    walls.push(new Boundary(970, 570, 970, 180));
    walls.push(new Boundary(970, 180, 180, 180));
}