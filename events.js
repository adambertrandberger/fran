// event : Event_() -- the unit event
class Event {
    constructor() {
        this.registered = false;
    }

    clone() {
        return new this.constructor();
    }

    trigger(time) {
        this.time = time;
    }

    register() {
        this.registered = true;
    }
    unregister() {
        this.registered = false;
    }

    // +=> : Event_alpha -> (Time -> alpha -> beta) -> Event_beta
    handle(f) {
        const oldOcc = this.occ.bind(this);

        this.occ = () => {
            const occ = oldOcc();
            return {
                time: this.time,
                val: occ.val ? lift(f(this.time, occ.val)) : null,
            };
        };
        
        return this;
    }

    // ==> : Event_alpha -> (alpha -> beta) -> Event_beta
    handleVal(f) {
        return this.handle((t, v) => f(v));
    }

    // *=> : Event_alpha -> (Time -> beta) -> Event_beta
    handleTime(f) {
        return this.handle((t, v) => f(t));
    }

    // -=> : Event_alpha -> beta -> Event_beta
    handleNone(f) {
        return this.handle((t, v) => f());
    }
}

// lbd : Time -> Event_Event_() -- an event of a unit event
class LBD extends Event {
    constructor(afterTime=0) {
        super();

        this.afterTime = afterTime;
        this.lbu = null;

        this.register();
    }

    clone() {
        return new this.constructor(this.afterTime);
    }

    register() {
        super.register();
        lbds.push(this);
    }

    unregister() {
        super.unregister();
        lbds.splice(lbds.indexOf(this), 1);
    }
    
    trigger(time) {
        if (time >= this.afterTime) {
            this.time = time;
        }
    }
    
    occ() {
        if (this.time > 0) {
            this.lbu = this.lbu ? this.lbu : new LBU();
        }
        
        return {
            time: this.time,
            val: this.lbu,
        };
    }
}

// lbu : Event_()
class LBU extends Event {
    constructor() {
        super();
        this.register();
    }

    clone() {
        return new this.constructor();
    }
    
    register() {
        super.register();
        lbus.push(this);
    }

    unregister() {
        super.unregister();
        lbus.splice(lbus.indexOf(this), 1);
    }
    
    occ() {
        return {
            time: this.time,
            val: this.time > 0,
        };
    }
}

// predicate : Behavior_Bool -> Time -> Event_()
class Predicate extends Event {
    constructor(b_bool, afterTime=0) {
        super();

        this.time = null;
        this.afterTime = afterTime;
        this.b_bool = b_bool;

        this.register();
    }

    clone() {
        return new this.constructor(this.b_bool, this.afterTime);
    }

    trigger(time) {
        if (this.time === null && time >= this.afterTime && this.b_bool.at(time)) {
            this.time = time;
        }
    }

    register() {
        super.register();
        predicates.push(this);
    }

    unregister() {
        super.unregister();
        predicates.splice(predicates.indexOf(this), 1);
    }
    
    occ() {
        return {
            time: this.time,
            val: this.time > 0 ? new Event() : null
        };
    }
}

// constEv : Time -> alpha -> Event_alpha
class ConstEv extends Predicate {
    constructor(t, val) {
        super(gte(time(), t), t-1);
        this.t = t;
        this.val = val;
    }

    clone() {
        return new this.constructor(this.t, this.val);
    }

    occ() {
        return {
            time: this.time,
            val: this.time > 0 ? this.val : null,
        };
    }
}

const event = () => new Event();
const lbd = t => new LBD(t);
const lbu = () => new LBU();
const predicate = (b_bool, t) => new Predicate(b_bool ,t);
const constEv = (t, v) => new ConstEv(t, v);
