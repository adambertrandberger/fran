class Event {
    constructor(arrow) {
        const arrowRef = arrow(this.update.bind(this));
        arrowRef.run();
        
        this.callbacks = [];
    }

    update(...vals) {
        for (const callback of this.callbacks) {
            callback(...vals);
        }
    }
}
