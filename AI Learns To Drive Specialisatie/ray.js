class Ray{
    constructor(pos, angle){
        this.pos = pos;
        this.direction = p5.Vector.fromAngle(angle);
    }

    setAngle(angle){
        this.direction = p5.Vector.fromAngle(angle);
    }

    cast(wall){
        //Coördinaten van de eindpunten van de muur
        const x1 = wall.a.x;
        const y1 = wall.a.y;
        const x2 = wall.b.x;
        const y2 = wall.b.y;
        
        //Coördinaten van de ray en richting
        const x3 = this.pos.x;
        const y3 = this.pos.y;
        const x4 = this.pos.x + this.direction.x;
        const y4 = this.pos.y + this.direction.y;

        //Bereken de noemer van de snijpunt formule. (https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection)
        const noemer = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
        if(noemer == 0){
            return;
        }

        //Bereken t en u van de formule
        const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / noemer;
        const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / noemer;

        //Lijnen raken elkaar als 0 < t < 1 en u > 0
        if(t > 0 && t <= 1 && u >= 0){
            const point = createVector(); //Bereken het snijpunt en return deze
            point.x = x1 + t * (x2 - x1);
            point.y = y1 + t * (y2 - y1);
            return point;
        } else{
            return;
        }

    }
}