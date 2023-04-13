// File: sketch.js

let car; // Declare a variable for the car

function setup() {
  createCanvas(400, 400); // Create a canvas
  car = new Car(width / 2, height / 2, 50, 25); // Create a car instance at the center of the canvas
}

function draw() {
  background(220); // Set background color to light gray
  car.move(); // Call the move() function to update car's position
  car.draw(); // Call the draw() function to draw the car
}
