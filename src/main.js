import test from './test';
import behaviors from './behaviors';
require = undefined;
import arrows from 'expose-loader?LiftedArrow!../deps/arrows.es5.js';

console.log(arrows);

eval.call(null, arrows);

const exports = {
    Behavior: behaviors.Behavior,
    poo: 3,
};

Object.assign(exports, behaviors);

for (const key in exports) {
    window[key] = exports[key];
}
