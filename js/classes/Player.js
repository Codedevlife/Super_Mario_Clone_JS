class Player{
    constructor(ctx, px, py, w, h){
        this.ctx = ctx;
        this.postionX = px;
        this.postionY = py;
        this.width = w;
        this.height = h;
    }

    draw(){
        this.ctx.fillRect = "red";
        
    }
}

export default Player;