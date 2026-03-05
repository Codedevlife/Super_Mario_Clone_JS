import { getDeltaTime, clearRect } from "./classes/helpers.js";
import Bloco from "./classes/Block.js";
import Player from "./classes/Player.js";

let player = new Player(10, 300 , 60, 70);
let bloco = new Bloco(200, 400, 60, 60);

function loop(currentTime) {
    let deltaTime = getDeltaTime(currentTime);
    clearRect();

    // --- Lógica ---
    bloco.update(deltaTime);
    player.update(deltaTime);

    requestAnimationFrame(loop);
}

// Inicia o loop
requestAnimationFrame(loop);
