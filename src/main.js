class Fran {
    constructor() {
        // A map from object to field, which maps from field to behavior
        // each field in the nested map will be updated with the behavior's
        // when `tick` is called
        this.objects = [];
        
        // predicate events        
        this.predicates = [];

        this.time = 0;
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

    runAnimation(render) {
        startAnimationLoop(this, render);
    }
}
