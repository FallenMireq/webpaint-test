export class PictureLayer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    }

    drawImage(img) {
        this.ctx.drawImage(img, 0, 0);
    }

    getDataUrl() {
        return this.canvas.toDataURL('image/png', 1);
    }

    putDataUrl(dataUrl) {
        return new Promise((resolve) => {
            let img = new Image();
            img.onload = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(img, 0, 0);
                resolve();
            };
            img.src = dataUrl;
        });
    }
}
