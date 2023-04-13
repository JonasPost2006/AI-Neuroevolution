class Controls{
    constructor(){
        this.forward = false;
        this.reverse = false;
        this.right = false;
        this.left = false;

        console.table(this);
    }

    
}

function draw(){
    if(keyIsDown(UP_ARROW)){
        this.forward = true;
    }else if(keyIsDown(DOWN_ARROW)){
        this.reverse = true;
    }else if(keyIsDown(RIGHT_ARROW)){
        this.right = true;
    }else if(keyIsDown(LEFT_ARROW)){
        this.left = true;
    }
}