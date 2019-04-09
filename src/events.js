// event : Event_() -- the unit event
class Event {
    constructor(af) {
        this.a = af(this.update.bind(this)).seq((() => {
            this.a.run();
        }).lift());
        this.a.run();
        this.b = null;

        /*
          a.call(null, new Progress(true), b => {
          this.b = lift(this.handler(b));
          }, err => { throw err; });
        */
    }

    update(val) {
        this.b = lift(val);
    }

    clone() {
        return new this.constructor();
    }

    val() { // the value part of `occ`
        return this.b;
    }

    occ(time) {
        return [this.time, this.val()];
    }
}

// lbd : Time -> Event_Event_() -- an event of a unit event
class LBD extends Event {
    constructor(afterTime=0) {
        super();

        this.afterTime = afterTime;
        this.lbu = null;

        lbds.push(this);
    }

    clone() {
        return new this.constructor(this.afterTime);
    }

    occ() {
        if (this.time > 0) {
            this.lbu = this.lbu ? this.lbu : new LBU();
        }
        
        return [this.time, this.lbu];
    }
}

// lbu : Event_()
class LBU extends Event {
    constructor() {
        super();

        lbus.push(this);
    }

    clone() {
        return new this.constructor();
    }

    occ() {
        return [this.time, this.time > 0];
    }
}

// predicate : Behavior_Bool -> Time -> Event_()
class Predicate extends Event {
    constructor(b_bool, afterTime=0) {
        super();

        this.time = null;
        this.afterTime = afterTime;
        this.b_bool = b_bool;

        predicates.push(this);
    }

    clone() {
        return new this.constructor(this.b_bool, this.afterTime);
    }

    occ() {
        return [this.time, this.time > 0 ? new Event() : null];
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
        return [this.time, this.time > 0 ? this.val : null];
    }
}

const event = a => new Event(a);
const lbd = (t=0) => new LBD(t);
const lbu = () => new LBU();
const predicate = (b_bool, t=0) => new Predicate(b_bool, t);
const constEv = (t, v) => new ConstEv(t, v);
