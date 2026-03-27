import { getDeltaTime, clearRect } from "./classes/helpers.js";
import Bloco from "./classes/Block.js";
import Player from "./classes/Player.js";
import { ctx, GAME_HEIGHT, GAME_WIDTH } from "./classes/environment.js";
import Level from "./classes/Level.js";

let player = new Player(8500, 0 , 50, 50);
let level = new Level();

level.loadLevel('1-1');

function loop(currentTime) {
    let deltaTime = getDeltaTime(currentTime);
    clearRect();


    
    // --- Lógica ---
    ctx.save();
    let cameraX = Math.max(0, player.x - GAME_WIDTH / 4); 
    ctx.translate(Math.floor(-cameraX), 0);
    
    
    level.update(deltaTime);
    
    level.checkCollision(player);   
    
    player.update(deltaTime);
    
    
    

    ctx.restore();
    
    

    requestAnimationFrame(loop);
}

// Inicia o loop
requestAnimationFrame(loop);
