import { HistoryEntry } from './HistoryEntry.js';

export class LineHistoryEntry extends HistoryEntry {
    constructor(data) {
        super(data);
        this.path = data.path;
    }

    applyOptions(ctx) {
        super.applyOptions(ctx);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
    }

    _draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.path[0][0], this.path[0][1]);
        for (let i = 1; i < this.path.length; i++) {
            ctx.lineTo(this.path[i][0], this.path[i][1]);
        }
        if (this.path.length === 1) {
            ctx.lineTo(this.path[0][0], this.path[0][1]);
        }
        ctx.stroke();
    }

    toJSON() {
        return {
            ...super.toJSON(),
            type: 'line',
            path: this.path,
        };
    }
}
