// Estimate 'remainder' probabilities with Monte Carlo methods (the probabilities
// that Attacker or Defender will have 2, 3, ... armies left after the battle).
// jrs 2016

// Call with number of armies for Attacker and Defender like this:
// node estimate08.js 8 3

import RiskDiceBattle = require('../modules/RiskDiceBattle');

let attArmies: number = process.argv[2];
let defArmies: number = process.argv[3];

let numberOfTests: number = 100000;

let remsAtt: number[] = zeroesArray(attArmies);
let remsDef: number[] = zeroesArray(defArmies);
let attTotal: number = 0;
let defTotal: number = 0;

console.log("RUNNING 'estimate08' program");
console.log("Estimating 'remainder' probabilities for Attacker and Defender");
console.log("   when Attacker attacks with " + attArmies);
console.log("   and Defender defends with " + defArmies);
console.log("Running test " + numberOfTests + " times");
console.log("");

let riskBattle = new RiskDiceBattle();
let results: any;

for (let i: number = 0; i < numberOfTests; i++) {
  results = riskBattle.battle(attArmies, defArmies);

  if (results.result[1] === 0)
    {
      remsAtt[results.result[0]] ++;
      attTotal ++;
    }
  else
    {
      remsDef[results.result[1]] ++;
      defTotal ++;
    }

}

let probsAtt: number = attTotal / numberOfTests;
let probsDef: number = defTotal / numberOfTests;

console.log("Results for Attacker:");
console.log("   probability of Attacker winning = " + probsAtt);
console.log("");
for (let i: number = 2; i <= attArmies; i++) {
  let prob: number = remsAtt[i] / numberOfTests;
  console.log("   probability of Attacker winning with " + i + " armies remaining = " + prob);
}

console.log(" ");
console.log("Results for Defender:");
console.log("   probability of Defender winning = " + probsDef);
console.log("");
for (let i: number = 1; i <= defArmies; i++) {
  let prob: number = remsDef[i] / numberOfTests;
  console.log("   probability of Defender winning with " + i + " armies remaining = " + prob);
}
console.log(" ");


// Returns number[] with all values = 0
function zeroesArray(size: number): number[] {
  let vals: number[] = [];
  for (let i: number = 0; i <= size; i++) {vals.push(0);}
  return vals;
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
