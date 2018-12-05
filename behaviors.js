class Behavior {
    constructor(f) {
        this.f = f;
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

function BehaviorCombinator(arity=0) {
    return class extends Behavior {
        constructor(...args) {
            super();
            
            const as = args.splice(args.length - arity);
            this.as = as;
            for (let i=0; i<this.as.length; ++i) {
                this['a' + i] = this.as[i];
            }
            
            this.bs = args.map(lift);
            this.vs = [];
        }

        behavior(time) {
            return new this.constructor(...this.bs.concat(this.as));
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
    };
}

function createBCFunctions(n=10) {
    for (let i=0; i<n; ++i) {
        window['bc' + i] = function (name, valueFunction) {
            window[name] = class extends BehaviorCombinator(i) {
                value(time) {
                    return valueFunction(...this.vs.concat(this.as));
                }
            };

            window[name.toLowerCase()] = (...args) => new window[name](...args);
        };
    }
    window.bc = window.bc0; // alias
}
createBCFunctions();

bc0('AddV', (v1, v2) => v1.add(v2));
bc0('SubV', (v1, v2) => v1.sub(v2));
bc0('MulV', (v1, v2) => v1.mul(v2));
bc0('DivV', (v1, v2) => v1.div(v2));

bc0('AddB', (v1, v2) => v1 + v2);
bc0('SubB', (v1, v2) => v1 - v2);
bc0('MulB', (v1, v2) => v1 * v2);
bc0('DivB', (v1, v2) => v1 / v2);

bc0('Sin', v1 => Math.sin(v1));
bc0('Cos', v1 => Math.cos(v1));

bc0('Abs', v1 => Math.abs(v1));
bc0('Comp', v1 => -this.v1);

bc0('Squared', v1 => v1*v1);
bc0('Cubed', v1 => v1*v1*v1);

bc1('GT', (v1, a1) => v1 > a1);
bc1('LT', (v1, a1) => v1 < a1);
bc1('GTE', (v1, a1) => v1 >= a1);
bc1('LTE', (v1, a1) => v1 <= a1);
bc1('Eq', (v1, a1) => v1 == a1);

bc1('Add', (v1, a1) => v1 + a1);
bc1('Sub', (v1, a1) => v1 - a1);
bc1('Mul', (v1, a1) => v1 * a1);
bc1('Div', (v1, a1) => v1 / a1);

class Later extends BehaviorCombinator() {
    transform(time) {
        return time - this.ms;
    }
}

class UntilB extends BehaviorCombinator() {
    value(time) {
        const occ = this.c.occ();

        if (occ[0] == null || time <= occ[0]) {
        } else {
            this.b1 = occ[1];
        }
        
        return time;
    }
}

class Transform extends BehaviorCombinator() {
    value(time) {
        return this.c(this.v1);
    }
}

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
const time = () => new Behavior(t => t);
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
