class ExternalEvent {
    constructor(id, arrow, cache) {
        this.arrow = arrow(this.update.bind(this));
        this.id = id;
        this.cache = cache;
    }

    update(...vals) {
        this.cache(...vals);
    }
}

class InternalEvent {
    constructor(id, emitter) {
        // Emitter is a function that returns the new value for behaviors
        this.id = id;
        this.emitter = emitter;
    }
}
