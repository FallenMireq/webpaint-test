import { EventEmitter } from '../EventEmitter.js';
import { EditorLayer } from './EditorLayer.js';
import { Options } from './Options.js';
import { PictureLayer } from './PictureLayer.js';
import { StashLayer } from './StashLayer.js';

export class Paint extends EventEmitter {
    constructor(pictureLayerCanvas, stashLayerCanvas, editorLayerCanvas, options) {
        super();
        this.options = new Options(options);
        this.pictureLayer = new PictureLayer(pictureLayerCanvas);
        this.stashLayer = new StashLayer(stashLayerCanvas, this.pictureLayer);
        this.editorLayer = new EditorLayer(editorLayerCanvas, this.stashLayer, this.options);
    }

    commitStash() {
        this.stashLayer.commit();
    }

    async toLocalStorage(key = 'webpaint.image') {
        let data = this.pictureLayer.getDataUrl();
        localStorage.setItem(key, data);
        return this;
    }

    async fromLocalStorage(key = 'webpaint.image') {
        let dataUrl = localStorage.getItem(key);
        if (dataUrl) {
            await this.pictureLayer.putDataUrl(dataUrl);
        }
        return this;
    }
}
