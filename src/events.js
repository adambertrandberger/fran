class Event {
    constructor(id, arrow, cache) {
        this.arrow = arrow(this.update.bind(this));
        this.id = id;
        this.cache = cache;
    }

    update(...vals) {
        this.cache(...vals);
    }
}
