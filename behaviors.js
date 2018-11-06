class Behavior {
    constructor(f) {
        this.f = f || (t => 0);
        this.isBehavior = true;
    }

    at(time) {
        return new Tuple(this.f(time), this);
    }
}

class BehaviorCombinator extends Behavior {
    constructor(b) {
        super();
        this.b = b;
    }
    
    at(time) {
        return new Tuple(this.b.at(time).left(), this);
    }
}

class AddV extends BehaviorCombinator {
    constructor(b1, b2) {
        super(b1);
        this.b1 = b1;
        this.b2 = b2;
    }

    at(time) {
        return new Tuple(this.b1.at(time).left().add(this.b2.at(time).left()).right(), this);
    }
}

class SubV extends BehaviorCombinator {
    constructor(b1, b2) {
        super(b1);
        this.b2 = b2;
    }

    at(time) {
        return new Tuple(this.b1.at(time).left().sub(this.b2.at(time).left()).right(), this);
    }
}

class MulV extends BehaviorCombinator {
    constructor(b1, b2) {
        super(b1);
        this.b1 = b1;
        this.b2 = b2;
    }

    at(time) {
        return new Tuple(this.b1.at(time).left().mul(this.b2.at(time).left()).right(), this);
    }
}

class DivV extends BehaviorCombinator {
    constructor(b1, b2) {
        super(b1);
        this.b1 = b1;
        this.b2 = b2;
    }

    at(time) {
        return new Tuple(this.b1.at(time).left().div(this.b2.at(time).left()).right(), this);
    }
}

class AddB extends BehaviorCombinator {
    constructor(b1, b2) {
        super(b1);
        this.b1 = b1;
        this.b2 = b2;
    }

    at(time) {
        return new Tuple(this.b1.at(time).left() + this.b2.at(time).left(), this);
    }
}


class SubB extends BehaviorCombinator {
    constructor(b1, b2) {
        super(b1);
        this.b1 = b1;
        this.b2 = b2;
    }

    at(time) {
        return new Tuple(this.b1.at(time).left() - this.b2.at(time).left(), this);
    }
}

class MulB extends BehaviorCombinator {
    constructor(b1, b2) {
        super(b1);
        this.b1 = b1;
        this.b2 = b2;
    }

    at(time) {
        return new Tuple(this.b1.at(time).left() * this.b2.at(time).left(), this);
    }
}

class DivB extends BehaviorCombinator {
    constructor(b1, b2) {
        super(b1);
        this.b1 = b1;
        this.b2 = b2;
    }

    at(time) {
        return new Tuple(this.b1.at(time).left() / this.b2.at(time).left(), this);
    }
}

class Transform extends BehaviorCombinator {
    constructor(b, f) {
        super(b);
        this.f = f;
        this.b = b;
    }

    at(time) {
        return new Tuple(this.f(this.b.at(time).left()), this);
    }
}

class Cond extends BehaviorCombinator {
    constructor(b, pred, then, other) {
        super(b);
        this.pred = pred;
        this.then = then;
        this.other = other;
    }

    at(time) {
        if (this.pred(this.b.at(time))) {
            return new Tuple(this.then, this);
        } else {
            return new Tuple(this.other, this);
        }
    }
}

class Time extends Behavior {
    at(time) {
        return new Tuple(time, this);
    }
}

class Sin extends BehaviorCombinator {
    at(time) {
        return new Tuple(Math.sin(this.b.at(time).left()), this);
    }
}

class Cos extends BehaviorCombinator {
    at(time) {
        return new Tuple(Math.cos(this.b.at(time).left()), this);
    }
}

class Abs extends BehaviorCombinator {
    at(time) {
        return new Tuple(Math.abs(this.b.at(time).left()), this);
    }
}

class Comp extends BehaviorCombinator {
    at(time) {
        return new Tuple(-this.b.at(time).left(), this);
    }
}

class Later extends BehaviorCombinator {
    constructor(b, ms) {
        super(b);
        this.ms = ms;
    }
    
    at(time) {
        return new Tuple(this.b.at(time-this.ms).left(), this);
    }
}

class Squared extends BehaviorCombinator {
    at(time) {
        const v = this.b.at(time).left();
        return new Tuple(v*v, this);
    }
}

class Cubed extends BehaviorCombinator {
    at(time) {
        const v = this.b.at(time).left();
        return new Tuple(v*v, this);
    }
}

class GT extends BehaviorCombinator {
    constructor(b, c) {
        super(b);
        this.c = c;
    }

    at(time) {
        return new Tuple(this.b.at(time).left() > this.c, this);
    }
}


class LT extends BehaviorCombinator {
    constructor(b, c) {
        super(b);
        this.c = c;
    }

