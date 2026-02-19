class Player{
    constructor(px, py, w, h){        
        this.postionX = px;
        this.postionY = py;
        this.width = w;
        this.height = h;

        this.marioSprite = new Image();
        this.marioSprite.src = '../../img/Sprites/mario.png';

        this.keyPressed = {
            
        }

        this.gravity = 8;
        this.isJumping = false;
    }

    draw(ctx){        
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.postionX, this.postionY, this.width, this.height)
    }
    
    movement(canvas, deltaTime){
        this.postionY += this.gravity;

        if( this.postionY > canvas.height - this.height){
            this.postionY = canvas.height - this.height;
        }

        window.addEventListener('keydown', e=>{
            console.log(e)
        })
    }

    spriteAnimation(ctx){
        let args = [
            this.marioSprite, //Image Sprite

            49, //sx
            0, //sy
            15, //sWidth
            30, //sHeight

            this.postionX, //dx
            this.postionY, //dy
            this.width, //dWidth
            this.height//dHeight
        ];
        ctx.drawImage(...args);
    }}

export default Player;