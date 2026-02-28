const gameEnv = {}
gameEnv.canvas = document.getElementById('gameCanvas');
gameEnv.ctx = gameEnv.canvas.getContext('2d');
gameEnv.canvas.width = 800;
gameEnv.canvas.height = 600;

export default gameEnv;