import Game from './classes/Game.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const GAME_WIDTH = canvas.width = 800;
const GAME_HEIGHT = canvas.height = 600;

const game = new Game(canvas, ctx, GAME_WIDTH, GAME_HEIGHT);

game.start();

