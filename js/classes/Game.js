
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
        this.player = new Player(this.ctx);
        this.animationLoop();
    }
    
    animationLoop(){
        this.ctx.clearRect(0, 0, this.width, this.heith);
        console.log('Gameloop iniciado')
        requestAnimationFrame(()=>this.animationLoop());
    }
}

export default Game;