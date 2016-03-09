"use strict";
var RDBComputeOdds = require('../modules/RDBComputeOdds');
var computeOdds = new RDBComputeOdds();
var attArmies = process.argv[2];
var defArmies = process.argv[3];
console.log(' ');
console.log('RUNNING test02 for RDBComputeOdds module');
console.log('Test of computeOdds() function');
console.log(' ');
console.log("Computing 'remainder' probabilities for Attacker and Defender");
console.log('when Attacker attacks with ' + attArmies);
console.log('and Defender defends with ' + defArmies);
var result = computeOdds.computeOdds(attArmies, defArmies);
if (result.success != true) {
    console.log(' ');
    console.log(result);
    console.log(' ');
}
if (result.success) {
    var remAtt = result.remAtt;
    var remDef = result.remDef;
    var attTotal = 0;
    var defTotal = 0;
    for (var i = 0; i < remAtt.length; i++) {
        attTotal += remAtt[i];
    }
    for (var i = 0; i < remDef.length; i++) {
        defTotal += remDef[i];
    }
    console.log(' ');
    console.log('Results for Attacker:');
    console.log('   probability of Attacker winning = ' + attTotal);
    for (var i = 2; i <= attArmies; i++) {
        console.log('   probability of Attacker winning with ' + i + ' armies remaining = ' + remAtt[i]);
    }
    console.log(' ');
    console.log('Results for Defender:');
    console.log('   probability of Defender winning = ' + defTotal);
    for (var i = 1; i <= defArmies; i++) {
        console.log('   probability of Defender winning with ' + i + ' armies remaining = ' + remDef[i]);
    }
    console.log(' ');
}
