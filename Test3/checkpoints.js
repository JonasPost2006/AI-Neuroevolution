class Checkpoint{
    constructor(x1, y1, x2, y2, checkpoint){
        this.a = createVector(x1, y1);
        this.b = createVector(x2, y2);
        this.checkpoint = checkpoint;
    }

    show(){
        const canvasOffset = {x: 0, y: 0};
        stroke('green');
        strokeWeight(5);
        line(this.a.x + canvasOffset.x, this.a.y + canvasOffset.y, this.b.x + canvasOffset.x, this.b.y + canvasOffset.y);
    
    }
}