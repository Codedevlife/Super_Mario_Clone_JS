import {ctx} from "./environment.js";

class Sprite{
    constructor(src){
        this.image = new Image();
        this.image.src = src;

        this.spriteCarregada = false;

        this.image.onload = ()=>this.spriteCarregada = true;


        this.frames = {};        
        this.frameIndex = 0;
        this.gameFrame = 0;
        this.staggerFrames = 4;

        this.currentAnimation = 'idle';
    }

    crop(spritesAnimationPosition){
        this.frames = spritesAnimationPosition;
    }
    
    draw(animation, x, y, w, h){
        
        this.currentAnimation = animation;

        let frame = this.frames[this.currentAnimation][Object.keys(this.frames[this.currentAnimation])[this.frameIndex]];        
        if(!frame) return;
        
        ctx.drawImage(this.image, 
            frame.x, frame.y,
            frame.w, frame.h,

            x, y,            
            w, h);
    }

    update(deltaTime){
        this.gameFrame += 1;        
        let length = Object.keys(this.frames[this.currentAnimation]).length;        
        this.frameIndex = Math.floor(this.gameFrame/this.staggerFrames) % length;
    }
}

export default Sprite;