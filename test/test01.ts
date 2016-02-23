// A test for the Dice module.
// jrs 2016

import Dice = require('../modules/Dice');

console.log("RUNNING test01 for 'Dice' module");
console.log("test of roll() function");

let dice = new Dice();

let xx: number[] = dice.roll(1);
let yy: number[] = dice.roll(5);
let zz: number[] = dice.roll(3);

console.log(" ");
console.log("  1 die was rolled:    " + xx);
console.log("  5 dice were rolled:  " + yy);
console.log("  3 dice were rolled:  " + zz);
console.log(" ");
