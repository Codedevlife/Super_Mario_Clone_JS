class Player{
    constructor(){
        this.width = 50;
        this.height = 50;
        this.x = 100;
        this.y = 300;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0.5;
        this.onGround = false;

        this.isMovingRight = false;
        this.isMovingLeft = false;
        
    }

    draw(ctx){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    drawHitbox(ctx){
        ctx.strokeStyle = 'yellow';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    move(){
        window.addEventListener('keydown', (e) => {           
            if(e.code === 'ArrowRight'){
                this.speedX = 4;  
                this.isMovingRight = true;
                this.isMovingLeft = false;
            } else if(e.code === 'ArrowLeft'){
                this.speedX = -4;
            }
        });

        this.x += this.speedX;

        // Apply gravity
        if(!this.onGround){
            this.speedY += this.gravity;
        } else {
            this.speedY = 0;
        }

        this.y += this.speedY;

        // Simple ground collision
        if(this.y + this.height >= 550){
            this.y = 550 - this.height;
            this.onGround = true;
        } else {
            this.onGround = false;
        }
    }
   
    update(){
        
    }
}

export default Player;