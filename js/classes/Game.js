
import Player from './Player.js';

class Game{
    constructor(ctx, width, heith){
        this.ctx = ctx;
        this.width = width;
        this.heith = heith;

        this.enemies = [];
        this.player = {};

        this.gameOver = false;
    }

    start(){
        this.player = new Player(this.ctx, 0, 0, 150, 150);
        this.animationLoop();
    }
    
    animationLoop(){
        this.ctx.clearRect(0, 0, this.width, this.heith);
        this.ctx.fillStyle = 'skyblue';
        this.ctx.fillRect(0, 0, this.width, this.heith);

        this.player.draw();
        this.player.animation();

        requestAnimationFrame(()=>this.animationLoop());
    }
}

export default Game;