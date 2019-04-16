class Cache {
    // Time oriented cache -- keys are time
    constructor(retentionDuration=0) {
        // size - this is a hard limit on the number of values to keep set it to a negative value to keep all
        // retentionDuration - the time values that should be retained even if they exceed the size limit
        this.keys = [];
        this.values = [];
        this.retentionDuration = retentionDuration;
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
            return this.values[cursor];
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
        while (time - this.keys[0] > this.retentionDuration) {
            if (this.keys.length < 2) {
                break;
            }
            this.removeOldest();
        }
    }
}

function testCache() {
    const c = new Cache(30);
    c.add(10, 'a');
    c.add(20, 'b');
    c.add(30, 'c');
    c.add(40, 'd');
    c.add(50, 'e');
    console.log(c);

    console.log('nearest 30', c.nearest(30));
    console.log('nearest 20', c.nearest(20));
    console.log('nearest 10', c.nearest(10));
    console.log('nearest 40', c.nearest(40));
    console.log('nearest 50', c.nearest(50));
    console.log('nearest 60', c.nearest(60));
    console.log('nearest 35 -- should be c', c.nearest(350));    
}
testCache();

class Fran {
    constructor() {
        // A map from object to field, which maps from field to behavior
        // each field in the nested map will be updated with the behavior's
        // when `tick` is called
        this.objects = [];
        
        // predicate events        
        this.predicates = [];

        this.time = 0;

        this.externalEventCache = {}; // cache of values for external events (captures event object)

        const exports = makeBehaviorFunctions(this);
        Object.assign(window, exports);
    }

    tick(time) {
        if (time === undefined) {
            time = new Date().getTime();
        }
        this.time = time;
    }

    defineBehavior(o, propertyKey, behavior=null) {
        if (behavior === null)
            behavior = o[propertyKey];
        behavior = lift(behavior);
        
        Object.defineProperty(o, propertyKey, {
            get: () => {
                return behavior.at(this.time)[0];
            },
            set: function (value) {
                behavior = lift(value);
            }
        });
    }

    // TODO: need some way of removing these when some things get stale (like behaviors that aren't around anymore)
    registerExternalEventListener(target, type, maxRetentionDuration=1) {
        if (this.externalEventCache[type] === undefined) {
            const cache = this.externalEventCache;
            cache[type] = new Cache(maxRetentionDuration);
            
            const fran = this;
            target.addEventListener(type, function (e) { // TODO?: not a big deal but maybe we should deregister if we sense not being used
                cache[type].add(fran.time, [this, e]);
            });
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
