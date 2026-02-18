
import Player from './Player.js';
import Block from './Blocks.js';

class Game{
    constructor(canvas, ctx, width, heith){
        this.canvas = canvas;
        this.ctx = ctx;
        this.width = width;
        this.heith = heith;

        this.enemies = [];
        this.player = {};
        this.objects = [];

        this.gameOver = false;
    }

    start(){

        this.player = new Player( 100, 350, 150, 150);
        
        this.objects.push(new Block( 250 , 350, 50, 50, 'yellow'));
        

        this.animationLoop();
    }
    
    animationLoop(){
        this.clearRect();
        
        this.player.movement(this.canvas);
        this.player.draw(this.ctx);
        this.player.animation(this.ctx);

        this.objects.forEach(obj=>obj.draw(this.ctx));

        requestAnimationFrame(()=>this.animationLoop());
    }

    clearRect(){
        this.ctx.clearRect(0, 0, this.width, this.heith);
        this.ctx.fillStyle = 'skyblue';
        this.ctx.fillRect(0, 0, this.width, this.heith);
    }
}

export default Game;