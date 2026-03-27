
import world from '../../resorces/world.json' with {type: 'json'};
import Bloco from "./Block.js";
import {ctx} from "./environment.js";
import Player from './Player.js';
class Level{
    constructor(){
        this.levels = world.levels;        
        this.blocos = [];
        
    }

    loadLevel(level){
        let tiles = this.levels[level].tiles;
        
        tiles.forEach((line, y) => {            
            
            line.forEach((collum, x)=>{

                let posX = x * 50;
                let posY = y * 50;                
                let vecReferente = tiles[y][x];               
                
                let bloco = new Bloco(posX, posY, 50, 50);
                bloco.positionMatrixReferente = vecReferente;
                // bloco.createSprite('../img/Sprites/tiles.png');
                bloco.createSprite('../img/Sprites/tiles_.png');
                bloco.setBlockType(world.levels.block_type[vecReferente][0]);                               
                this.blocos.push(bloco);

            });

        });
       
    }

    update(deltaTime){
        this.deltaTime = deltaTime;
        
        this.blocos.forEach(b=>{
            b.update();
            b.draw();
        });
    }

    checkCollision(player){       
        
        this.blocos.forEach(b=>{

            // console.log(b.blockType.split('_'));
           
            if (b.blockType === 'sky') return;

            const colidiu = player.x < b.x + b.w &&
                        player.x + player.w > b.x &&
                        player.y < b.y + b.h &&
                        player.y + player.h > b.y;
            

            let bloco = world.levels.block_type[b.positionMatrixReferente][1];

            if (colidiu) {
                // player.valocidadeHorizontal = 0;
                 b.drawCollision();
                
                if(bloco.semColisao) return;

                if(!b.blockType.includes("angle") &&
                    b.blockType.includes("ground")                   
                    ){                                      
                    this.resolverColisaoCompleta(player, b);

                } else if(b.blockType.includes("angle")){ 

                    this.checkSlopeCollision(player, b);
                } else {
                    this.resolverColisaoCompleta(player, b);
                }
            }
            
           
        });
    }

    checkSlopeCollision(player, bloco) {
        player.noChao = true;
        // let altura_desejada = (b.y - b.h) + (b.x - (player.x+player.w));
        // player.y = altura_desejada;
        // player.noChao = true;
        // player.velocidadeQueda = 0;

        // 1. Calcula a posição horizontal do CENTRO do Mario dentro do bloco (0 a 16)
        // Usamos o centro (w/2) para que ele não fique "manco" ao subir
        let centroMarioX = player.x + (player.w / 2);
        let posicaoRelativaX = centroMarioX - bloco.x;

        // 2. Limita o valor entre 0 e a largura do bloco (16) para evitar erros nas bordas
        posicaoRelativaX = Math.max(0, Math.min(posicaoRelativaX, bloco.w));

        // 3. Cálculo da Altura do Chão (Y Alvo)
        // Em 45°, para cada 1px em X, subimos ou descemos 1px em Y.
        let yAlvo;

        if (bloco.blockType.includes("angle")) { 
            // Rampa que SOBE da esquerda para a direita ( / )
            yAlvo = (bloco.y + bloco.h) - posicaoRelativaX;
        } else { 
            // Rampa que DESCE da esquerda para a direita ( \ )
            yAlvo = bloco.y + posicaoRelativaX;
        }

        // 4. RESOLUÇÃO: Se os pés do Mario passarem do yAlvo, ele está no chão
        if (player.y + player.h >= yAlvo) {
            player.y = yAlvo - player.h; // "Snap" no chão da rampa
            player.velocidadeQueda = 0;   // Zera a gravidade
            player.noChao = true;         // Permite pular
            
            // BÔNUS: Força de deslize (Gravidade lateral na rampa)
            // Se o jogador não estiver apertando nada, ele escorrega
            if (!player.estaMovendo) {
                let forcaDeslize = 150; 
                if (bloco.blockType.includes("angle")) {
                    player.velocidadeHorizontal -= forcaDeslize * player.deltaTime;
                } else {
                    player.velocidadeHorizontal += forcaDeslize * player.deltaTime;
                }
            }
        }
    }

    resolverApenasTopo(player, bloco) {
        // 1. Ajuste de Posição
        // Coloca os pés do Mario exatamente no topo do bloco
        player.y = bloco.y - player.h;

        // 2. Ajuste de Física
        // Zera a velocidade de queda para ele não continuar "atravessando"
        player.velocidadeQueda = 0;

        // 3. Estado
        // Avisa que ele está seguro para pular novamente
        player.noChao = true;
    }

    resolverColisaoCompleta(player, bloco) {
       // 1. Encontrar os centros
        let centroMarioX = player.x + player.w / 2;
        let centroBlocoX = bloco.x + bloco.w / 2;
        let centroMarioY = player.y + player.h / 2;
        let centroBlocoY = bloco.y + bloco.h / 2;

        // 2. Calcular distâncias e sobreposição (overlap)
        let dx = centroMarioX - centroBlocoX;
        let dy = centroMarioY - centroBlocoY;
        let overlapX = (player.w + bloco.w) / 2 - Math.abs(dx);
        let overlapY = (player.h + bloco.h) / 2 - Math.abs(dy);

        // 3. Resolver pelo eixo de menor penetração
        if (overlapX < overlapY) {
            // Colisão Lateral
            if (dx > 0) {
                player.x += overlapX; // Empurra para a direita
            } else {
                player.x -= overlapX; // Empurra para a esquerda
            }
            player.valocidadeHorizontal = 0; // Para o movimento lateral
        } else {
            // Colisão Vertical
            if (dy > 0) {
                // Bateu a cabeça (embaixo do bloco)
                player.y += overlapY;
                player.velocidadeQueda = 0; // Começa a cair imediatamente
            } else {
                // Pousou no topo (em cima do bloco)
                player.y -= overlapY;
                player.velocidadeQueda = 0;
                player.noChao = true;
            }
        }
    }  
}

export default Level;;