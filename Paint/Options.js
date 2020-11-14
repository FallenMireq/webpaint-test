import { EventEmitter } from '../EventEmitter.js';

export class Options extends EventEmitter {
    constructor(options = {}) {
        super();
        this._options = {
            thickness: 1,
            color: '#000',
            ...options
        }
    }

    get thickness() {
        return this._options.thickness;
    }

    get color() {
        return this._options.color;
    }

    setThickness(thickness) {
        if (this._options.thickness !== thickness) {
            this._options.thickness = thickness;
            this.trigger('thickness', this._options.thickness);
            this.trigger('update', this._options);
        }
    }

    setColor(color) {
        if (this._options.color !== color) {
            this._options.color = color;
            this.trigger('color', this._options.color);
            this.trigger('update', this._options);
        }
    }
}
