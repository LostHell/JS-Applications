// EXAMPLE For old version
// const mod = require('./export');
// console.log(mod.add(5, 5));


// For ES6
import {add} from './export'
import * as mod from './export'

console.log(add(6, 5));
console.log(mod.add(6, 5));