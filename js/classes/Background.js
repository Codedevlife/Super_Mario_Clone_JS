
class Background {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        
        ctx.fillStyle = 'skyblue';
        ctx.fillRect(0, 0, this.width, this.height);
    }
}

export default Background;