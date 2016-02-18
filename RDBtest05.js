"use strict";
var Dice = require('./Dice');
var attDice = process.argv[2];
var defDice = process.argv[3];
var numberOfTests = process.argv[4];
var dice = new Dice();
var results;
console.log("RUNNING test05 for 'RDBEstimateOdds' module");
console.log("");
results = dice.roll(attDice, defDice);
function dstr(n) {
    if (n === 1)
        return '1 die';
    else
        return n + ' dice';
}
