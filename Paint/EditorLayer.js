import { EventEmitter } from '../EventEmitter.js';
import { ToolFactory } from './Tools/ToolFactory.js';

export class EditorLayer extends EventEmitter {
    constructor(canvas, stashLayer, options) {
        super();
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.save();
        this.stashLayer = stashLayer;

        this.tool = null;
        this._onentry = (entry) => {
            this.stashLayer.add(entry);
        };
        this._onclear = () => {
            this.clear();
        };

        options.on('update', options => this.tool?.setOptions(options));
    }

    setOptions(options) {
        this.tool?.setOptions(options);
    }

    setTool(type) {
        this.tool?.off('entry', this._onentry);
        this.tool?.off('clear', this._onclear);
        this.ctx.restore();

        this.ctx.save();
        this.tool = ToolFactory.getTool(type, this.canvas);
        this.tool.on('clear', this._onclear);
        this.tool.on('entry', this._onentry);
    }

    start(x, y) {
        this.tool?.start(x, y);
    }

    move(x, y) {
        this.tool?.move(x, y);
    }

    stop(x, y) {
        this.tool?.stop(x, y);
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
