// Estimate the probablitities when either player uses two or more dice,
// including the probabilities that the Attacker will lose two armies, the
// Defender will lose two armies, or each side will lose one army.
// jrs 2016

// Call with number of dice for Attacker and Defender, and the number of
// repetitions desired, like this:
// node RDBtest05.js 3 2 1000

import Dice = require('../modules/Dice');

let attDice: number = process.argv[2];
let defDice: number = process.argv[3];
let numberOfTests: number = process.argv[4];
let dice = new Dice();

console.log("RUNNING test05 for 'RDBEstimateOdds' module");
console.log("estimating probabilities for " + dstr(attDice) + " attacking " + dstr(defDice));
console.log("running test " + numberOfTests + " times");
console.log("");

let defLose: number = 0;
let attLose: number = 0;
let eachLose1: number = 0;

let dd: number;
if (attDice > 1 && defDice > 1) {
  dd = 2;
}
else {
  dd = 1;
}

for (let i: number = 0; i < numberOfTests; i++) {
  let attRoll: number[] = dice.roll(attDice).sort().reverse();
  let defRoll: number[] = dice.roll(defDice).sort().reverse();

  if (dd === 1) {

    if (attRoll[0] > defRoll[0]) {defLose ++;}
    else {attLose ++;}
  }

  else {
    if (attRoll[0] > defRoll[0]) {
      if (attRoll[1] > defRoll[1]) {defLose ++;}
      else {eachLose1 ++;}
    }
    else {
      if (attRoll[1] > defRoll[1]) {eachLose1 ++;}
      else {attLose ++;}
    }
  }

}

if (dd === 1) {
  let probAtt: number = defLose / numberOfTests;
  let probDef: number = 1.0 - probAtt;
  console.log("probablity of Defender losing one army = " + probAtt);
  console.log("probablity of Attacker losing one army = " + probDef);
}

else {
  let probAtt: number = defLose / numberOfTests;
  let probDef: number = attLose / numberOfTests;
  let oneEach: number = 1.0 - probAtt - probDef;
  console.log("probablity of Defender losing two armies = " + probAtt);
  console.log("probablity of Attacker losing two armies = " + probDef);
  console.log("probablity of Attacker and Defender each losing one army = " + oneEach);
}

console.log(" ");


function dstr(n: number): string {
  if ( n == 1) {return '1 die';}
  else {return n + ' dice';}
}
