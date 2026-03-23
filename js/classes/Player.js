
import {canvas, ctx, GAME_HEIGHT, GAME_WIDTH} from "./environment.js";
import Sprite from "./Sprite.js";
import spriteAnimation from '../../resorces/world.json' with {type: 'json'};

ctx.imageSmoothingEnabled = false;

class Player{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

       // FÍSICA (Valores em pixels por segundo)
        this.gravidade = 3000;        
        this.velocidadeQueda = 0;        
        this.forcaDoPulo = -1000;
        // this.forcaDoPulo = -1500;

        this.velocidadeHorizontal = 0;        
        this.valocidadeMaxima = 800;  
        this.forcaDeAceleracao = 2000;        
        // this.friccao = 0.90;
        this.friccao = 0;

        this.noChao = false;
        this.falling = false;
        this.jumping = false;
        this.correndo = false;
        this.andando = false;
        this.estaMovendo = false;
        this.agachado = false;
        this.lookUp = false;
        this.direcao = 1; // 1 - apontado para direita / 0-apontado para esquerda
        
        //Controle de tamanho de mario
        this.size = "big"; // big | small

        // Controle de teclas
        this.teclas = {};
        this.capturaTeclas();

        this.sprite = {};
        this.createSprite();

        
    }

    capturaTeclas(){
        window.addEventListener('keydown', e => this.teclas[e.code] = true);
        window.addEventListener('keyup', e => this.teclas[e.code] = false);

    //    this.mouseEvent();

    }

    mouseEvent(){
         let rect = canvas.getBoundingClientRect();

        let mouseDown = false;

        window.addEventListener('mousedown', e => {            
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            this.x = x;
            this.y = y;
            mouseDown = true;
        });

        window.addEventListener('mouseup',e=>mouseDown=false);

        window.addEventListener('mousemove', e => {            
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            if(mouseDown){
                this.x = x;
                this.y = y;
            }
        });
    }

    createSprite(){        
        this.sprite = new Sprite('../img/Sprites/mario2.png');
        this.sprite.crop(spriteAnimation.sprites["mario_"+this.size]);
        this.sprite.staggerFrames = 6;

    }

    draw(){
        // ctx.fillStyle = 'orange';
        // ctx.fillRect(this.x, this.y, this.w, this.h);

        ctx.strokeStyle = 'orange';
        ctx.lineWidth = 2; 
        ctx.strokeRect(this.x, this.y, this.w, this.h);
    }

    update(deltaTime) {
        
        this.deltaTime = deltaTime;

        if(this.size == 'big'){
            this.h = 50 * 2;
        }

        this.draw();

        let animName = 'idle';

        if (this.jumping) {
            animName = 'jump';
        } else if (this.falling) {
            animName = 'fall'; 
        } else if (this.agachado) {
            animName = 'down';
        } else if (this.lookUp) {
            animName = 'up';
        } else if (this.correndo) {
            animName = 'run';
            this.sprite.staggerFrames = 3;
        } else if (this.andando) {
            animName = 'walk';
            this.sprite.staggerFrames = 4;
        } else {
            animName = 'idle';
        }
        
        this.sprite.update();

        ctx.save();

        if (this.direcao === 1) { 
            // Se sua imagem original olha para esquerda, direcao 1 (Direita) precisa de flip
            ctx.translate(this.x + this.w, this.y);
            ctx.scale(-1, 1);
            this.sprite.draw(animName, 0, 0, this.w, this.h);
        } else {
            // Direcao 0 (Esquerda) desenha normal
            this.sprite.draw(animName, this.x, this.y, this.w, this.h);
        }              
        
        ctx.restore();    
        
        if(this.noChao){ 
            this.jumping = false;  
            this.falling = false;
        } else {
            // 2. Se NÃO está no chão, determine se está subindo ou descendo
            if (this.velocidadeQueda < 0) {
                this.jumping = true;
                this.falling = false;
            } else if (this.velocidadeQueda > 0) {
                this.jumping = false; // Paramos de "pular" para começar a "cair"
                this.falling = true;
            }
        }
        

        if( this.teclas['Space'] && this.noChao ){
            if(this.noChao){
                this.jumping = true;
                this.velocidadeQueda = this.forcaDoPulo;
                this.noChao = false; 
            }
        }
        else if(this.teclas['ArrowUp'] && this.noChao){
            this.lookUp = true;
        }
        else if(this.teclas['ArrowDown'] && this.noChao){
            this.agachado = true;
        }
        else if(this.teclas['ArrowRight']){            
            this.velocidadeHorizontal += this.forcaDeAceleracao * deltaTime;
            this.andando = true;
            this.direcao = 1;
            this.estaMovendo = true;  
 
        }else if(this.teclas['ArrowLeft']){            
            this.velocidadeHorizontal -= this.forcaDeAceleracao * deltaTime;
            this.andando = true;
            this.direcao = 0;            
            this.estaMovendo = true;
        }
        else if(!this.teclas['ArrowLeft'] || 
                !this.teclas['ArrowRight'] ||
                !this.teclas['ArrowDown'] || 
                !this.teclas['ArrowUp']){
            
            this.velocidadeHorizontal *= this.friccao;
            
            if( Math.abs(this.velocidadeHorizontal) < 1 ){
                this.velocidadeHorizontal = 0;                
                this.estaMovendo = false;                
            }

            if( Math.abs(this.velocidadeHorizontal) < 100 ){
                this.correndo = false;
            }

            this.estaMovendo = false;
            this.andando = false;
            this.agachado = false;
            this.agachado = false;            
            this.lookUp = false;                            
        }

        if(Math.abs(this.velocidadeHorizontal) > (this.valocidadeMaxima)){
            this.andando = false;
            this.correndo = true;                
        }
        
        if (this.velocidadeHorizontal > this.valocidadeMaxima) this.velocidadeHorizontal = this.valocidadeMaxima;
        if (this.velocidadeHorizontal < -this.valocidadeMaxima) this.velocidadeHorizontal = -this.valocidadeMaxima;
        
        this.velocidadeQueda += this.gravidade * deltaTime;
        this.y += this.velocidadeQueda * deltaTime;
        this.x += this.velocidadeHorizontal * deltaTime;

        if( this.y > GAME_HEIGHT - this.h ){
            this.y = GAME_HEIGHT - this.h;
            this.velocidadeQueda = 0;
            this.noChao = true;            
        }
    //    this.halitarTeleporteEsquerdaDireita();
    }
    
    halitarTeleporteEsquerdaDireita(){
        if( this.x < 0 - this.w){
            this.x = GAME_WIDTH;
        }

        if( this.x > GAME_WIDTH){
            this.x = 0 - this.w;
        }
    }
}

export default Player;