
import Background from './Background.js';
import Player from './Player.js';
import Block from './Blocks.js';

class Game{
    constructor(canvas, ctx, width, height){
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.height = height;

        
        this.background = {};
        this.player = {};

        this.enemies = [];
        this.objects = [];

        this.gameOver = false;

        this.scale = 5;

        this.deltaTime = 0;
    }

    start(){

        // this.Background = new Background();

        this.player = new Player( 100, 350, 16 * this.scale, 32 * this.scale);
        
        // for( let x = 0; x < this.canvas.width; x += 16 * this.scale){
        //     for( let y = 0; y < this.canvas.height; y += 16 * this.scale){                
        //         const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16)).slice(0, 7);
        //         this.objects.push(new Block('ground', x , y, 16 * this.scale, 16 * this.scale, randomColor()));
        //     }
        // }
        

        this.animationLoop();
    }
    
    animationLoop(timeStamp){
        
        this.setDeltaTime(timeStamp);

        this.clearRect();
        
        this.objects.forEach(obj=>obj.draw(this.ctx));

        this.player.movement(this.canvas);
        this.player.draw(this.ctx);
        this.player.spriteAnimation(this.ctx);     

        requestAnimationFrame(timeStamp=>this.animationLoop(timeStamp));
    }

    setDeltaTime(deltaTime){
        this.deltaTime = deltaTime;        
    }
    clearRect(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = 'skyblue';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}

export default Game;