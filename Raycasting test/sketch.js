
let boundary;
function setup(){
    createCanvas(400, 400);
    boundary = new Boundary(300, 100, 300, 300)
}

function draw(){
    background(p50);
    boundary.show();
}