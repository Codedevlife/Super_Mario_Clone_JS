import {ctx} from "./environment.js";
import Sprite from "./Sprite.js";
import spriteAnimation from '../../resorces/world.json' with {type: 'json'};

class Bloco{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h; 
        
        this.sprite = {};
        
        this.blockType = 'sky';
        this.positionMatrixReferente = 0;
    }
    
    setBlockType(type){
        this.blockType = type;
    }

    setSpriteAnimation(animation){
        this.spriteAnimation = animation;
    }
    createSprite(src){        
        this.sprite = new Sprite(src);
        this.sprite.crop(spriteAnimation.sprites.blocks);        
        this.sprite.staggerFrames = 10;
    }

    draw(){
        if(this.blockType == 'sky') return;        
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2; 
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
    drawRotated(angulo) {
        ctx.save();
        
        // 1. Movemos para o centro do bloco
        ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
        
        // 2. Giramos
        ctx.rotate((angulo * Math.PI) / 180);
        
        // 3. DESENHAMOS RELATIVO AO CENTRO
        // Como o centro agora é 0,0, desenhamos metade para trás e metade para cima
        this.sprite.draw(this.blockType, -this.w / 2, -this.h / 2, this.w, this.h);
        this.sprite.update();

        ctx.restore();
    }
    drawCollision(){
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = 3; 
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }
    update(){
        // this.draw();
        this.sprite.draw(this.blockType, this.x, this.y, this.w, this.h);        
        this.sprite.update();
    }
}


export default Bloco;