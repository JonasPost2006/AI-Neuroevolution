class Ray{
    constructor(pos, angle){
        this.pos = pos;
        this.direction = p5.Vector.fromAngle(angle);
    }

    lookAt(x, y){
        this.direction.x = x - this.pos.x;
        this.direction.y = y - this.pos.y;
        this.direction.normalize();
    }

    show(){
        stroke(255);
        push();
        translate(this.pos.x, this.pos.y);
        line(0, 0, this.direction.x * 10, this.direction.y * 10);
        pop();
    }

    cast(wall){
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
        
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.direction.x;
        const y4 = this.pos.y + this.direction.y;

        const noemer = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if(noemer == 0){
            return;
        }

        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / noemer;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / noemer;

        //lijnen raken elkaar als 0 < t < 1 en u > 0

        if(t > 0 && t <= 1 && u >= 0){
            const point = createVector();
            point.x = x1 + t * (x2 - x1);
            point.y = y1 + t * (y2 - y1);
            return point;
        } else{
            return;
        }

    }
}