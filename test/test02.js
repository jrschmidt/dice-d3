"use strict";
var Dice = require('../modules/Dice');
console.log("RUNNING test02 for 'Dice' module");
console.log("test of roll() function");
var dice = new Dice();
var runs = 600;
var hits = [0, 0, 0, 0, 0, 0, 0];
var n;
for (var i = 0; i < runs; i++) {
    var dd = dice.roll(10);
    for (var j = 0; j < 10; j++) {
        n = dd[j];
        hits[n] = hits[n] + 1;
    }
}
console.log(" ");
console.log("   10 dice were rolled 600 times for a total of 6000 dice rolls.");
for (var nn = 1; nn < 7; nn++) {
    console.log("     " + nn + " was rolled " + hits[nn] + " times.");
}
console.log(" ");
