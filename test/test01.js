"use strict";
var Dice = require('../modules/Dice');
console.log("RUNNING test01 for 'Dice' module");
console.log("test of roll() function");
var dice = new Dice();
var xx = dice.roll(1);
var yy = dice.roll(5);
var zz = dice.roll(3);
console.log(" ");
console.log("  1 die was rolled:    " + xx);
console.log("  5 dice were rolled:  " + yy);
console.log("  3 dice were rolled:  " + zz);
console.log(" ");