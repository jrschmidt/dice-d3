// Estimate the probablitities for different results if Attacker uses a certain
// number of dice and Defender uses a certain number of dice, including the
// probabilities that the Attacker or Defender will have a specific number of
// armies left after the battle.
// jrs 2016

// Call with number of armies for Attacker and Defender, and the number of
// repetitions desired, like this:
// node RDBtest05.ts 8 3 1000

import Dice = require('./Dice');

let attDice: number = process.argv[2];
let defDice: number = process.argv[3];
let numberOfTests: number = process.argv[4];
let dice = new Dice();
let results: any;

console.log("RUNNING test05 for 'RDBEstimateOdds' module");
console.log("");

results = dice.roll(attDice, defDice);
// let ratio: number = results[0] / numberOfTests;
// let percentage: number = ratio * 100;
//
// console.log("Running " + numberOfTests + " tests with " + dstr(attDice) + " attacking and " + dstr(defDice) + "defending");
// console.log("   Attacker won " + results[0] + " times");
// console.log("   Defender won " + results[1] + " times");
// console.log("   Attacker won " + percentage + " percent of the time");
// console.log("");
// console.log("");


function dstr(n: number): string {
  if (n === 1)
    return '1 die';
  else
  return n + ' dice';
}
