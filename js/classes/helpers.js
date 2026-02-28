import gameEnv from "./environment.js";

export function clearRect(){
    gameEnv.ctx.fillStyle = 'skyblue';
    gameEnv.ctx.fillRect(0,0, gameEnv.canvas.width, gameEnv.canvas.height);
}

let lastTime = 0;
export function getDeltaTime(currentTime){
    // 1. Calcula a diferença em milissegundos
    let deltaTimeMS = currentTime - lastTime;
    
    // 2. Converte para segundos (ex: 0.016 para 60 FPS)    
    let deltaTime = deltaTimeMS / 1000;

    // 3. Atualiza o lastTime para o próximo frame
    lastTime = currentTime;

    // 4. Proteção 
    // Se o deltaTime for maior que 0.1s, tratamos como 0 para o jogo não travar
    if (deltaTime > 0.1) deltaTime = 0;

    return deltaTime;
}