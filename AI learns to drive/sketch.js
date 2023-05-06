let walls = [];
let carX = 100;
let carY = 100;
let car;




const mousePosText = document.getElementById('mouse-pos');
let mousePos = { x: undefined, y: undefined };

window.addEventListener('mousemove', (event) => {
  mousePos = { x: event.clientX, y: event.clientY };
  mousePosText.textContent = `(${mousePos.x}, ${mousePos.y - 200})`;
});

function setup(){
    createCanvas(1200, 800);
    car = new Car(carX, carY, 30, 15);
    createWalls();
}

function draw(){
    background(220)
    for(let wall of walls){     //Laat de muren zien
        wall.show();
        // let hit = collideLineRect(wall.a.x, wall.a.y, wall.b.x, wall.b.y, car.x, car.y, car.width, car.height);
        // let hit = collideLineCircle(wall.a.x, wall.a.y, wall.b.x, wall.b.y, car.centerX, car.centerY, car.diameter);
        // if(hit){
        //   console.log('Collision: ', hit);
        // }
    }
    car.update();
    car.draw();
}


function createWalls(){
    walls.push(new Boundary(623, 47, 323, 37));
    walls.push(new Boundary(323, 37, 173, 62));
    walls.push(new Boundary(173, 62, 65, 99));
    walls.push(new Boundary(65, 99, 34, 173));
    walls.push(new Boundary(34, 173, 22, 317));
    walls.push(new Boundary(22, 317, 29, 408));
    walls.push(new Boundary(29, 408, 70, 580));
    walls.push(new Boundary(70, 580, 120, 700));
    walls.push(new Boundary(120, 700, 181, 739));
    walls.push(new Boundary(181, 739, 426, 751));
    walls.push(new Boundary(426, 751, 610, 754));
    walls.push(new Boundary(610, 754, 800, 755));
    walls.push(new Boundary(800, 755, 959, 755))
    walls.push(new Boundary(959, 755, 1110, 654));
    walls.push(new Boundary(1110, 654, 1160, 596));
    walls.push(new Boundary(1160, 596, 1180, 454));
    walls.push(new Boundary(1180, 454, 1160, 346));
    walls.push(new Boundary(1160, 346, 1100, 297));
    walls.push(new Boundary(1100, 297, 950, 280));
    walls.push(new Boundary(950, 280, 748, 380));    
    walls.push(new Boundary(748, 380, 591, 428));
    walls.push(new Boundary(591, 428, 591, 421));
    walls.push(new Boundary(591, 421, 649, 390));
    walls.push(new Boundary(649, 390, 739, 350));
    walls.push(new Boundary(739, 350, 795, 320));
    walls.push(new Boundary(795, 320, 920, 242));
    walls.push(new Boundary(920, 242, 950, 180));
    walls.push(new Boundary(950, 180, 955, 155));
    walls.push(new Boundary(955, 155, 956, 101));
    walls.push(new Boundary(956, 101, 916, 47));
    walls.push(new Boundary(916, 47, 858, 26));
    walls.push(new Boundary(858, 26, 623, 47)); //Einde buitenbaan
    walls.push(new Boundary(623, 137, 323, 137));
    walls.push(new Boundary(323, 137, 183, 162));
    walls.push(new Boundary(183, 162, 155, 179));
    walls.push(new Boundary(155, 179, 120, 250));
    walls.push(new Boundary(120, 250, 105, 350));
    walls.push(new Boundary(105, 350, 160, 575));
    walls.push(new Boundary(160, 575, 220, 655));
    walls.push(new Boundary(220, 655, 314, 665));
    walls.push(new Boundary(314, 665, 932, 655));
    walls.push(new Boundary(932, 655, 1050, 587));
    walls.push(new Boundary(1050, 587, 1081, 476));
    walls.push(new Boundary(1081, 476, 1066, 379));
    walls.push(new Boundary(1066, 379, 981, 370));
    walls.push(new Boundary(981, 370, 792, 450));
    walls.push(new Boundary(792, 450, 675, 512));
    walls.push(new Boundary(675, 512, 509, 529));
    walls.push(new Boundary(509, 529, 411, 497));
    walls.push(new Boundary(411, 497, 411, 422));
    walls.push(new Boundary(411, 422, 462, 380));
    walls.push(new Boundary(462, 380, 576, 308));
    walls.push(new Boundary(576, 308, 663, 260));
    walls.push(new Boundary(663, 260, 730, 226));
    walls.push(new Boundary(730, 226, 781, 196));
    walls.push(new Boundary(781, 196, 844, 161));
    walls.push(new Boundary(844, 161, 845, 145));
    walls.push(new Boundary(845, 145, 623, 137));
}
