const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const GAME_WIDTH = canvas.width = 800;
const GAME_HEIGHT = canvas.height = 600;


//Física do jogo
const physics = {};

class Sprite{
    constructor(nome, url){
        this.name = nome;
        this.image = new Image();
        this.image.src = url;

        this.spriteCarregada = false;


        this.image.onload = ()=>this.spriteCarregada = true;
        this.frames = [];
    }

    crop({x,y,w,h}){
        this.frames.push({x,y,w,h});
    }
    
    draw(ctx, x, y, w, h){
        let frame0 = this.frames[0];

        ctx.drawImage(this.image, 
            frame0.x, frame0.y,
            frame0.w, frame0.h,

            x, y,            
            w, h);
    }
}



let marioSprite = new Sprite('Mario', '../../img/Sprites/mario.png');
marioSprite.crop({x:112,y:2,w:16,h:30});

class Bloco{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    draw(ctx){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    update(){

    }
}


class Mario{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;


       // FÍSICA (Valores em pixels por segundo)
        this.gravidade = 3000;        
        this.velocidadeQueda = 0;        
        this.forcaDoPulo = -1000;

        this.valocidadeHorizontal = 0;        
        this.valocidadeMaxima = 600;  
        this.forcaDeAceleracao = 2000;        
        this.friccao = 0.95;

        this.noChao = false;
        this.correndo = false;
        this.andando = false;
        this.estaMovendo = false;

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

        }
        else if(this.teclas['ArrowRight']){
            this.valocidadeHorizontal += this.forcaDeAceleracao * deltaTime;
            this.estaMovendo = true;
        }
        else if(this.teclas['ArrowLeft']){
            this.valocidadeHorizontal -= this.forcaDeAceleracao * deltaTime;
            this.estaMovendo = true;
        }
        else if(!this.teclas['ArrowLeft'] || !this.teclas['ArrowRight']){
            
            if(!this.estaMovendo){
                this.valocidadeHorizontal *= this.friccao;
                // console.log(this.valocidadeHorizontal, this.friccao);
            }
            
            if( Math.abs(this.valocidadeHorizontal) < 1 ){
                this.valocidadeHorizontal = 0;                
            }
            this.estaMovendo = false;
        }

        if (this.valocidadeHorizontal > this.valocidadeMaxima) this.valocidadeHorizontal = this.valocidadeMaxima;
        if (this.valocidadeHorizontal < -this.valocidadeMaxima) this.valocidadeHorizontal = -this.valocidadeMaxima;
        
        this.velocidadeQueda += this.gravidade * deltaTime;
        this.y += this.velocidadeQueda * deltaTime;
        this.x += this.valocidadeHorizontal * deltaTime;

        if( this.y > GAME_HEIGHT - this.h ){
            this.y = GAME_HEIGHT - this.h;
            this.velocidadeQueda = 0;
            this.noChao = true;
        }

        if( this.x < 0 - this.w){
            this.x = GAME_WIDTH;
        }

        if( this.x > GAME_WIDTH){
            this.x = 0 - this.w;
        }
    }  
}


let player = new Mario(10, GAME_HEIGHT / 2 , 50, 50);
let bloco = new Bloco( 200, 400, 50, 50);

function loop(currentTime) {
    let deltaTime = getDeltaTime(currentTime);
    clearRect();

    // --- Lógica ---
    bloco.draw(ctx);
    player.update(deltaTime);    
    player.draw(ctx);
    marioSprite.draw(ctx, player.x, player.y,  player.w, player.h);
       

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