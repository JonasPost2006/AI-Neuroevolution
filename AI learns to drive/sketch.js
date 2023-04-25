let walls = [];
let carX = 100;
let carY = 100;
let car;

// const mousePosText = document.getElementById('mouse-pos');
// let mousePos = { x: undefined, y: undefined };

// window.addEventListener('mousemove', (event) => {
//   mousePos = { x: event.clientX, y: event.clientY - 200};
//   mousePosText.textContent = `(${mousePos.x}, ${mousePos.y})`;
// });

// const canvas = document.getElementById("myCanvas");
// canvas.height = 600;
// canvas.width = 1000;
// const ctx = canvas.getContext("2d");
// car = new Car(carX, carY, 15, 30);
// car.draw(ctx);

function setup(){
    createCanvas(1200, 800);
    car = new Car(carX, carY, 15, 30);
    walls.push(new Boundary(623, 47, 323, 37));
    walls.push(new Boundary(323, 37, 173, 62));
    walls.push(new Boundary(173, 62, 65, 99));
    walls.push(new Boundary(65, 99, 34, 173));
    walls.push(new Boundary(34, 173, 22, 317));
    walls.push(new Boundary(22, 317, 29, 408));
    walls.push(new Boundary(29, 408, 70, 580));
    walls.push(new Boundary(70, 580, 120, 700));
    walls.push(new Boundary(120, 700, 181, 739));
    walls.push(new Boundary(181, 739, 296, 748));
    walls.push(new Boundary(296, 748, 959, 735));
    walls.push(new Boundary(959, 735, 1110, 654));
    walls.push(new Boundary(1110, 654, 1160, 596));
    walls.push(new Boundary(1160, 596, 1180, 454));
    walls.push(new Boundary(1180, 454, 1144, 355));
    walls.push(new Boundary(1144, 355, 1100, 297));
    walls.push(new Boundary(1100, 297, 950, 280));
    walls.push(new Boundary(950, 280, 750, 390));    
    walls.push(new Boundary(750, 390, 545, 436));
    walls.push(new Boundary(545, 436, 649, 370));
    walls.push(new Boundary(649, 370, 795, 285));
    walls.push(new Boundary(795, 285, 877, 242));
    walls.push(new Boundary(877, 242, 945, 155));
    walls.push(new Boundary(945, 155, 956, 101));
    walls.push(new Boundary(956, 101, 916, 47));
    walls.push(new Boundary(916, 47, 858, 26));
    walls.push(new Boundary(858, 26, 623, 47)); //Einde buitenbaan
    walls.push(new Boundary(623, 117, 323, 107));
    walls.push(new Boundary(323, 107, 173, 152));
    walls.push(new Boundary(173, 152, 125, 179));
    walls.push(new Boundary(125, 179, 95, 250));
    walls.push(new Boundary(95, 250, 85, 350));
    walls.push(new Boundary(85, 350, 140, 580));
    walls.push(new Boundary(140, 580, 190, 665));
    walls.push(new Boundary(190, 665, 213, 672));
    walls.push(new Boundary(213, 672, 314, 685));
    walls.push(new Boundary(314, 685, 932, 675));
    walls.push(new Boundary(932, 675, 1065, 600));
    walls.push(new Boundary(1065, 600, 1110, 476));
    walls.push(new Boundary(1110, 476, 1080, 394));
    walls.push(new Boundary(1080, 394, 1069, 366));
    walls.push(new Boundary(1069, 366, 981, 355));
    walls.push(new Boundary(981, 355, 792, 450));
    walls.push(new Boundary(792, 450, 509, 529));
    walls.push(new Boundary(509, 529, 411, 497));
    walls.push(new Boundary(411, 497, 411, 422));
    walls.push(new Boundary(411, 422, 462, 380));
    walls.push(new Boundary(462, 380, 781, 196));
    walls.push(new Boundary(781, 196, 844, 148));
    walls.push(new Boundary(844, 148, 850, 118));
    walls.push(new Boundary(850, 118, 623, 117));
}

function draw(){
    background(220)
    for(let wall of walls){     //Laat de muren zien
        wall.show();
    }
    car.update();
    car.draw();
}


// function keyIsPressed(){
//     if(keyIsDown(UP_ARROW)){
//         car.setSpeed(0, -1);
//     }else if(keyIsDown(DOWN_ARROW)){
//         car.setSpeed(0, 1);
//     }else if(keyIsDown(RIGHT_ARROW)){
//         car.setSpeed(-1, 0);
//     }else if(keyIsDown(LEFT_ARROW)){
//         car.setSpeed(1, 0);
//     }
// }

// function keyReleased(){
//     car.setSpeed(0, 0);
// }