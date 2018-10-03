const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let currentMouse = new Vector();

function getMousePosition(canvas, e) {
    const r = canvas.getBoundingClientRect();
    return new Vector(e.clientX - r.left, e.clientY - r.top);
}

canvas.addEventListener('mousemove', (e) => {
    const {x, y} = getMousePosition(canvas, e);

    currentMouse = new Vector(x, y);
});

let lbus = []; // LBU Event objects
let lbds = []; // LBD Event objects
canvas.addEventListener('mousedown', (e) => {
    if (e.which === 1) { // left click
        for (const lbd of lbds) {
            lbd.trigger(window.loopTime);
        }
    }
});

canvas.addEventListener('mouseup', (e) => {
    if (e.which === 1) { // left click
        for (const lbu of lbus) {
            lbu.trigger(window.loopTime);
        }
    }
});

let predicates = [];
function checkEvents(time) { // for checking Predicate events
    for (const predicate of predicates) {
        predicate.trigger(time);
    }
}
