let walls = [];
let carX = 100;
let carY = 100;
let width = 15;
let height = 30;
let car;




const mousePosText = document.getElementById('mouse-pos');
let mousePos = { x: undefined, y: undefined };

window.addEventListener('mousemove', (event) => {
  mousePos = { x: event.clientX, y: event.clientY };
  mousePosText.textContent = `(${mousePos.x}, ${mousePos.y - 200})`;
});

function setup(){
    createCanvas(1200, 800);
    car = new Car(carX, carY, width, height);
    createWalls();
}

function draw(){
    background(220)
    for(let wall of walls){     //Laat de muren zien
        wall.show();
        let hit = collideLineRect(wall.a.x, wall.a.y, wall.b.x, wall.b.y, car.x, car.y, car.width, car.height);
        // let hit = collideLineCircle(wall.a.x, wall.a.y, wall.b.x, wall.b.y, car.centerX, car.centerY, car.diameter);
        if(hit){
          console.log('Collision: ', hit);
        }
    }
    car.update();
    car.draw();
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


    //BLIJKBAAR ZIJN DE X EN Y ASSEN NIET GOED GEPLAATST OFZO WAARDOOR HET NIET KLOPT EN NIET ACCURAAT IS
}
