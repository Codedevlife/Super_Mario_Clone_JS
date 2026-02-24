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
        this.velocidadeQueda = 0;
        this.valociadeAndar = 250;
        this.gravidade = 3000;       
        this.forcaDoPulo = -1000;
        this.noChao = false;

        // Controle de teclas
        this.teclas = {};
        this.capturaTeclas();
    }

    capturaTeclas(){
        window.addEventListener('keydown', e => this.teclas[e.code] = true);
        window.addEventListener('keyup', e => this.teclas[e.code] = false);
    }

    draw(ctx){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    update(deltaTime) {       

        if( this.teclas['Space'] && this.noChao ){
            this.velocidadeQueda = this.forcaDoPulo;
            this.noChao = false;
            console.log('pulando')         
        }
        else if(this.teclas['ArrowRight']){
            this.x += 10;
        }
        else if(this.teclas['ArrowLeft']){
            this.x -= 10;
        }

        this.velocidadeQueda += this.gravidade * deltaTime;
        this.y += this.velocidadeQueda * deltaTime;
                
        if( this.y > GAME_HEIGHT - this.h ){
            this.y = GAME_HEIGHT - this.h;
            this.velocidadeQueda = 0;
            this.noChao = true;
        }
    }  
}


let player = new Mario(10, GAME_HEIGHT / 2 , 50, 50);

function loop(currentTime) {
    let deltaTime = getDeltaTime(currentTime);
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