// A test for the run() function in module RDBEstimateOdds.
// jrs 2016

// Call with number of armies for Attacker and Defender, and the number of
// repetitions desired, like this:
// node RDBtest04.ts 8 3 1000

import RDBEstimateOdds = require('./RDBEstimateOdds');

let greenArmies: number = process.argv[2];
let redArmies: number = process.argv[3];
let numberOfTests: number = process.argv[4];
let estOdds = new RDBEstimateOdds();
let results: any;

console.log("RUNNING test04 for 'RDBEstimateOdds' module");
console.log("test of run() function");
console.log("");

results = estOdds.run(greenArmies, redArmies, numberOfTests);
let ratio: number = results[0] / numberOfTests;
let percentage: number = ratio * 100;

console.log("Running " + numberOfTests + " tests with " + astr(greenArmies) + " attacking " + astr(redArmies));
console.log("   Attacker won " + results[0] + " times");
console.log("   Defender won " + results[1] + " times");
console.log("   Attacker won " + percentage + " percent of the time");
console.log("");
console.log("");


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
