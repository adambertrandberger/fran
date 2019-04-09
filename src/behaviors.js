
/* Ideas:
 * We may not have to create a new object for the "behavior" callbacks
 * If we just overwrite this.bs correctly, it may work
 * 
 * TODO:
 * - Make events work via callbacks
 * 
 */


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

    // Gives the behavior a chance to change its own reference
    // this happens after any time transforms
    // ordering for a behavior is transform => switch => return
    switch(time) {
        return this;
    }

    at(time) {
        time = this.transform(time);
        const b = this.switch(time);        
        return [b.value(time), b.behavior(time)];
    }
}

// experimental
class UntilBLoop extends Behavior {
    constructor(b, af) {
        let val = b;
        super(t => val);
        this.af = af;
        this.a = af(newVal => val = newVal).seq((() => {
            
            this.a.run();
        }).lift());
        this.a.run();
    }
}

/*
 * BehaviorCombinator is a helper for combining behaviors and allows for taking in additional
 * parameters via its constructor via the "arity" parameter.
 *
 * Example: "class AddThreeNumbers extends BehaviorCombinator(0)" means you want to make a Behavior named "AddThreeNumbers"
 * which accepts 3 behaviors in the constructor and no other arguments. So you could say "new AddThreeNumbers(1, 2, 3)"
 * Note how the arguments are lifted into behavior values. These 3 behaviors can be accessed in the value function by their 
 * array "this.bs" or through "this.b1" (to select the first behavior passed in the constructor), "this.b2", or "this.b3".
 *
 * Example: "class AddTwoNumbersPlusAConstant extends BehaviorCombinator(1)" means you want to make a Behavior which
 * accepts 2 behaviors and 1 number as an argument. So you could say "new AddTwoNumbersPlusAConstant(3, 4, 1)". Note
 * that 3 and 4 will be lifted to behaviors while the 1 will _not_ be lifted. You can access the "3" and "4" behaviors with
 * "this.b1" and "this.b2" respectively. Also you can access the constant Number "1" using "this.a1". If you used "BehaviorCombinator(2)",
 * then it would have taken another position in the constructor for a constant (at the end), and that argument could be accessed with
 * "this.a2".
 */
const cache = {};
function BehaviorCombinator(arity=0) {
    if (cache[arity]) {
        return cache[arity];
    }

    return cache[arity] = class extends Behavior {
        constructor(...args) {
            super();
            
            const as = args.splice(args.length - arity);
            this.as = as;
            for (let i=0; i<this.as.length; ++i) {
                this['a' + (i+1)] = this.as[i];
            }
            
            this.bs = args.map(lift);
            this.vs = [];
        }

        behavior(time) {
            return new this.constructor(...this.bs.concat(this.as));
        }

        value(time) {
            if (this.vs.length === 1) {
                return this.v1;
            }
            return this.vs;
        }
        
        at(time) {
            time = this.transform(time);

            this.vs = [];
            for (let i=0; i<this.bs.length; ++i) {
                const reltime = this.bs[i].transform(time);
                this.bs[i] = this.bs[i].switch(reltime);
                const other = this.bs[i].at(reltime);
                this['v' + (i+1)] = other[0];
                this['b' + (i+1)] = this.bs[i] = other[1];

                this.vs.push(other[0]);
            }
            
            const b = this.switch(time); // should this be done earlier?
            return [b.value(time), b.behavior(time)];
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

// for below:
// v1, v2, ..., vn are values which have been created from a nested behavior
// a1, a2, ..., an are constants that were given thru the constructor
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

bc0('Mod', (v1, a1) => v1 % a1);

bc1('GT', (v1, a1) => v1 > a1);
bc1('LT', (v1, a1) => v1 < a1);
bc1('GTE', (v1, a1) => v1 >= a1);
bc1('LTE', (v1, a1) => v1 <= a1);
bc1('Eq', (v1, a1) => v1 == a1);

bc1('Add', (v1, a1) => v1 + a1);
bc1('Sub', (v1, a1) => v1 - a1);
bc1('Mul', (v1, a1) => v1 * a1);
bc1('Div', (v1, a1) => v1 / a1);

bc2('Cond', (v1, a1, a2) => v1 ? a1 : a2);

class Later extends BehaviorCombinator(1) {
    transform(time) {
        return time - this.a1;
    }
}

class UntilB extends BehaviorCombinator(1) {
    switch(time) {
        const occ = this.a1.occ(time);

        if (occ[1] != null) {
            return occ[1];
        } else {
            return this;
        }
    }
}

class Transform extends BehaviorCombinator(1) {
    value(time) {
        return this.a1(this.v1);
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

function lift(term) {
    if (term.isBehavior) {
        return term; // assume its a behavior already
    }
    if (typeof term !== 'function') {
        return new Behavior(t => term);
    }
    return new Behavior(term);
}

const at = (b, t) => lift(b).at(t),
      later = (b, ms) => new Later(b, ms),
      time = () => new Behavior(t => t),
      transform = (b, f) => new Transform(b, f),
//      mouseX = () => new MouseX(),
//      mouseY = () => new MouseY(),
//      mouse = () => new Mouse(),
      accelMouseX = a => new AccelMouseX(a),
      accelMouseY = a => new AccelMouseY(a),
      accelMouse = a => new AccelMouse(a),
      goToMouse = a => new GoToMouse(a),
      untilB = (b, e) => new UntilB(b, e),
      neg = comp, // alias
      untilBLoop = (b, af) => new UntilBLoop(b, af);
