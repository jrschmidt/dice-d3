"use strict";
var RDBEstimateOdds = require('./RDBEstimateOdds');
var greenArmies = process.argv[2];
var redArmies = process.argv[3];
var numberOfTests = process.argv[4];
var estOdds = new RDBEstimateOdds();
var results;
console.log("RUNNING test04 for 'RDBEstimateOdds' module");
console.log("test of run() function");
console.log("");
results = estOdds.run(greenArmies, redArmies, numberOfTests);
var ratio = results[0] / numberOfTests;
var percentage = ratio * 100;
console.log("Running " + numberOfTests + " tests with " + astr(greenArmies) + " attacking " + astr(redArmies));
console.log("   Attacker won " + results[0] + "times");
console.log("   Defender won " + results[1] + "times");
console.log("   Attacker won " + percentage + "percent of the time");
console.log("");
console.log("");
function astr(armies) {
    var ss = '';
    if (armies < 10) {
        ss = ' ' + ss.concat(armies.toString());
    }
    else {
        ss = ss.concat(armies.toString());
    }
    return ss;
}
