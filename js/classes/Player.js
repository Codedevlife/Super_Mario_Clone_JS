class Player{
    constructor(ctx, px, py, w, h){
        this.ctx = ctx;
        this.postionX = px;
        this.postionY = py;
        this.width = w;
        this.height = h;

        this.marioSprite = new Image();
        this.marioSprite.src = '../../img/Sprites/mario.png';
    }

    draw(){
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.postionX, this.postionY, this.width, this.height)
    }

    animation(){
        this.ctx.drawImage(this.marioSprite, 0, 0, 16, 30, this.postionX, this.postionY, this.width, this.height);
    }}

export default Player;