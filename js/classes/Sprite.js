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

        // 1. Verificação de troca de animação
        if (this.currentAnimation !== animation) {
            this.currentAnimation = animation;
            this.frameIndex = 0; // Reseta para o primeiro frame
            this.gameFrame = 0;  // Reseta o contador global
        }        

        // Se a animação pedida não existir nos dados de crop, aborta
        if (!this.frames[this.currentAnimation]) return;
        const animationKeys = Object.keys(this.frames[this.currentAnimation]);
        const frame = this.frames[this.currentAnimation][animationKeys[this.frameIndex]];

         if (!frame || !this.spriteCarregada) return;
        
        ctx.drawImage(this.image, 
            frame.x, frame.y,
            frame.w, frame.h,

            x, y,            
            w, h);
    }

    update(){
        if (!this.frames[this.currentAnimation]) return;
        const length = Object.keys(this.frames[this.currentAnimation]).length;        
        this.gameFrame = (this.gameFrame + 1) % (length * this.staggerFrames);
        this.frameIndex = Math.floor(this.gameFrame/this.staggerFrames) % length;
    }
}

export default Sprite;