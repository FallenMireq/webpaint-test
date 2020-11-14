export class HistoryEntry {
    constructor(data) {
        this.options = data.options;
    }

    applyOptions(ctx) {
        ctx.lineWidth = this.options.thickness;
        ctx.fillStyle = this.options.color;
        ctx.strokeStyle = this.options.color;
    }

    draw(ctx) {
        ctx.save();
        this.applyOptions(ctx);
        this._draw(ctx);
        ctx.restore();
    }

    _draw() {
        throw new Error('Not implemented!');
    }

    toJSON() {
        return { options };
    }
}
