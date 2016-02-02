"use strict";
var RiskDiceBattle = require('./RiskDiceBattle');
var greenArmies = process.argv[2];
var redArmies = process.argv[3];
var riskBattle = new RiskDiceBattle();
var results;
console.log("RUNNING test02 for 'RiskDiceBatle' module");
console.log("test of battle() function");
console.log("");
results = riskBattle.battle(greenArmies, redArmies);
reportResults(results);
function reportResults(results) {
    console.log("");
    console.log("Green has " + astr(greenArmies) + " and attacks Red with " + dstr(results.dice[0]));
    console.log("Red has " + astr(redArmies) + " and defends with " + dstr(results.dice[1]));
    console.log("");
    for (var i = 0; i < results.rolls.length; i++) {
        console.log("Green rolls  " + results.rolls[i].attRolls);
        console.log("Red rolls  " + results.rolls[i].defRolls);
        if (results.rolls[i].loss[0] > 0)
            console.log("Green loses " + astr(results.rolls[i].loss[0]));
        if (results.rolls[i].loss[1] > 0)
            console.log("Red loses " + astr(results.rolls[i].loss[1]));
        console.log("Green has " + astr(results.armies[i][0]) + " left");
        console.log("Red has " + astr(results.armies[i][1]) + " left");
        console.log("");
    }
    if (results.result[1] === 0) {
        console.log("Red's armies are gone");
        console.log("Green has " + astr(results.result[0]) + " remaining");
        console.log("Green conquers the territory");
    }
    else {
        console.log("Green has one army left");
        console.log("Red has " + astr(results.result[1]) + " remaining");
        console.log("Green fails to conquer the territory");
    }
    console.log();
}
function dstr(n) {
    if (n === 1)
        return '1 die';
    else
        return n + ' dice';
}
function astr(n) {
    if (n === 1)
        return '1 army';
    else if (n === 0)
        return 'no armies';
    else
        return n + ' armies';
}
