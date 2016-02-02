// A test for the battleOnce() function in module RiskDiceBattle.
// jrs 2016

import RiskDiceBattle = require('./RiskDiceBattle');

console.log("RUNNING test01 for 'RiskDiceBatle' module");
console.log("test of battleOnce() function");

let riskBattle = new RiskDiceBattle();

let result: any;

result = riskBattle.battleOnce(3, 2);
console.log();
console.log("  Attacker rolls: " + result.attRoll);
console.log("  Defender rolls: " + result.defRoll);
console.log();
console.log("  Attacker loses " + result.loss[0]);
console.log("  Defender loses " + result.loss[1]);
console.log();
