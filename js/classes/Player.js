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

        this.sprite = new Image();
        this.sprite.src = '../../img/mario.png';
        
    }

    draw(ctx){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height,);
    }

    drawsprite(ctx){
        // Placeholder for sprite drawing logic
        ctx.drawImage(this.sprite, 165, 0, 20, 20, this.x, this.y, 50, 50);
    }

    drawHitbox(ctx){
        ctx.strokeStyle = 'yellow';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    move({GAME_WIDTH, GAME_HEIGHT}){
        window.addEventListener('keydown', (e) => {           
            if(e.code === 'ArrowRight'){
                this.speedX = 4;  
                this.isMovingRight = true;
                this.isMovingLeft = false;
            } else if(e.code === 'ArrowLeft'){
                this.speedX = -4;
            }

            if(e.code === 'Space' && this.onGround){
                this.speedY = -150;
                console.log('Jump!');
            }
        });

        this.x += this.speedX;
        this.y += this.speedY;

        window.addEventListener('keyup', (e) => {
            if(e.code === 'ArrowRight' || e.code === 'ArrowLeft'){
                this.speedX = 0;
                this.isMovingRight = false;
                this.isMovingLeft = false;
            }
        });



        // Apply gravity
        if(!this.onGround){
            this.speedY += this.gravity;
        } else {
            this.speedY = 0;
        }

        this.y += this.speedY;

        // Simple ground collision
        if(this.y + this.height >= GAME_HEIGHT - 50){
            this.y = GAME_HEIGHT - 50 - this.height;
            this.onGround = true;
        } else {
            this.onGround = false;
        }
    }

    collision(objects){
        objects.forEach(object => {
            if(this.x < object.x + object.width &&  
               this.x + this.width > object.x &&
               this.y < object.y + object.height &&
               this.y + this.height > object.y) {
                console.log('Collision detected with an object!');
            }
        });
    }

    update(){
        
    }
}

export default Player;