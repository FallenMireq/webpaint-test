import { Tool } from './Tool.js';
import { LineHistoryEntry } from '../History/LineHistoryEntry.js';

export class Brush extends Tool {
    constructor(canvas) {
        super(canvas);
        this.setOptions();
        this.path = [];
    }

    setOptions(options) {
        super.setOptions({
            thickness: 1,
            color: '#000',
            ...(options || {}),
        });
    }

    start(x, y) {
        this.path = [x, y];
        this.redraw();
    }

    move(x, y) {
        if (this.pointChanged(x, y)) {
            this.path.push([x, y]);
            this.redraw();
        }
    }

    stop(x, y) {
        if (this.pointChanged(x, y)) {
            this.path.push([x, y]);
        }

        this.trigger(
            'entry',
            this.getEntry()
        );

        this.trigger('clear');
    }

    redraw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        let entry = this.getEntry();
        entry?.draw(this.ctx);
    }

    getEntry() {
        if (this.path.length === 0) {
            return null;
        }

        return new LineHistoryEntry({
            options: {
                thickness: this.options.thickness,
                color: this.options.color,
            },
            path: this.path,
        });
    }

    pointChanged(x, y) {
        const lastPoint = this.path[this.path.length - 1];
        return lastPoint[0] !== x || lastPoint[1] !== y;
    }
}
