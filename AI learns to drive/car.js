class Car {
    constructor(carX, carY, width, height){
        this.x = carX;
        this.y = carY;
        this.width = width;
        this.height = height;
        this.speedX = 0;
        this.speedY = 0;

        // this.controls = new Controls();
    }

    draw(){
        // ctx.beginPath();
        // ctx.rect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height); //auto rechthoek
        // ctx.fill();
        fill(255);
        rect(this.x, this.y, this.width, this.height);
        
    }

    move(){
        this.x += this.speedX;
        this.y += this.speedY;
    }

    setSpeed(speedX, speedY){
        this.speedX = speedX;
        this.speedY = speedY;
    }


}
  