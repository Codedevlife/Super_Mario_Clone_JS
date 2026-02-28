import { getDeltaTime, clearRect } from "./classes/helpers.js";
import Bloco from "./classes/Block.js";
import Player from "./classes/Player.js";

let player = new Player(10, 300 , 70, 70);
let bloco = new Bloco(200, 400, 70, 70);

function loop(currentTime) {
    let deltaTime = getDeltaTime(currentTime);
    clearRect();

    // --- Lógica ---
    bloco.draw();
    player.update(deltaTime);

    requestAnimationFrame(loop);
}

// Inicia o loop
requestAnimationFrame(loop);
