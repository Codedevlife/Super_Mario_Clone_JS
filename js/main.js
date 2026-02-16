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


function gameLoop() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    background.draw(ctx);
    player.draw(ctx);
    

    requestAnimationFrame(gameLoop);
}
gameLoop();