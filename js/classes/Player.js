
import {ctx, GAME_HEIGHT, GAME_WIDTH} from "./environment.js";
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

        this.velocidadeHorizontal = 0;        
        this.valocidadeMaxima = 800;  
        this.forcaDeAceleracao = 2000;        
        this.friccao = 0.95;

        this.noChao = false;
        this.correndo = false;
        this.andando = false;
        this.estaMovendo = false;
        this.agachado = false;
        this.direcao = 1; // 1 - apontado para direita / 0-apontado para esquerda
       
        // Controle de teclas
        this.teclas = {};
        this.capturaTeclas();

        this.sprite = {};
        this.createSprite();
    }

    capturaTeclas(){
        window.addEventListener('keydown', e => this.teclas[e.code] = true);
        window.addEventListener('keyup', e => this.teclas[e.code] = false);
    }

    createSprite(){      
        this.sprite = new Sprite('../img/Sprites/mario.png');
        this.sprite.crop(spriteAnimation.sprites.mario);
    }

    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    update(deltaTime) {
        this.draw();
        // console.log(this.teclas)
        // this.direcao = (this.velocidadeHorizontal < 0) ? 0 : 1;

        let animName = 'idle';

        if (!this.noChao) {
            // Se não está no chão, a prioridade máxima é o pulo
            animName = 'jump';
        } else if (this.andando) {
            // Se está no chão e a carregar nas teclas, anda
            animName = 'walk';
        } else if (this.correndo){
            // Se está no chão e a carregar nas teclas, anda
            animName = 'run';

        } else if (this.agachado) {
            // Se está no chão e a carregar nas teclas, anda
            animName = 'down';
        } else {
            // Se está no chão e parado, fica em idle
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

        if( this.teclas['Space'] && this.noChao ){
            this.velocidadeQueda = this.forcaDoPulo;
            this.noChao = false;        
        }
        else if(this.teclas['ArrowDown'] && this.noChao){
            this.agachado = true;            
        }
        else if(this.teclas['ArrowRight']){
            this.velocidadeHorizontal += this.forcaDeAceleracao * deltaTime;
            this.andando = true;
            this.direcao = 1;          
 
        }else if(this.teclas['ArrowLeft']){
            this.velocidadeHorizontal -= this.forcaDeAceleracao * deltaTime;
            this.andando = true;
            this.direcao = 0;
        }
        else if(!this.teclas['ArrowLeft'] || 
                !this.teclas['ArrowRight'] ||
                !this.teclas['ArrowDown'] ){
            
            this.velocidadeHorizontal *= this.friccao;
            
            if( Math.abs(this.velocidadeHorizontal) < 100 ){
                this.correndo = false;
            }

            if( Math.abs(this.velocidadeHorizontal) < 1 ){
                this.velocidadeHorizontal = 0;                
            }

            this.estaMovendo = false;
            this.andando = false;
            this.agachado = false;            
                        
        }

        if(Math.abs(this.velocidadeHorizontal) > 700 && this.teclas['ShiftLeft']){
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

        if( this.x < 0 - this.w){
            this.x = GAME_WIDTH;
        }

        if( this.x > GAME_WIDTH){
            this.x = 0 - this.w;
        }
    }  
}

export default Player;