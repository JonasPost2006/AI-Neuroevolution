let walls = [];
let carX = 100;
let carY = 100;
let car;

// const canvas = document.getElementById("myCanvas");
// canvas.height = 600;
// canvas.width = 1000;
// const ctx = canvas.getContext("2d");
// car = new Car(carX, carY, 15, 30);
// car.draw(ctx);

function setup(){
    createCanvas(1200, 800);
    car = new Car(carX, carY, 15, 30);
    // walls.push(new Boundary(50, 300, 50, 100));
    // walls.push(new Boundary(50, 300, 175, 300));
    // walls.push(new Boundary(175, 300, 175, 450));
    // walls.push(new Boundary(175, 450, 50, 450));

}

function draw(){
    background(220)
    car.move();
    car.draw();
}

function keyIsPressed(){
    if(keyIsDown(UP_ARROW)){
        car.setSpeed(0, -1);
    }else if(keyIsDown(DOWN_ARROW)){
        car.setSpeed(0, 1);
    }else if(keyIsDown(RIGHT_ARROW)){
        car.setSpeed(-1, 0);
    }else if(keyIsDown(LEFT_ARROW)){
        car.setSpeed(1, 0);
    }
}

function keyReleased(){
    car.setSpeed(0, 0);
}