    at(time) {
        return new Tuple(this.b.at(time).left() < this.c, this);
    }
}


class GTE extends BehaviorCombinator {
    constructor(b, c) {
        super(b);
        this.c = c;
    }

    at(time) {
        return new Tuple(this.b.at(time).left() >= this.c, this);
    }
}


class LTE extends BehaviorCombinator {
    constructor(b, c) {
        super(b);
        this.c = c;
    }

    at(time) {
        return new Tuple(this.b.at(time).left() <= this.c, this);
    }
}


class Eq extends BehaviorCombinator {
    constructor(b, c) {
        super(b);
        this.c = c;
    }

    at(time) {
        return new Tuple(this.b.at(time).left() === this.c, this);
    }
}

class Add extends BehaviorCombinator {
    constructor(b, c) {
        super(b);
        this.c = c;
    }

    at(time) {
        return new Tuple(this.b.at(time).left() + this.c, this);
    }
}


class Sub extends BehaviorCombinator {
    constructor(b, c) {
        super(b);
        this.b = b;
        this.c = c;
    }

    at(time) {
        return new Tuple(this.b.at(time).left() - this.c, this);
    }
}

class Mul extends BehaviorCombinator {
    constructor(b, c) {
        super(b);
        this.b = b;
        this.c = c;
    }

    at(time) {
        return new Tuple(this.b.at(time).left() * this.c, this);
    }
}

class Div extends BehaviorCombinator {
    constructor(b, c) {
        super(b);
        this.b = b;
        this.c = c;
    }

    at(time) {
        return new Tuple(this.b.at(time).left() / this.c, this);
    }
}

class Mouse extends Behavior {
    constructor() {
        super();
        this.value = new Vector(0, 0);
    }
    
    at(time) {
        const mouseAtStep = currentMouse;
        const delay = window.loopTime-time;
        timeout(() => {
            this.value = mouseAtStep;
        }, delay);
        return new Tuple(this.value, this);
    }
}

class Verlet extends Behavior {
    constructor() {
        super();
        this.position = new Vector();
        this.oldPosition = new Vector();
    }

    at(time) {
        const d = this.position.sub(this.oldPosition);

        this.oldPosition = this.position.clone();
        this.position.iadd(d);

        return new Tuple(this.position, this);
    }
}

class VerletGravity extends BehaviorCombinator {
    constructor(b) {
        super(b);
    }

    at(time) {
        
    }
}

class MouseX extends Mouse {
    at(time) {
        return new Tuple(super.at(time).left().x, this);
    }
}

class MouseY extends Mouse {
    at(time) {
        return new Tuple(super.at(time).left().y, this);
    }
}

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

    at(time) {
        return new Tuple(this.b.at(time).left(), this);
    }
}

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

    at(time) {
        return new Tuple(this.b.at(time).left(), this);
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
const sin = b => new Sin(b);
const cos = b => new Cos(b);
const squared = b => new Squared(b);
const cubed = b => new Cubed(b);
const neg = b => new Comp(b); // alias
const comp = b => new Comp(b);
const abs = b => new Abs(b);
const mul = (b, c) => new Mul(b, c);
const div = (b, c) => new Div(b, c);
const sub = (b, c) => new Sub(b, c);
const add = (b, c) => new Add(b, c);
const time = () => new Time();
const cond = (b, c, then, other) => new Cond(b, c, then, other);
const transform = (b, f) => new Transform(b, f);
const addb = (b1, b2) => new AddB(b1, b2);
const subb = (b1, b2) => new SubB(b1, b2);
const mulb = (b1, b2) => new MulB(b1, b2);
const divb = (b1, b2) => new DivB(b1, b2);
const addv = (b1, b2) => new AddV(b1, b2);
const subv = (b1, b2) => new SubV(b1, b2);
const mulv = (b1, b2) => new MulV(b1, b2);
const divv = (b1, b2) => new DivV(b1, b2);
const mouseX = () => new MouseX();
const mouseY = () => new MouseY();
const mouse = () => new Mouse();
const accelMouseX = a => new AccelMouseX(a);
const accelMouseY = a => new AccelMouseY(a);
const accelMouse = a => new AccelMouse(a);
const goToMouse = a => new GoToMouse(a);
const verlet = a => new Verlet(a);
const gt = (b, c) => new GT(b, c);
const lt = (b, c) => new LT(b, c);
const gte = (b, c) => new GTE(b, c);
const lte = (b, c) => new LTE(b, c);
const eq = (b, c) => new Eq(b, c);

const untilB = (b, e) => {
    b = lift(b);
    return new Behavior(t => {
        const occ = e.occ();

        if (occ.left() == null || t <= occ.left()) {
            return b.at(time).left();
        } else {
            return occ.right().at(time).left();
        }
    });
};

