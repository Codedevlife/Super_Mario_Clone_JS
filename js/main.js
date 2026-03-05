import { getDeltaTime, clearRect } from "./classes/helpers.js";
import Bloco from "./classes/Block.js";
import Player from "./classes/Player.js";
import { GAME_HEIGHT, GAME_WIDTH } from "./classes/environment.js";

let player = new Player(10, 300 , 60, 70);
let bloco = new Bloco(200, 400, 50, 50);

let blocos = [];

for( let x = 0; x < GAME_WIDTH; x+=50){
    for( let y = 0; y < GAME_HEIGHT; y+=50){
        blocos.push(new Bloco(x, y, 50, 50));
    }
}

function loop(currentTime) {
    let deltaTime = getDeltaTime(currentTime);
    clearRect();

    // --- Lógica ---
    player.update(deltaTime);
    bloco.update(deltaTime);
    
    // blocos.forEach(b=>b.update());

    requestAnimationFrame(loop);
}

// Inicia o loop
requestAnimationFrame(loop);
