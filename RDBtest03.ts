// A test for the battle() function in module RiskDiceBattle.
// A rewrite of RDBtest02 with condensed output
// jrs 2016

// Call with number of armies for Attacker and Defender like this:
// node RDBtest03.ts

import RiskDiceBattle = require('./RiskDiceBattle');

let greenArmies: number = process.argv[2];
let redArmies: number = process.argv[3];
let riskBattle = new RiskDiceBattle();
let results: any;

console.log("RUNNING test03 for 'RiskDiceBatle' module");
console.log("test of battle() function (short form output)");
console.log("")

results = riskBattle.battle(greenArmies, redArmies);
reportResults(results);


function reportResults(results) {
  let ln1: string = "ATT  ";
  let ln2: string = "     ";
  let ln3: string = "     ";
  let ln4: string = "DEF  ";
  let ln5: string = "";

  ln1 = ln1.concat(astr(greenArmies));
  ln4 = ln4.concat(astr(redArmies));

  for (let i = 0; i < results.rolls.length; i++) {
    ln2 = ln2 + dstr(results.rolls[i].attRolls);
    ln3 = ln3 + dstr(results.rolls[i].defRolls);
    ln1 = ln1 + '         ' + astr(results.rolls[i].armies[0])
    ln4 = ln4 + '         ' + astr(results.rolls[i].armies[1])
  }

  if (results.result[1] === 0)
    {
      ln5 = "CONQUER";
    }
  else
    {
      ln5 = "FAIL TO CONQUER";
    }

  console.log(ln1);
  console.log(ln2);
  console.log(ln3);
  console.log(ln4);
  console.log(ln5);
  console.log(" ");

}


function dstr(rolls: number[]): string {
  let ss: string = '   ';
  rolls.forEach(function (roll) {
    ss = ss.concat(' ' + roll.toString());
  });
  ss = ss.concat('    ').slice(0, 11);
  return ss;
}

function astr(armies: number): string {
  let ss: string = '';
  if (armies < 10) {
    ss = ' ' + ss.concat(armies.toString());
  }
  else {
    ss = ss.concat(armies.toString());
  }
  return ss;
}
