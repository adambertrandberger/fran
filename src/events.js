// event : Event_() -- the unit event
class Event {
    constructor(af) {
        this.af = af;
        this.a = af(this.update.bind(this)).seq((() => {
        }).lift());
        this.a.run();
        this.b = null;
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
const predicate = (b_bool, t=0) => new Predicate(b_bool, t);
const constEv = (t, v) => new ConstEv(t, v);
