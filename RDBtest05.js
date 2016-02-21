"use strict";
var Dice = require('./Dice');
var attDice = process.argv[2];
var defDice = process.argv[3];
var numberOfTests = process.argv[4];
var dice = new Dice();
console.log("RUNNING test05 for 'RDBEstimateOdds' module");
console.log("estimating probabilities for " + dstr(attDice) + " attacking " + dstr(defDice));
console.log("running test " + numberOfTests + " times");
console.log("");
var defLose = 0;
var attLose = 0;
var eachLose1 = 0;
var dd;
if (attDice > 1 && defDice > 1) {
    dd = 2;
}
else {
    dd = 1;
}
for (var i = 0; i < numberOfTests; i++) {
    var attRoll = dice.roll(attDice).sort().reverse();
    var defRoll = dice.roll(defDice).sort().reverse();
    if (dd === 1) {
        if (attRoll[0] > defRoll[0]) {
            defLose++;
        }
        else {
            attLose++;
        }
    }
    else {
        if (attRoll[0] > defRoll[0]) {
            if (attRoll[1] > defRoll[1]) {
                defLose++;
            }
            else {
                eachLose1++;
            }
        }
        else {
            if (attRoll[1] > defRoll[1]) {
                eachLose1++;
            }
            else {
                attLose++;
            }
        }
    }
}
if (dd === 1) {
    var probAtt = defLose / numberOfTests;
    var probDef = 1.0 - probAtt;
    console.log("probablity of Defender losing one army = " + probAtt);
    console.log("probablity of Attacker losing one army = " + probDef);
}
else {
    var probAtt = defLose / numberOfTests;
    var probDef = attLose / numberOfTests;
    var oneEach = 1.0 - probAtt - probDef;
    console.log("probablity of Defender losing two armies = " + probAtt);
    console.log("probablity of Attacker losing two armies = " + probDef);
    console.log("probablity of Attacker and Defender each losing one army = " + oneEach);
}
console.log(" ");
function dstr(n) {
    if (n == 1) {
        return '1 die';
    }
    else {
        return n + ' dice';
    }
}
