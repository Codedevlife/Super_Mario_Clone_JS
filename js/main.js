const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GAME_WIDTH = canvas.width = 800;
const GAME_HEIGHT = canvas.height = 600;

function loop(){

    console.log('teste')
    requestAnimationFrame(loop)
}

loop();