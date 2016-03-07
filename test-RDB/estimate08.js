"use strict";
var RiskDiceBattle = require('../modules/RiskDiceBattle');
var attArmies = process.argv[2];
var defArmies = process.argv[3];
var numberOfTests = 100000;
var remsAtt = zeroesArray(attArmies);
var remsDef = zeroesArray(defArmies);
var attTotal = 0;
var defTotal = 0;
console.log("RUNNING 'estimate08' program");
console.log("Estimating 'remainder' probabilities for Attacker and Defender");
console.log("   when Attacker attacks with " + attArmies);
console.log("   and Defender defends with " + defArmies);
console.log("Running test " + numberOfTests + " times");
console.log("");
var riskBattle = new RiskDiceBattle();
var results;
for (var i = 0; i < numberOfTests; i++) {
    results = riskBattle.battle(attArmies, defArmies);
    if (results.result[1] === 0) {
        remsAtt[results.result[0]]++;
        attTotal++;
    }
    else {
        remsDef[results.result[1]]++;
        defTotal++;
    }
}
var probsAtt = attTotal / numberOfTests;
var probsDef = defTotal / numberOfTests;
console.log("Results for Attacker:");
console.log("   probability of Attacker winning = " + probsAtt);
console.log("");
for (var i = 2; i <= attArmies; i++) {
    var prob = remsAtt[i] / numberOfTests;
    console.log("   probability of Attacker winning with " + i + " armies remaining = " + prob);
}
console.log(" ");
console.log("Results for Defender:");
console.log("   probability of Defender winning = " + probsDef);
console.log("");
for (var i = 1; i <= defArmies; i++) {
    var prob = remsDef[i] / numberOfTests;
    console.log("   probability of Defender winning with " + i + " armies remaining = " + prob);
}
console.log(" ");
function zeroesArray(size) {
    var vals = [];
    for (var i = 0; i <= size; i++) {
        vals.push(0);
    }
    return vals;
}
function astr(n) {
    if (n > 1)
        return n + ' armies';
    else if (n < 1)
        return 'no armies';
    else
        return '1 army';
}
