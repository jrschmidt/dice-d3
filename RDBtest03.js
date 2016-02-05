"use strict";
var RiskDiceBattle = require('./RiskDiceBattle');
var greenArmies = process.argv[2];
var redArmies = process.argv[3];
var riskBattle = new RiskDiceBattle();
var results;
console.log("RUNNING test03 for 'RiskDiceBatle' module");
console.log("test of battle() function (short form output)");
console.log("");
results = riskBattle.battle(greenArmies, redArmies);
reportResults(results);
function reportResults(results) {
    var ln1 = "ATT  ";
    var ln2 = "     ";
    var ln3 = "     ";
    var ln4 = "DEF  ";
    var ln5 = "";
    ln1 = ln1.concat(astr(greenArmies));
    ln4 = ln4.concat(astr(redArmies));
    for (var i = 0; i < results.rolls.length; i++) {
        ln2 = ln2 + dstr(results.rolls[i].attRolls);
        ln3 = ln3 + dstr(results.rolls[i].defRolls);
        ln1 = ln1 + '         ' + astr(results.rolls[i].armies[0]);
        ln4 = ln4 + '         ' + astr(results.rolls[i].armies[1]);
    }
    if (results.result[1] === 0) {
        ln5 = "CONQUER";
    }
    else {
        ln5 = "FAIL TO CONQUER";
    }
    console.log(ln1);
    console.log(ln2);
    console.log(ln3);
    console.log(ln4);
    console.log(ln5);
    console.log(" ");
}
function dstr(rolls) {
    var ss = '   ';
    rolls.forEach(function (roll) {
        ss = ss.concat(' ' + roll.toString());
    });
    ss = ss.concat('    ').slice(0, 11);
    return ss;
}
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
