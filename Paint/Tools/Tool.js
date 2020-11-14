import { EventEmitter } from '../../EventEmitter.js';

export class Tool extends EventEmitter {
    constructor(canvas) {
        super();
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.options = {};
    }

    setOptions(options) {
        this.options = options;
    }

    start(x, y) {
        throw new Error('Not implemented');
    }

    move(x, y) {
        throw new Error('Not implemented');
    }

    stop(x, y) {
        throw new Error('Not implemented');
    }

    redraw() {
        throw new Error('Not implemented');
    }
}
