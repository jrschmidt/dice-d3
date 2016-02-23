"use strict";
var Dice = require('../modules/Dice');
var dice = new Dice();
var target = process.argv[2];
var diceUsed = process.argv[3];
var tests = 100000;
var wins = 0;
console.log("RUNNING test04 for 'Dice' module");
console.log("Estimating odds of rolling " + target + " or greater at least twice with " + diceUsed + " dice");
for (var i = 0; i < tests; i++) {
    var win1 = false;
    var win2 = false;
    var roll = dice.roll(diceUsed);
    for (var j = 0; j < roll.length; j++) {
        if (roll[j] >= target) {
            if (win1) {
                win2 = true;
            }
            else {
                win1 = true;
            }
        }
    }
    if (win2) {
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
