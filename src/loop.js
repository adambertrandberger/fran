class State {
    constructor() {
        this.behaviors = []; // registered behaviors
        this.predicates = []; // predicate events
    }

    updateExternalBehaviors(time) {
        for (const obj of this.behaviors.keys()) {
            const behs = this.behaviors.get(obj);
            for (const prop of behs.keys()) {
                const beh = behs.get(prop);
                obj[prop] = beh.at(time)[0];
            }
        }
    }

    updatePredicateEvents(time) {
        for (const predicate of this.predicates) {
            predicate.trigger(time);
        }
    }

    // registerB :: Func<Behavior<alpha>> -> Action<alpha>
    registerB(obj, prop, beh=null) {
        if (beh === null)
            beh = obj[prop];
        beh = lift(beh);
        
        const existing = this.behaviors.get(obj);
        if (existing != null) {
            existing.set(prop, beh);
        } else {
            const map = new Map();
            map.set(prop, beh);
            this.behaviors.set(obj, map);
        }
    }

    deregisterB(obj, prop=null) {
        if (prop === null) {
            const existing = this.behaviors.get(obj);
            if (existing != null) {
                for (const prop of existing.keys()) {
                    const beh = existing.get(prop);
                    if (typeof beh.destroy === 'function') {
                        console.log('destroy');
                        beh.destroy();
                    }
                }
            }
            this.behaviors.delete(obj);
        } else {
            const existing = this.behaviors.get(obj);
            if (existing != null) {
                const beh = existing.get(prop);
                if (typeof beh.destroy === 'function') {
                    beh.destroy();
                }
                existing.delete(prop);
            }
        }
    }
}

function tick(time, state=null) {
    if (state === null) {
        state = new State();
    }
    state.updateExternalBehaviors(time);
    state.updatePredicateEvents(time);
    return state;
}

function makeMainLoop(render) {
    const update = (time) => {
        render();
        tick(time);
        timer.tick(time);
    };

    return {
        init: makeUpdateRenderLoop(update),
    };
}


let totalFrames = 0;
let startTime = new Date();
const getElapsedSeconds = () => {
    return (new Date().getTime() - startTime.getTime())/1000;
};
let fps = 0;
let countFpsUsingDelta = false;

function getRAF(window, useSetTimeout=false) {
    let raf = window.requestAnimationFrame;
    if (typeof raf !== 'undefined' || useSetTimeout) {
        raf = f => window.setTimeout(f, 16);
    }
    return raf;
}

const makeUpdateRenderLoop = (update) => {
    let loopTime = 0;
    const MS_PER_UPDATE = 10, // update every 10ms
          raf = getRAF(window);
    
    return () => {
        let t0 = new Date();
        let deltaT = 0.0,
            lastCalledTime = Date.now();
        
        const loop = () => {
            raf(() => {
                if (countFpsUsingDelta) {
                    if(!startTime) {
                        startTime = Date.now();
                        fps = 0;
                    } else {
                        let delta = (Date.now() - lastCalledTime)/1000;
                        lastCalledTime = Date.now();
                        fps = (1/delta).toFixed(2);
                    }
                } else {
                    ++totalFrames;
                    fps = (totalFrames / getElapsedSeconds()).toFixed(2);
                }

                update(loopTime+=MS_PER_UPDATE);
                
                loop();
            });
        };
        loop();
    };
};
