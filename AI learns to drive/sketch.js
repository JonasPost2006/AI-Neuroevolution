// function buildTrack(){

// }
let walls = [];

function setup(){
    createCanvas(1200, 800);
    walls.push(new Boundary(50, 300, 50, 100));
    walls.push(new Boundary(50, 300, 175, 300));
    walls.push(new Boundary(175, 300, 175, 450));
    walls.push(new Boundary(175, 450, 50, 450));
}

function draw(){
    background(0);
    for(let wall of walls){
        wall.show();
    }
}