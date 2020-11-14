import { Brush } from './Brush.js';

export class ToolFactory {
    static getTool(type, canvas) {
        switch (type) {
            case 'brush':
                return new Brush(canvas);
            default:
                throw new Error('Invalid tool');
        }
    }
}
