/*
 * Returns a loop which renders all components to a HTML Canvas
 */
function makeMainLoop(ctx, component) {
    const update = (time) => {
        if (window.image) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);            
            window.image.render(ctx, time);
            
            if (window.checkEvents) {
                checkEvents(time);
            }
        }
    };

    return {
        init: makeUpdateRenderLoop(update),
    };
}


/*
 * Creates a render loop for all animations (powered by setTimeout)
 */
const makeUpdateRenderLoop = (update) => {
    const MS_SLEEP_INTERVAL = 16.666; // 60FPS
    const MS_PER_UPDATE = 10; // update every 10ms

    window.loopTime = 0;
    
    return () => {
        let t0 = new Date();
        let deltaT = 0.0;

        const loop = () => {
            requestAnimationFrame(() => {
                update(window.loopTime+=MS_PER_UPDATE);
                loop();
                /*
                  const t1 = new Date();
                  deltaT += t1 - t0;
                  t0 = t1;

                  while (deltaT >= MS_PER_UPDATE) {
                  update(window.loopTime+=MS_PER_UPDATE);
                  deltaT -= MS_PER_UPDATE;
                  }

                  loop();
                */
            });//, MS_SLEEP_INTERVAL);
        };
        loop();
    };
};
