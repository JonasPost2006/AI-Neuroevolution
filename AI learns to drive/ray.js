class Ray{
    constructor(car){
        this.car = car;
        this.rayCount = 5;
        this.rayLength = 100;
        this.raySpread = Math.PI / 4;
        this.rays = [];
    }

    update(){
        this.rays = [];
        for(let i = 0; i < this.rayCount; i++){
            const rayAngle = lerp(this.raySpread / 2, -this.raySpread / 2, i/(this.rayCount - 1)) + this.car.angle;  //lerp pakt een waarde tussen het eerste en tweede object, en wordt beïnvloed door het derde object (https://www.geeksforgeeks.org/p5-js-lerp-function/)
            const start = {x: this.car.x, y:this.car.y};
            const end = {
                x: this.car.x - Math.sin(rayAngle) * this.rayLength, 
                y: this.car.y - Math.cos(rayAngle) * this.rayLength
            };
            this.rays.push([start, end]);
        }
    }

    draw(){
        for(let i = 0; i < this.rayCount; i++){
            const ray = this.rays[i];
            stroke(255, 255, 0);
            line(ray[0].x, ray[0].y, ray[1].x, ray[1].y)    //'0' staat voor de start, '1' staat voor het eind
        }
    }
}