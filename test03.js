"use strict";
var Dice = require('./Dice');
console.log("RUNNING test03 for 'Dice' module");
console.log("odds of rolling a number of at least d at least one time with n dice");
var dice = new Dice();
var target = process.argv[2];
var diceUsed = process.argv[3];
var tests = 100000;
var wins = 0;
for (var i = 0; i < tests; i++) {
    var isWin = false;
    var roll = dice.roll(diceUsed);
    for (var j = 0; j < roll.length; j++) {
        if (roll[j] >= target) {
            isWin = true;
        }
    }
    if (isWin) {
        wins++;
    }
}
var est = wins / tests;
console.log(" ");
console.log("The target was " + target);
console.log(diceUsed + " dice were used");
console.log(tests + " tests were run");
console.log("The estimate is " + est);
console.log(" ");
