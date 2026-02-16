const CANVAS = document.getElementById('gameCanvas');
const CTX = CANVAS.getContext('2d');

CANVAS.width = 800;
CANVAS.height = 600;


//Game Loop
function gameLoop(timestamp) {
    // Clear the canvas
    CTX.clearRect(0, 0, CANVAS.width, CANVAS.height);   
    // Update game state
  

    
    // Draw game elements
    requestAnimationFrame(gameLoop);
}

gameLoop();