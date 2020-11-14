import { EventEmitter } from '../EventEmitter.js';

export class StashLayer extends EventEmitter {
    constructor(canvas, pictureLayer) {
        super();
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.pictureLayer = pictureLayer;
        this.history = [];
    }

    add(entry) {
        this.history.push(entry);
        entry.draw(this.ctx);
    }

    undo() {
        this.history.pop();
        this.clearCanvas();
        this.history.forEach((entry) => entry.draw(this.ctx));
    }

    commit() {
        this.pictureLayer.drawImage(this.canvas);
        this.clear();
    }

    clear() {
        this.clearCanvas();
        this.history = [];
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
