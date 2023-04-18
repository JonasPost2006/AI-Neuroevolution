// // File: car.js

// class Car {
//     constructor(carX, carY, width, height) {
//       this.x = carX;
//       this.y = carY;
//       this.width = width;
//       this.height = height;
//     }
  
//     draw() {
//       fill(255, 0, 0); // Set fill color to red
//       rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height); // Draw the car as a rectangle
//     }
  
//     move() {
//       if (keyIsDown(UP_ARROW)) {
//         this.y -= 1; // Move up by decreasing y position
//       } else if (keyIsDown(DOWN_ARROW)) {
//         this.y += 1; // Move down by increasing y position
//       } else if (keyIsDown(RIGHT_ARROW)) {
//         this.x += 1; // Move right by increasing x position
//       } else if (keyIsDown(LEFT_ARROW)) {
//         this.x -= 1; // Move left by decreasing x position
//       }
//     }
//   }
  