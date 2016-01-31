// A test for the Dice module.
// jrs 2016

import Dice = require('./Dice');

console.log("FROM test01.ts via the 'Dice' module");

var dice = new Dice();

var xx: number[] = dice.roll(1);
var yy: number[] = dice.roll(5);
var zz: number[] = dice.roll(3);

console.log(xx);
console.log(yy);
console.log(zz);
