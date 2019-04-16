function startAnimationLoop(fran, render) {
    const update = (time) => {
        render();
        fran.tick(time);
    };

    makeUpdateRenderLoop(update)();
}

function getRAF(window, useSetTimeout=false) {
    let raf = window.requestAnimationFrame;
    if (typeof raf !== 'undefined' || useSetTimeout) {
        raf = f => window.setTimeout(f, 16);
    }
    return raf;
}

const makeUpdateRenderLoop = (update) => {
    const MS_PER_UPDATE = 10, // update every 10ms
          raf = getRAF(window);
    
    let loopTime = 0;
    return () => {
        const loop = () => {
            raf(() => {
                update(loopTime+=MS_PER_UPDATE);
                raf(loop());
            });
        };
        loop();
    };
};
