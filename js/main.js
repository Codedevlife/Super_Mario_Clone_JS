import Game from './classes/Game.js';

const SCALE = 3;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const GAME_WIDTH = canvas.width = 256 * SCALE;
const GAME_HEIGHT = canvas.height = 224 * SCALE;

const game = new Game(canvas, ctx, GAME_WIDTH, GAME_HEIGHT);

game.start();

