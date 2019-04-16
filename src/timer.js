class Delay {
    constructor(f, i) {
        this.f = f;
        this.i = i;
        this.id = 0;
        this.paused = false;
        this.cancelled = false;
    }

    cancel() {
        this.cancelled = true;
    }

    pause() {
        this.paused = true;
    }

    resume() {
        this.paused = false;
    }
}

class Timeout extends Delay {
    constructor(f, i) {
        super(f, i);
        this.type = 'timeout';        
    }
}

class Interval extends Delay {
    constructor(f, i) {
        super(f, i);
        this.oi = i;
        this.type = 'interval';        
    }
}

class Timer {
    constructor() {
        this.timers = {};
        this.tid = 0;
        this.checkedAt = new Date();
    }

    tick(time) {
        const elapsed = new Date().getTime() - this.checkedAt.getTime();
        
        for (const tid in this.timers) {
            const timer = this.timers[tid];

            if (timer.cancelled) {
                delete this.timers[tid];
                continue;
            }

            if (!timer.paused) {
                timer.i -= elapsed;
                
                if (timer.i <= 0) {
                    timer.f(time);            
                    if (timer.type === 'timeout') {
                        delete this.timers[tid];
                    } else {
                        timer.i = timer.oi;
                    }
                }
            }
        }
        
        this.checkedAt = new Date();
    }

    timeout(f, i) {
        return this.add(new Timeout(f, i));
    }

    interval(f, i) {
        return this.add(new Interval(f, i));
    }
    
    add(timer) {
        const id = this.tid++;
        timer.id = id;
        return this.timers[id] = timer;
    }
}
