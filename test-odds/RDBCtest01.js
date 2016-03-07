"use strict";
var RDBComputeOdds = require('../modules/RDBComputeOdds');
console.log(" ");
console.log("RUNNING test01 for 'RDBComputeOdds' module");
console.log("test of computeOdds() function");
var computeOdds = new RDBComputeOdds();
var attArmies = process.argv[2];
var defArmies = process.argv[3];
var result = computeOdds.computeOdds(attArmies, defArmies);
var remAtt = result.remAtt;
var remDef = result.remDef;
console.log(' ');
console.log(result);
console.log(' ');
var attTotal = 0;
var defTotal = 0;
for (var i = 0; i < remAtt.length; i++) {
    attTotal += remAtt[i];
}
for (var i = 0; i < remDef.length; i++) {
    defTotal += remDef[i];
}
console.log("   probability of Attacker winning = " + attTotal);
console.log("   probability of Defender winning = " + defTotal);
console.log("");
