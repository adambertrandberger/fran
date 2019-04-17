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

class ConstantBehavior {
    // a behavior that doesn't use time
    // how do we make sure it doesn't use external events though? TODO
    value(time) {
        return this.f();
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
const BehaviorCombinator = (() => {
    const cache = {};
    return (arity=0) => {
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

            destroy() {
                for (const b of this.bs) {
                    if (typeof b.destroy === 'function') {
                        b.destroy();
                    }
                }
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
    };
})();

function makeBehaviorFunctions(fran) {
    const exports = {},
          privates = {};
    
    const numberOfBcFunctions = 10;
    for (let i=0; i<numberOfBcFunctions; ++i) {
        privates['bc' + i] = function (name, valueFunction) {
            exports[name] = class extends BehaviorCombinator(i) {
                value(time) {
                    return valueFunction(...this.vs.concat(this.as));
                }
            };

            exports[name.toLowerCase()] = (...args) => new window[name](...args);
        };
    }
    privates.bc = window.bc0; // alias

    // for below:
    // v1, v2, ..., vn are values which have been created from a nested behavior
    // a1, a2, ..., an are constants that were given thru the constructor
    const { bc0, bc1, bc2 } = privates;
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
        // Should restrict to non-external
        transform(time) {
            return time - this.a1;
        }
    }

    class UntilInternalEvent extends Behavior {
        constructor(b1, pred) {

            super(t => {
                if (this.b2 !== undefined) {
                    return this.val = this.b2.f(t);
                }
                
                this.b2 = this.pred(this.val);
                if (this.b2 !== undefined) {
                    this.b2 = lift(this.b2);
                    return this.val = this.b2.f(t);
                }
                
                return this.val = this.b1.f(t);
            }); // TODO: not correct

            this.val = null; // val represents the last computer value from the internal event
            this.switched = false;
            this.b1 = lift(b1);
            this.b2 = undefined;
            this.pred = pred;
        }
    }

    class UntilExternalEvent extends Behavior {
        constructor(b, event, listener=v=>v) {
            b = lift(b);
            let retentionDuration = 0,
                frozenB = b,
                lastVal = null,
                lastTime = null;

            super(t => {
                const cache = fran.externalEventCache[event.id];
                cache.ensureRetentionDuration(fran.time - t); // TODO: we may not have to do this every single time
                // if redentionDuration is negative, it means we are trying to look into the future, should throw exception
                if (cache.size() > 0) {
                    const nearest = cache.nearest(t);
                    if (nearest === null) {
                        return lastVal;
                    }
                    
                    const [time, vals] = nearest;
                    
                    // if we have an event from the same time,
                    // we don't have to run the listener again
                    if (lastTime !== null && time === lastTime) {
                        return lastVal = frozenB.at(t)[0];
                    }

                    // if there are no events within the scope of time,
                    // return the last known behavior
                    if (vals === null) {
                        return lastVal = frozenB.at(t)[0];                        
                    }

                    vals.push(lastVal);
                    frozenB = lift(listener(...vals));
                    const ret = lastVal = frozenB.at(t)[0];
                    lastTime = time;
                    return ret;
                }
                
                return lastVal = b.at(t)[0];
            });
            
            fran.registerExternalEventListener(event);
        }
    }

    function getPureFmapAndApplyFunctions(val) {
        let fmap = null,
            apply = null,
            pure = null;
        
        if (typeof val.fmap === 'function' && typeof val.apply === 'function' && typeof val.pure === 'function') {
            fmap = val.fmap.bind(val);
            apply = val.apply.bind(val);
            pure = val.apply.bind(val); 
        } else {
            if (typeof val !== 'number') {
                throw new Error('Cannot take integral of "' + val.constructor.name + '" without specifying "fmap", "apply", and "pure" functions.');
            }
            
            fmap = (f, v) => f(v);
            apply = (vf, v) => vf(v);
            pure = v => v;
        }
        return [pure, fmap, apply];
    }

    class StateIntegral extends Behavior {
        constructor(b, type=window.number) {

            
            const { pure, fmap, apply } = fran.getApplicative(type);
            
            super(t => {
                let val = this.b.at(t)[0];
                const interval = 20; //t - previousTime;
                const vf = fmap(v => prev => prev + (v * interval), val);
                return this.integral = apply(vf, this.integral);
            });

            this.b = lift(b);
            this.integral = pure(0);
        }

        update(b) {
            this.b = lift(b);
        }

        get() {
            return this.integral;
        }
    }

    class Integral extends Behavior {
        // same as RiemannIntegral but uses a cache of the
        // previously integrated value

        // needed to pass previousIntegral so we can continue where
        // another integral left off
        constructor(b, type=window.number, previousIntegral=null) {
            // fmap and apply are only needed if the type of the behavior is not numerical
            // for example if you have your own vector class, you will need to make it implement fmap (<$>) and
            // apply (<*>)
            // the fmap and apply functions must make new instances of the class
            
            b = lift(b);

            const { pure, fmap, apply } = fran.getApplicative(type);

            /*
             * idea to make integrals work:
             * pass a "state" object around with external events and assign a id to each integral?
             *
             */

            
            super(t => {
                if (this.previousTime !== null) {
                    let val = b.at(t)[0];

                    // TODO: Don't we need an interval? I thought we would have to
                    // make the interval = difference in time since last check
                    // setting it to 20 is probably a bug, but works for now
                    const interval = 20; //t - previousTime;
                    const vf = fmap(v => prev => prev + (v * interval), val);
                    this.integral = apply(vf, this.integral);
                }

                this.previousTime = t;
                return this.integral;

            });

            this.previousTime = null;
            this.integral = previousIntegral === null ? pure(0) : previousIntegral;
        }
    }

    class RiemannIntegral extends Behavior {
        // full integral from fran.startTime to t
        // inefficient, but complete
        constructor(b) {
            b = lift(b);
            super(t => {
                let cursor = t,
                    sum = 0,
                    interval = 10,
                    from = fran.startTime;
                
                for (let i=from; i<=t; i+=interval) {
                    sum += b.at(i)[0] * interval;
                }
                return sum;
            });
        }
    }

    class VerletIntegration extends Behavior {
        constructor(initial=0, b=0) {
            b = lift(b);
            // Behavior b must be a Number
            super(t => {
                this.velocity -= b.at(t)[0] - this.previousValue;
                this.previousValue = this.velocity + this.previousValue;
                return this.previousValue;
            });
            this.previousValue = initial;
            this.velocity = 0;
        }
    }

    class Transform extends BehaviorCombinator(1) {
        value(time) {
            return this.a1(this.v1);
        }
    }

    Object.assign(exports, {
        // add "mean" and "integral" here basing off previous values 
        at: (b, t) => lift(b).at(t),
        later: (b, ms) => new Later(b, ms),
        time: () => new Behavior(t => t),
        integral: (...args) => new Integral(...args),
        stateIntegral: (...args) => new StateIntegral(...args),
        slowIntegral: (...args) => new RiemannIntegral(...args),
        transform: (b, f) => new Transform(b, f),
        untilExternalEvent: (...args) => new UntilExternalEvent(...args),
        untilInternalEvent: (...args) => new UntilInternalEvent(...args),
        neg: exports.comp
    });

    return exports;
}

function lift(term) {
    if (term === null || term === undefined) {
        return term;
    }
    if (term.isBehavior) {
        return term; // assume its a behavior already
    }
    if (typeof term !== 'function') {
        return new Behavior(t => term);
    }
    return new Behavior(term);
}
