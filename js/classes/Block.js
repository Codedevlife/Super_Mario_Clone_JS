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
        

        this.spriteAnimation = 'idle';

        this.spriteSrc = '';
    }

    setSpriteSrc(src){
        this.spriteSrc = src;
        this.createSprite();
    }

    createSprite(){
        this.sprite = new Sprite(this.spriteSrc);
        this.sprite.crop(spriteAnimation.sprites.blocks);        
        this.sprite.staggerFrames = 10;
    }

    draw(){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.w, this.h);        
    }

    update(){
        this.draw();
        this.sprite.draw(this.spriteAnimation, this.x, this.y, this.w, this.h);
        this.sprite.update();
        console.log(this.spriteAnimation);
    }

    drawImage(img){
        this.spriteAnimation = img;
        this.update();
    }

}


export default Bloco;