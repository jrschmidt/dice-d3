// A test for the battle() function in module RiskDiceBattle.
// jrs 2016

// Call with number of armies for Attacker and Defender like this:
// node RDBtest02.ts 8 3

import RiskDiceBattle = require('./RiskDiceBattle');

let greenArmies: number = process.argv[2];
let redArmies: number = process.argv[3];
let riskBattle = new RiskDiceBattle();
let results: any;

console.log("RUNNING test02 for 'RiskDiceBatle' module");
console.log("test of battle() function");
console.log("")

results = riskBattle.battle(greenArmies, redArmies);
reportResults(results);


function reportResults(results) {
  console.log("Green has " + astr(greenArmies) );
  console.log("Red has " + astr(redArmies) );
  console.log("")

  for (let i = 0; i < results.rolls.length; i++) {
    console.log("Green attacks Red with " + dstr(results.rolls[i].dice[0]) );
    console.log("Red defends with " + dstr(results.rolls[i].dice[1]) );
    console.log("Green rolls  " + results.rolls[i].attRolls);
    console.log("Red rolls  " + results.rolls[i].defRolls);
    if (results.rolls[i].loss[0] > 0)
      console.log("Green loses " + astr(results.rolls[i].loss[0]) );
    if (results.rolls[i].loss[1] > 0)
      console.log("Red loses " + astr(results.rolls[i].loss[1]) );
    console.log("Green has " + astr(results.rolls[i].armies[0]) + " left");
    console.log("Red has " + astr(results.rolls[i].armies[1]) + " left");
    console.log("");
  }

  if (results.result[1] === 0)
    {
      console.log("Red's armies are gone")
      console.log("Green has " + astr(results.result[0]) + " remaining")
      console.log("Green conquers the territory")
    }
  else
    {
      console.log("Green has one army left")
      console.log("Red has " + astr(results.result[1]) + " remaining")
      console.log("Green fails to conquer the territory")
    }

  console.log();

}


function dstr(n: number): string {
  if (n === 1)
    return '1 die';
  else
  return n + ' dice';
}

function astr(n: number): string {
  if (n > 1)
    return n + ' armies';
  else
    if (n < 1)
      return 'no armies';
    else
      return '1 army';
}
