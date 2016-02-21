"use strict";
var Dice = require('./Dice');
var d1 = process.argv[2];
var d2 = process.argv[3];
var dice = new Dice();
var numberOfTests = 100000;
var defRoll = [d1, d2];
console.log("RUNNING 'estimate06' program");
console.log("Estimating probabilities for Attacker to win, lose or tie");
console.log("   when Attacker attacks with 2 dice");
console.log("   and Defender rolls " + d1 + ", " + d2);
console.log("Running test " + numberOfTests + " times");
console.log("");
var defLose = 0;
var attLose = 0;
var eachLose1 = 0;
for (var i = 0; i < numberOfTests; i++) {
    var attRoll = dice.roll(2).sort().reverse();
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
var probAtt = defLose / numberOfTests;
var probDef = attLose / numberOfTests;
var pA36 = probAtt * 36;
var pD36 = probDef * 36;
var oneEach = 1.0 - probAtt - probDef;
var oneEach36 = oneEach * 36;
console.log("probablity of Defender losing two armies:");
console.log("   = " + probAtt);
console.log("   ~ " + pA36 + " / 36");
console.log(" ");
console.log("probablity of Attacker and Defender each losing one army:");
console.log("   = " + oneEach);
console.log("   ~ " + oneEach36 + " / 36");
console.log(" ");
console.log("probablity of Attacker losing two armies:");
console.log("   = " + probDef);
console.log("   ~ " + pD36 + " / 36");
console.log(" ");
