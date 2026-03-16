
import world from '../../resorces/world.json' with {type: 'json'};
import Bloco from "./Block.js";
import {ctx} from "./environment.js";
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
                bloco.createSprite('../img/Sprites/tiles.png');
                bloco.setBlockType(world.levels.block_type[vecReferente][0]);                               
                this.blocos.push(bloco);

            });

        });
       
    }

    update(deltaTime){
        this.deltaTime = deltaTime;
        
        this.blocos.forEach(b=>{
            b.update();
            // b.draw();
        });
    }

    checkCollision(player){       
        
        this.blocos.forEach(b=>{

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

                if (bloco.passaPorBaixo) {
                    // SÓ colide se estiver caindo e acima do topo
                    // Usamos uma margem (ex: 10px) para evitar bugs de deltaTime
                    if (player.velocidadeQueda > 0 && (player.y + player.h) <= b.y + 10) {
                        this.resolverApenasTopo(player, b);
                    }

                } else if(b.blockType == 'power_up'){
                    b.setBlockType('sky');
                    player.size = 'big';
                    player.y - 50;                  
                }else {
                    // Bloco sólido padrão
                    this.resolverColisaoCompleta(player, b);
                }
            }
            
           
        });
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

export default Level;