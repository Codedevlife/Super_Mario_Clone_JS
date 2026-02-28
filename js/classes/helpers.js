import {ctx, GAME_HEIGHT, GAME_WIDTH} from "./environment.js";

export function clearRect(){
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0,0, GAME_WIDTH, GAME_HEIGHT);
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