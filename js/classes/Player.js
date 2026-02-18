class Player{
    constructor(px, py, w, h){        
        this.postionX = px;
        this.postionY = py;
        this.width = w;
        this.height = h;

        this.marioSprite = new Image();
        this.marioSprite.src = '../../img/Sprites/mario.png';

        this.keyPressed = {
            "Space": false,
            "ArrowLeft": false,
            "ArrowRight": false,
        }

        this.gravity = 8;
        this.isJumping = false;
    }

    draw(ctx){        
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.postionX, this.postionY, this.width, this.height)
    }
    
    movement(canvas){

        
        window.addEventListener('keydown', e=>{
           
            
            if(e.code == "Space"){
                this.postionY -= 1
            }
            // else if(e.code == "ArrowLeft"){
            //     this.postionX -= 10;    
            // }
            // else if(e.code == "ArrowRight"){
            //     this.postionX += 10;    
            // }

            

        });

        window.addEventListener('keyup', e=>{
          
        });

        // this.postionY += this.gravity;    

        // if(this.postionY + this.width > canvas.height){
        //     this.postionY = canvas.height - this.height;
        // }
    }

    animation(ctx){
        let args = [
            this.marioSprite, //Image Sprite

            0, //sx
            0, //sy
            16, //sWidth
            30, //sHeight

            this.postionX, //dx
            this.postionY, //dy
            this.width, //dWidth
            this.height //dHeight
        ];
        ctx.drawImage(...args);
    }}

export default Player;