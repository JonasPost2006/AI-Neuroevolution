let walls = [];
let ray;
let particle;

const sceneW = 400;
const sceneH = 400;
const scene = [];

function setup(){
    createCanvas(800, 400);
    for(let i = 0; i < 5; i++){
        let x1 = random(sceneW);
        let x2 = random(sceneW);
        let y1 = random(sceneH);
        let y2 = random(sceneH);
        walls[i] = new Boundary(x1, y1, x2, y2);
    }
    particle = new Particle();
}



function draw(){
    if(keyIsDown(LEFT_ARROW)){
        particle.rotate(0.05);
    } else if(keyIsDown(RIGHT_ARROW)){
        particle.rotate(-0.05);
    }

    background(0);
    for(let wall of walls){
        wall.show();
    }
    particle.update(mouseX, mouseY);
    particle.show();
    
    const scene = particle.look(walls);
    const w = sceneW / scene.length;
    push();
    translate(sceneW, 0);
    for(let i = 0; i < scene.length; i++){
        noStroke();
        const b = map(scene[i], 0, sceneW, 255, 0);
        const h = map(scene[i], 0, sceneW, sceneH, 0);
        fill(b);
        rectMode(CENTER);
        rect(i * w + w / 2, sceneH / 2, w, h);
    }
    pop();

    // ray.show();
    // ray.lookAt(mouseX, mouseY);

    // let point = ray.cast(wall);
    // if(point){
    //     fill(255);
    //     ellipse(point.x, point.y, 8, 8);
    // }
}