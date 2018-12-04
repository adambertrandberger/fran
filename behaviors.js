class Behavior {
    constructor(f) {
        this.f = f|| (t => t);
        this.isBehavior = true;
    }

    transform(time) {
        return time;
    }

    value(time) {
        return this.f(time);
    }

    behavior(time) {
        return this;
    }

    at(time) {
        time = this.transform(time);
        return [this.value(time), this.behavior(time)];
    }
}

class BehaviorCombinator extends Behavior {
    constructor(...bs) {
        super();
        this.bs = bs.map(lift);
        this.vs = [];
    }

    behavior(time) {
        return new this.constructor(...this.bs);
    }
    
    at(time) {
        time = this.transform(time);
        
        this.vs = [];
        // assign values and behaviors
        for (let i=0; i<this.bs.length; ++i) {
            const b = this.bs[i].at(time);
            this['v' + i] = b[0];
            this['b' + i] = this.bs[i] = b[1];

            this.vs.push(b[0]);
        }
        
        return [this.value(time), this.behavior(time)];
    }
}

function comb(name, vf) {
    window[name] = class extends BehaviorCombinator {
        value(time) {
            return vf(...this.vs);
        }
    };

    window[name.toLowerCase()] = (...args) => new window[name](...args);
}

class ConstantBehaviorCombinator extends BehaviorCombinator {
    // takes behaviors then at the end should be a constant
    constructor(...args) {
        const c = args.splice(args.length - 1)[0];
        super(...args);
        this.c = c;
    }

    behavior(time) {
        return new this.constructor(...(this.bs.concat(this.c)));
    }
}

function ccomb(name, vf) {
    window[name] = class extends ConstantBehaviorCombinator {
        value(time) {
            return vf(...this.vs.concat([this.c]));
        }
    };

    window[name.toLowerCase()] = (...args) => new window[name](...args);    
}

comb('AddV', (v1, v2) => v1.add(v2));
comb('SubV', (v1, v2) => v1.sub(v2));
comb('MulV', (v1, v2) => v1.mul(v2));
comb('DivV', (v1, v2) => v1.div(v2));

comb('AddB', (v1, v2) => v1 + v2);
comb('SubB', (v1, v2) => v1 - v2);
comb('MulB', (v1, v2) => v1 * v2);
comb('DivB', (v1, v2) => v1 / v2);

comb('Sin', v1 => Math.sin(v1));
comb('Cos', v1 => Math.cos(v1));

comb('Abs', v1 => Math.abs(v1));
comb('Comp', v1 => -this.v1);

comb('Squared', v1 => v1*v1);
comb('Cubed', v1 => v1*v1*v1);

ccomb('GT', (v1, c) => v1 > c);
ccomb('LT', (v1, c) => v1 < c);
ccomb('GTE', (v1, c) => v1 >= c);
ccomb('LTE', (v1, c) => v1 <= c);
ccomb('Eq', (v1, c) => v1 == c);

ccomb('Add', (v1, c) => v1 + c);
ccomb('Sub', (v1, c) => v1 - c);
ccomb('Mul', (v1, c) => v1 * c);
ccomb('Div', (v1, c) => v1 / c);

class Later extends ConstantBehaviorCombinator {
    transform(time) {
        return time - this.ms;
    }
}

class UntilB extends ConstantBehaviorCombinator {
    at(time) {
        const occ = this.c.occ();

        if (occ[0] == null || time <= occ[0]) {
            return this.c.at(time);
        } else {
            return occ[1].at(time);
        }
    }
}

class Transform extends Behavior {
    constructor(b, f) {
        super();
        this.f = f;
        this.b = b;
    }

    at(time) {
        return [this.f(this.b.at(time)[0]), this];
    }
}

class Time extends Behavior {}

class Mouse extends Behavior {
    constructor() {
        super();
        this.pos = new Vector(0, 0);
    }
    
    value(time) {
        const mouseAtStep = currentMouse;
        const delay = window.loopTime-time;

        timeout(() => {
            this.pos = mouseAtStep;
        }, delay);

        return this.pos;
    }
}

class MouseX extends Mouse {
    value(time) {
        return super.value(time).x;
    }
}

class MouseY extends Mouse {
    value(time) {
        return super.value(time).y;
    }
}

// Wrong -- must use new way
class Cond extends Behavior {
    constructor(b, pred, then, other) {
        this.b = b;
        this.pred = pred;
        this.then = then;
        this.other = other;
    }

    at(time) {
        if (this.pred(this.b.at(time))) {
            return [this.then, this];
        } else {
            return [this.other, this];
        }
    }
}

// could be improved
class AccelMouse extends Behavior {
    constructor(scalar) {
        super();
        
        const topSpeed = 5;        
        let position = new Vector();
        let velocity = new Vector();
        
        this.b = transform(mouse(), i => {
            const mouse = new Vector(i.x, i.y);
            let desired = mouse.sub(position);

            const d = desired.mag();
            desired = desired.inorm();

            let acceleration = desired.mul(scalar);

            velocity = velocity.add(acceleration).limit(topSpeed);
            position = position.add(velocity);

            return position;
        });
    }

    value(time) {
        return this.b.at(time)[0];
    }
}

// should be improved
class GoToMouse extends Behavior {
    constructor(scalar) {
        super();
        const topSpeed = 1;
        
        let position = new Vector();
        let velocity = new Vector();
        
        this.b = transform(mouse(), i => {
            let mouse = new Vector(i.x, i.y);
            let direction = mouse.isub(position).inorm();

            const acceleration = direction.mul(scalar);

            velocity = velocity.add(acceleration).limit(topSpeed);
            position = position.add(velocity);
            
            return position;
        });
    }

    value(time) {
        return this.b.at(time)[0];
    }
}

function lift(term) {
    if (term.isBehavior) {
        return term; // assume its a behavior already
    }
    if (typeof term !== 'function') {
        return new Behavior(t => term);
    }
    return new Behavior(term);
}

const at = (b, t) => lift(b).at(t);
const later = (b, ms) => new Later(b, ms);
const time = () => new Time();
const cond = (b, c, then, other) => new Cond(b, c, then, other);
const transform = (b, f) => new Transform(b, f);
const mouseX = () => new MouseX();
const mouseY = () => new MouseY();
const mouse = () => new Mouse();
const accelMouseX = a => new AccelMouseX(a);
const accelMouseY = a => new AccelMouseY(a);
const accelMouse = a => new AccelMouse(a);
const goToMouse = a => new GoToMouse(a);
const verlet = a => new Verlet(a);
const untilB = (b, e) => new UntilB(b, e);
const neg = comp; // alias
