
import world from '../../resorces/world.json' with {type: 'json'};
import Bloco from "./Block.js";

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

                let bloco = new Bloco(posX, posY, 50, 50);
                // bloco.createSprite('../img/Sprites/Ground_Tileset.png');
                // bloco.createSprite('../img/Sprites/blocks.webp');
                bloco.createSprite('../img/Sprites/tiles.png');
                bloco.setBlockType(world.levels.block_type[tiles[y][x]][0]);                               
                this.blocos.push(bloco);

            });

        });
       
    }

    update(deltaTime){
        this.deltaTime = deltaTime;
        this.blocos.forEach(b=>b.update());
    }

    checkCollision(player){
        this.blocos.forEach(bloco=>{
            let blockType = bloco.blockType.split('_')[0];
            
            // gnora blocos que não têm colisão (como o céu)
            if (blockType === 'sky') return;
            
            // 2. Verifica os 4 lados (AABB)
            const colidiu = player.x < bloco.x + bloco.w &&  // Lado esquerdo do player < Lado direito do bloco
                            player.x + player.w > bloco.x &&  // Lado direito do player > Lado esquerdo do bloco
                            player.y < bloco.y + bloco.h &&  // Topo do player < Base do bloco
                            player.y + player.h > bloco.y;    // Base do player > Topo do bloco

           

            if(blockType === 'ground'){

               
            }

            else if(blockType === 'question'){
                
            }
 
            if(colidiu){
                bloco.draw();
                this.resolverColisaoChao(player, bloco)
            };     
        });
    }

    resolverColisaoChao(player, bloco) {
       // 1. Calcula a distância entre os centros do Mario e do Bloco
        let centroMarioX = player.x + player.w / 2;
        let centroBlocoX = bloco.x + bloco.w / 2;
        let centroMarioY = player.y + player.h / 2;
        let centroBlocoY = bloco.y + bloco.h / 2;

        // 2. Calcula a distância combinada (metade das larguras/alturas)
        let metadesW = (player.w + bloco.w) / 2;
        let metadesH = (player.h + bloco.h) / 2;

        // 3. Diferença entre os centros
        let dx = centroMarioX - centroBlocoX;
        let dy = centroMarioY - centroBlocoY;

        // 4. Calcula o quanto eles entraram um no outro
        let overlapX = metadesW - Math.abs(dx);
        let overlapY = metadesH - Math.abs(dy);

        // 5. O eixo com MENOR overlap é o lado que colidiu primeiro
        if (overlapX < overlapY) {
            if (dx > 0) {
                // Colisão na Esquerda do Mario (Direita do Bloco)
                player.x += overlapX;
                player.valocidadeHorizontal = 0;
            } else {
                // Colisão na Direita do Mario (Esquerda do Bloco)
                player.x -= overlapX;
                player.valocidadeHorizontal = 0;
            }
        } else {
            if (dy > 0) {
                // Colisão no Topo do Mario (Base do Bloco)
                player.y += overlapY;
                player.velocidadeQueda = 0; // Para o pulo ao bater a cabeça
            } else {
                // Colisão na Base do Mario (Topo do Bloco - Ficar em pé)
                player.y -= overlapY;
                player.velocidadeQueda = 0;
                player.noChao = true;
            }
        }
    }

}

export default Level;