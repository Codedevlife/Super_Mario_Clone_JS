import { getDeltaTime, clearRect } from "./classes/helpers.js";
import Bloco from "./classes/Block.js";
import Player from "./classes/Player.js";
import { ctx, GAME_HEIGHT, GAME_WIDTH } from "./classes/environment.js";
import Level from "./classes/Level.js";

let player = new Player(10, 300 , 60, 70);
let bloco = new Bloco(200, 400, 50, 50);
let level = new Level();

let chao = [];

for( let x = 0; x < GAME_WIDTH; x+=50){
    for( let y = (10 * 50); y < GAME_HEIGHT; y+=50){
        let b = new Bloco(x, y, 50, 50);
        b.createSprite('../img/Sprites/Ground_Tileset.png');
        b.setSpriteAnimation('ground_top');
        chao.push(b);
    }
    for( let y = (11 * 50); y < GAME_HEIGHT; y+=50){
        let b = new Bloco(x, y, 50, 50);
        b.createSprite('../img/Sprites/Ground_Tileset.png');
        b.setSpriteAnimation('ground_bottom');
        chao.push(b);
    }
}

// let stageLoaded = false;
// let stage = new Image();
// stage.src = '../img/Sprites/stages/1-1.png';
// stage.addEventListener('load',e=>{
//     stageLoaded = true;
// });
 // ctx.drawImage(
    //     stage,
    //     0, 0,
    //     400, stage.height,

    //     0, 0, GAME_WIDTH, GAME_HEIGHT
    // )

bloco.createSprite('../img/Sprites/blocks.webp');
bloco.setBlockType('question_block');

level.loadLevel('1-1');

function loop(currentTime) {
    let deltaTime = getDeltaTime(currentTime);
    clearRect();


    
    // --- Lógica ---
    level.update();

    // chao.forEach(b=>b.update());
    // bloco.update();
    // player.update(deltaTime);
    
    
    

    requestAnimationFrame(loop);
}

// Inicia o loop
requestAnimationFrame(loop);
