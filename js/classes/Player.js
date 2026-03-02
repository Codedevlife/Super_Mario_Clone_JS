
import {ctx, GAME_HEIGHT, GAME_WIDTH} from "./environment.js";
import Sprite from "./Sprite.js";
import spriteAnimation from '../../resorces/world.json' with {type: 'json'};

class Player{
    constructor(x, y, w, h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;        ;

       // FÍSICA (Valores em pixels por segundo)
        this.gravidade = 3000;        
        this.velocidadeQueda = 0;        
        this.forcaDoPulo = -1000;

        this.velocidadeHorizontal = 0;        
        this.valocidadeMaxima = 600;  
        this.forcaDeAceleracao = 2000;        
        this.friccao = 0.95;

        this.noChao = false;
        this.correndo = false;
        this.andando = false;
        this.estaMovendo = false;
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
        
       
        if(this.velocidadeHorizontal < 0){
            this.direcao = 0;
        }else{
            this.direcao = 1;
        }          
        
        this.sprite.update(deltaTime);

        ctx.save();

        if(this.andando){

            if(this.direcao == 1){           
                ctx.translate(this.x + this.w, this.y);
                ctx.scale(-1,1);
                this.sprite.draw('walk', 0, 0, this.w, this.h);
            }else{
                this.sprite.draw('walk', this.x, this.y, this.w, this.h);
            }            
        }else{
            if(this.direcao == 1){           
                ctx.translate(this.x + this.w, this.y);
                ctx.scale(-1,1);
                this.sprite.draw('idle', 0, 0, this.w, this.h);
            }else{
                this.sprite.draw('idle', this.x, this.y, this.w, this.h);
            } 
        }   
        
        ctx.restore();

        if( this.teclas['Space'] && this.noChao ){
            this.velocidadeQueda = this.forcaDoPulo;
            this.noChao = false;

        }
        else if(this.teclas['ArrowRight']){
            this.velocidadeHorizontal += this.forcaDeAceleracao * deltaTime;
            this.estaMovendo = true;
            this.andando = true;
        }
        else if(this.teclas['ArrowLeft']){
            this.velocidadeHorizontal -= this.forcaDeAceleracao * deltaTime;
            this.estaMovendo = true;
            this.andando = true;
        }
        else if(!this.teclas['ArrowLeft'] || !this.teclas['ArrowRight']){
            
            if(!this.estaMovendo){
                this.velocidadeHorizontal *= this.friccao;
                // console.log(this.velocidadeHorizontal, this.friccao);
            }
            
            if( Math.abs(this.velocidadeHorizontal) < 1 ){
                this.velocidadeHorizontal = 0;                
            }
            this.estaMovendo = false;
            this.andando = false;
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