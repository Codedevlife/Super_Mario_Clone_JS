const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GAME_WIDTH = canvas.width = 800;
const GAME_HEIGHT = canvas.height = 600;


//Física do jogo
const physics = {};


class Mario{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;


       // FÍSICA (Valores em pixels por segundo)
        this.vy = 0;          // Velocidade vertical atual
        this.g = 0.1;        // Gravidade (px/s^2)
        this.speed = 250;     // Velocidade horizontal (px/s)
        this.jumpForce = -600; // Força do pulo (px/s)
        this.onGround = false;


        // Controle de teclas
        this.keys = {};
        this.initInput();
    }

    initInput(){
        window.addEventListener('keydown', e => this.keys[e.code] = true);
        window.addEventListener('keyup', e => this.keys[e.code] = false);
    }

    draw(ctx){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    update(deltaTime) {
        // 1. Aplica Gravidade à velocidade vertical
        this.vy += this.g * deltaTime;
        this.y += this.vy * deltaTime;

        // 2. Movimentação Horizontal
        if (this.keys['ArrowRight']) this.x += this.speed * deltaTime;
        if (this.keys['ArrowLeft']) this.x -= this.speed * deltaTime;

        // 3. Pulo (Só pula se estiver no chão)
        if (this.keys['Space'] && this.onGround) {
            this.vy = this.jumpForce;
            this.onGround = false;
        }

        // 4. Colisão com o Chão
        if (this.y > GAME_HEIGHT - this.h) {
            this.y = GAME_HEIGHT - this.h;
            this.vy = 0;
            this.onGround = true;
        }
    }  
}


let player = new Mario(10, GAME_HEIGHT / 2 , 50, 50);

function loop(currentTime) {
    let deltaTime = (currentTime);
    clearRect();
    // --- Lógica ---

    player.update(deltaTime);    
    player.draw(ctx);
    
       

    requestAnimationFrame(loop);
}

// Inicia o loop
requestAnimationFrame(loop);

function clearRect(){
    ctx.fillStyle = 'skyblue';
    ctx.fillRect(0,0, GAME_WIDTH, GAME_HEIGHT);
}

let lastTime = 0;
function getDeltaTime(currentTime){
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