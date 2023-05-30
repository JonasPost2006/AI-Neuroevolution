class Ray{
    constructor(pos, angle){
        this.pos = pos;
        this.direction = p5.Vector.fromAngle(angle);
    }

    setAngle(angle){
        this.direction = p5.Vector.fromAngle(angle);
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

            // // car.seeAnyCheckpointWall = wall.checkpoint;
            // const distance = dist(this.pos.x, this.pos.y, point.x, point.y);
            // console.log("Distance Wall ", distance);
            // // return distance;
            return point;
        } else{
            return;
        }

    }
}