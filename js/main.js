import { getDeltaTime, clearRect } from "./classes/helpers.js";
import Bloco from "./classes/Block.js";
import Player from "./classes/Player.js";
import { ctx, GAME_HEIGHT, GAME_WIDTH } from "./classes/environment.js";

let player = new Player(10, 300 , 60, 70);
let bloco = new Bloco(200, 400, 50, 50);

let chao = [];

for( let x = 0; x < GAME_WIDTH; x+=50){
    for( let y = (10 * 50); y < GAME_HEIGHT; y+=50){
        chao.push(new Bloco(x, y, 50, 50));
    }
}

let stageLoaded = false;
let stage = new Image();
stage.src = '../img/Sprites/stages/1-1.png';
stage.addEventListener('load',e=>{
    stageLoaded = true;
});


function loop(currentTime) {
    let deltaTime = getDeltaTime(currentTime);
    clearRect();

    
    chao.forEach(b=>{
            b.setSpriteSrc('../img/Sprites/blocks.webp');    
            b.drawImage('ground_bottom');            
        }
    );

    // ctx.drawImage(
    //     stage,
    //     0, 0,
    //     400, stage.height,

    //     0, 0, GAME_WIDTH, GAME_HEIGHT
    // )


    // --- Lógica ---
    // player.update(deltaTime);
    // bloco.drawImage('question_block');
    
    requestAnimationFrame(loop);
}

// Inicia o loop
requestAnimationFrame(loop);
