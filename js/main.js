const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

import Background from './classes/Background.js';
const background = new Background(GAME_WIDTH, GAME_HEIGHT);

import Player from './classes/Player.js';
const player = new Player(100, 100, 50, 50);

import Objects from './classes/Objects.js';
const block = [new Objects(200, 400, 50, 50, 'yellow')];

function gameLoop() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    background.draw(ctx);
    block.forEach(obj => obj.draw(ctx));
    player.draw(ctx);
    player.move({GAME_WIDTH, GAME_HEIGHT});    
    player.drawsprite(ctx);
    player.drawHitbox(ctx);
    
    player.collision(block);    

    requestAnimationFrame(gameLoop);
}
gameLoop();