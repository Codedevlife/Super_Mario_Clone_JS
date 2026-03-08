import { getDeltaTime, clearRect } from "./classes/helpers.js";
import Bloco from "./classes/Block.js";
import Player from "./classes/Player.js";
import { ctx, GAME_HEIGHT, GAME_WIDTH } from "./classes/environment.js";
import Level from "./classes/Level.js";

let player = new Player(10, 300 , 60, 70);
let level = new Level();

level.loadLevel('1-1');

function loop(currentTime) {
    let deltaTime = getDeltaTime(currentTime);
    clearRect();


    
    // --- Lógica ---
    level.update(deltaTime);
    level.checkCollision(player);
    player.update(deltaTime);
    
    
    

    requestAnimationFrame(loop);
}

// Inicia o loop
requestAnimationFrame(loop);
