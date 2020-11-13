import { EventEmitter } from './EventEmitter.js';

export class Paint extends EventEmitter {
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

    save() {
        let imageData = this.ctx.getImageData(0, 0, 300, 150);
        console.log(imageData.data);
    }
}
