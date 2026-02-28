
class Bloco{
    constructor(x,y,w,h, gameEnv){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.gameEnv = gameEnv;
    }

    draw(){
        this.gameEnv.ctx.fillStyle = 'yellow';
        this.gameEnv.ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    update(){

    }
}


export default Bloco;