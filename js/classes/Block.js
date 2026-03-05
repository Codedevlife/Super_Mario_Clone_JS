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
        this.createSprite();
    }

     createSprite(){        
        this.sprite = new Sprite('../img/Sprites/blocks.webp');
        this.sprite.crop(spriteAnimation.sprites.questionBlock);        
        this.sprite.staggerFrames = 10;
    }

    draw(){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.w, this.h);        
    }

    update(){
        // this.draw();
        this.sprite.draw('rotation', this.x, this.y, this.w, this.h);
        this.sprite.update();
    }
}


export default Bloco;