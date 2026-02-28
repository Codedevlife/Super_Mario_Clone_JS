import {ctx} from "./environment.js";
class Bloco{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;        
    }

    draw(){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    update(){

    }
}


export default Bloco;