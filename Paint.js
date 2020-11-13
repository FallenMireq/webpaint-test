import { EventEmitter } from './EventEmitter.js';

export class Paint extends EventEmitter {
    /** @param {HTMLCanvasElement} canvas */
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.ctx.lineCap = 'round';

        this.setColor('#000');
        this.setThickness(5);
    }

    setThickness(thickness) {
        if (this.thickness !== thickness) {
            this.thickness = thickness;
            this.ctx.lineWidth = this.thickness;
            this.trigger('thickness', this.thickness);
        }
    }

    setColor(color) {
        if (this.color !== color) {
            this.color = color;
            this.ctx.fillStyle = this.color;
            this.ctx.strokeStyle = this.color;
            this.trigger('color', this.color);
        }
    }

    line(x1, y1, x2, y2) {
        this.ctx.beginPath();
        this.ctx.moveTo(x1, y1);
        this.ctx.lineTo(x2, y2);
        this.ctx.stroke();
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
            }
            img.src = dataUrl;
        });
    }

    async toLocalStorage(key = 'webpaint.image') {
        let data = this.getDataUrl();
        localStorage.setItem(key, data);
        return this;
    }

    async fromLocalStorage(key = 'webpaint.image') {
        let dataUrl = localStorage.getItem(key);
        if (dataUrl) {
            await this.putDataUrl(dataUrl);
        }
        return this;
    }
}
