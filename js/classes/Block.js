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