
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
                bloco.setBlockType(world.levels.block_type[tiles[y][x]]);               
                this.blocos.push(bloco);
            });
        });
       
    }

    update(){
        this.blocos.forEach(b=>b.update());
    }
}

export default Level;