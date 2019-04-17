class Cache {
    // Time oriented cache -- keys are time
    constructor(retentionDuration=0) {
        // size - this is a hard limit on the number of values to keep set it to a negative value to keep all
        // retentionDuration - the time values that should be retained even if they exceed the size limit
        this.keys = [];
        this.values = [];
        this.retentionDuration = retentionDuration;
        this.tolerence = 100; // additional milliseconds of cache to keep in case of race condition
    }

    removeOldest() {
        this.keys.shift();
        this.values.shift();
    }

    add(time, value) {
        this.keys.push(time);
        this.values.push(value);
        this.normalize(time);
        return this;
    }

    size() {
        return this.keys.length;
    }

    ensureRetentionDuration(newRetentionDuration) {
        this.retentionDuration = Math.max(this.retentionDuration, newRetentionDuration);
    }

    get(i) {
        return this.values[i];
    }

    first() {
        return this.get(0);
    }

    nearest(x/*, l, r*/) {
        let cursor = this.keys.length - 1,
            current = this.keys[cursor];
        if (this.keys.length > 0) {
            while (current > x) {
                --cursor;
                if (cursor < 0) {
                    return null;
                }
                current = this.keys[cursor];
            }
            return [current, this.values[cursor]];
        }
        /*
          const length = this.keys.length;
          if (l === undefined) {
          l = 0;
          }
          if (r === undefined) {
          r = length-1;
          }

          if (l === r) {
          return this.values[l];
          }

          // TODO?: Maybe use loop based binary search instead to avoid stack problems
          if (length === 0 || x < this.keys[0])
          return null;

          const mid = Math.floor(((r - l)+1)/2) + l;

          const key = this.keys[mid];
          if (key === x) {
          return this.values[mid];
          }
          
          if (key > x) {
          // go left
          return this.nearest(x, l, mid-1);
          } else {
          // go right
          return this.nearest(x, mid+1, r);
          }
        */
    }

    normalize(time) {
        // not efficient
        const duration = this.retentionDuration + this.tolerence;
        // I beleive there is some sort of small race condition going on here
        // if an event happens exactly at the retention duration -- or maybe its just a bug
        // anyway i added a tolerence to add room for error
        while (time - this.keys[0] > duration) {
            if (this.keys.length < 2) { // always keep at least 1 record if an event ever happened
                break;
            }
            this.removeOldest();
        }
    }
}

class Fran {
    constructor() {
        // A map from object to field, which maps from field to behavior
        // each field in the nested map will be updated with the behavior's
        // when `tick` is called
        this.objects = [];
        
        this.internalEvents = [];

        this.time = 0;

        this.externalEventCache = {}; // cache of values for external events (captures event object)

        this.externalEvents = [];

        this.currentEventId = 0;

        this.startTime = null;

        this.applicatives = new Map();
        this.applicatives.set(window.number, {
            pure: v => v,
            fmap: (f, v) => f(v),
            apply: (vf, v) => vf(v)
        });

        const exports = makeBehaviorFunctions(this);
        Object.assign(window, exports);
    }

    defineApplicative(type, functions) {
        // type can be any value actually -- I use constructor function as the type, but you could use a string too
        if (!functions['apply'] || !functions['pure'] || !functions['fmap']) {
            throw new Error('Must supply "pure", "fmap" and "apply" to "registerType"');
        }
        this.applicatives.set(type, functions);
    }

    getApplicative(type) {
        const functions = this.applicatives.get(type);
        if (functions === undefined) {
            const name = typeof type === 'function' ? type.name : type;
            throw new Error('You need to define "' + name + '" as an applicative with "defineApplicative"');
        }
        return functions;
    }

    createInternalEvent(emitter) {
        return (...args) => {
            const id = this.currentEventId++; // TODO: event ids are shared between external and internal events, is this ok?
            const event = new InternalEvent(id, (...args) => emitter(...args));
            this.internalEvents.push(event);
            return event;
        };
    }

    createExternalEvent(arrow) {
        const id = this.currentEventId++;
        const event =  new ExternalEvent(id, arrow, (...vals) => {
            const cache = this.externalEventCache;
            cache[id].add(this.time, vals);
        });
        this.externalEvents.push(event); // store them so we can destroy them later (maybe)
        return event;
    }

    tick(time) {
        if (time === undefined) {
            time = new Date().getTime();
        }
        if (this.startTime === null) {
            this.startTime = time; // needed for full integration
            // because we need to know what t_0 is for the entire animation
        }
        this.time = time;
    }

    defineBehavior(o, propertyKey, behavior=null) {
        if (behavior === null)
            behavior = o[propertyKey];
        behavior = lift(behavior);
        
        Object.defineProperty(o, propertyKey, {
            get: () => {
                if (behavior === null || behavior === undefined)
                    return behavior;
                return behavior.at(this.time)[0];
            },
            set: function (value) {
                behavior = lift(value);
            }
        });
    }

    // TODO: need some way of removing these when some things get stale (like behaviors that aren't around anymore)
    registerExternalEventListener(event, maxRetentionDuration=1) {
        if (this.externalEventCache[event.id] === undefined) { // if this is not already registered
            const cache = this.externalEventCache;
            cache[event.id] = new Cache(maxRetentionDuration);
            event.arrow.run();
        }
    }

    getExternalEventCache(type) {
        return this.externalEventCache[type];
    }

    updateRetentionDurationForExternalEvent(type, retentionDuration) {
        const cache = this.getExternalEventCache();
        if (cache !== undefined) {
            cache.ensureRetentionDuration(retentionDuration);
        }
    }

    runAnimation(render) {
        startAnimationLoop(this, render);
    }
}
