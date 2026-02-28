
import {ctx, GAME_HEIGHT, GAME_WIDTH} from "./environment.js";
import Sprite from "./Sprite.js";
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

        this.sprite = {};
        this.createSprite();
    }

    capturaTeclas(){
        window.addEventListener('keydown', e => this.teclas[e.code] = true);
        window.addEventListener('keyup', e => this.teclas[e.code] = false);
    }

    createSprite(){
        
        this.sprite = new Sprite('../img/Sprites/mario.png');

        let marioFrames =  
                {
                    "walk":{
                        "frame-0": {x:49,y:2,w:14,h:29},
                        "frame-1": {x:32,y:2,w:15,h:28},
                        "frame-2": {x:16,y:2,w:16,h:27},
                        "frame-3": {x: 0,y:2,w:16,h:27}
                    }
                };

        for( let frame in marioFrames.walk ){
            this.sprite.crop(marioFrames.walk[frame]);
        }

    }

    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    update(deltaTime) {       
        this.draw();

        this.sprite.update(deltaTime);
        this.sprite.draw(this.x, this.y, this.w, this.h);

        
    
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

export default Player;