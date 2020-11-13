export class EventEmitter {
    constructor() {
        this.handlers = new Map();
    }

    on(event, fn) {
        let handlers = this.handlers.get(event);
        if (!handlers) {
            handlers = [];
            this.handlers.set(event, handlers);
        }
        
        handlers.push(fn);
        return this;
    }

    off(event, fn) {
        let handlers = this.handlers.get(event);
        if (handlers) {
            let index = handlers.indexOf(fn);
            handlers.splice(index, 1);
        }
        
        return this;
    }

    trigger(event, data) {
        let handlers = this.handlers.get(event);
        if (handlers) {
            handlers.forEach(fn => fn(data));
        }
        
        return this;
    }
}

export function CanEmitEvents(target) {
    class Proxy extends target {
        constructor(...args) {
            super(...args);
            this._ee = new EventEmitter();
        }

        on(event, fn) {
            this._ee.on(event, fn);
        }

        off(event, fn) {
            this._ee.off(event, fn);
        }

        trigger(event, data) {
            this._ee.trigger(event, data);
        }
    }

    Proxy.name = target.name;
    return Proxy;
}
