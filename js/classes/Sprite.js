import {ctx} from "./environment.js";
class Sprite{
    constructor(src){
        this.image = new Image();
        this.image.src = src;

        this.spriteCarregada = false;

        this.image.onload = ()=>this.spriteCarregada = true;


        this.frames = [];
        this.gameFrame = 0;
        this.frameIndex = 0;
        this.staggerFrames = 4;

        //document.body.append(this.image);
    }

    crop({x,y,w,h}){
        this.frames.push({x,y,w,h});
    }
    
    draw(x, y, w, h){
        let frame0 = this.frames[this.frameIndex]; 
               
        ctx.drawImage(this.image, 
            frame0.x, frame0.y,
            frame0.w, frame0.h,

            x, y,            
            w, h);
    }

    update(){
    //   Math.floor(this.gameFrame/this.staggerFrames) / totalFrames;
    }
}

export default Sprite;