let walls = [];

// Set up canvas
function setup() {
  createCanvas(1200, 800);
  car.position = createVector(width / 2, height / 2); // Set initial position of car to center of canvas
  car.velocity = createVector(0, 0); // Set initial velocity of car to 0
  car.acceleration = createVector(0, 0); // Set initial acceleration of car to 0
}

// Define car object
let car = {
  position: null,
  velocity: null,
  acceleration: null,
  maxSpeed: 5,
  size: 20,
  color: 'blue',
};

// Define circuit object
let circuit = {
  vertices: [], // Array to store vertices of the circuit
  lines: [], // Array to store lines connecting the vertices
  color: 'grey',
};

// Draw circuit
function drawCircuit() {
  fill(circuit.color);
  beginShape();
  for (let i = 0; i < circuit.vertices.length; i++) {
    vertex(circuit.vertices[i].x, circuit.vertices[i].y);
  }
  for (let i = 0; i < circuit.vertices.length; i++) {
    vertex(walls[i], walls[i]);
  }
  endShape(CLOSE);

  // Draw lines connecting vertices
  stroke('black');
  for (let i = 0; i < circuit.lines.length; i++) {
    let v1 = circuit.vertices[circuit.lines[i].start];
    let v2 = circuit.vertices[circuit.lines[i].end];
    line(v1.x, v1.y, v2.x, v2.y);
  }
}

// Draw car
function drawCar() {
  fill(car.color);
  rectMode(CENTER);
  rect(car.position.x, car.position.y, car.size, car.size);
}

// Update car position, velocity, and acceleration
function updateCar() {
  car.position.add(car.velocity);
  car.velocity.add(car.acceleration);
  car.velocity.limit(car.maxSpeed);
  car.acceleration.mult(0);
}

// Apply steering force to car
function steerCar(angle) {
  let steering = p5.Vector.fromAngle(angle);
  steering.mult(0.1);
  car.acceleration.add(steering);
}

// Check if car is inside circuit
function checkBoundary() {
  let inside = false;
  for (let i = 0, j = circuit.vertices.length - 1; i < circuit.vertices.length; j = i++) {
    let xi = circuit.vertices[i].x,
      yi = circuit.vertices[i].y;
    let xj = circuit.vertices[j].x,
      yj = circuit.vertices[j].y;
    let intersect =
      yi > car.position.y != yj > car.position.y &&
      car.position.x < ((xj - xi) * (car.position.y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// Main draw function
function draw() {
  background(220);
  drawCircuit();
  drawCar();
  updateCar();

  // Check for boundary collision
  if (!checkBoundary()) {
    car.color = 'red'; // Change car color to red if outside the circuit
  } else {
    car.color = 'blue'; // Change car color back to blue if inside the circuit
  }
}

// Add vertices and lines to circuit on mouse click
function mouseClicked() {
  let vertexIndex = circuit.vertices.length;
  let lineIndex = circuit.lines.length;
  let newVertex = createVector(mouseX, mouseY);
  circuit.vertices.push(newVertex);
  if (vertexIndex > 0) {
    // Create a line connecting the newly added vertex with the previous vertex
    let newLine = {
      start: vertexIndex - 1,
      end: vertexIndex,
    };
    circuit.lines.push(newLine);
  }
}
