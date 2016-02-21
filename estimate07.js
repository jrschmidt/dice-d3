"use strict";
var Dice = require('./Dice');
var d1 = process.argv[2];
var d2 = process.argv[3];
var dice = new Dice();
var numberOfTests = 400000;
var defRoll = [d1, d2];
console.log("RUNNING 'estimate07' program");
console.log("Estimating probabilities for Attacker to win, lose or tie");
console.log("   when Attacker attacks with 3 dice");
console.log("   and Defender rolls " + d1 + ", " + d2);
console.log("Running test " + numberOfTests + " times");
console.log("");
var defLose = 0;
var attLose = 0;
var eachLose1 = 0;
for (var i = 0; i < numberOfTests; i++) {
    var attRoll = dice.roll(3).sort().reverse();
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
var pA216 = probAtt * 216;
var pD216 = probDef * 216;
var oneEach = 1.0 - probAtt - probDef;
var oneEach216 = oneEach * 216;
console.log("probablity of Defender losing two armies:");
console.log("   = " + probAtt);
console.log("   ~ " + pA216 + " / 216");
console.log(" ");
console.log("probablity of Attacker and Defender each losing one army:");
console.log("   = " + oneEach);
console.log("   ~ " + oneEach216 + " / 216");
console.log(" ");
console.log("probablity of Attacker losing two armies:");
console.log("   = " + probDef);
console.log("   ~ " + pD216 + " / 216");
console.log(" ");
