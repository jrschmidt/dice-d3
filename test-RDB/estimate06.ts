// Estimate the probablitities that the Attacker will lose two armies, the
// Defender will lose two armies, or each side will lose one army, when Attacker
// and Defender each use two dice and the Defender rolls [d1, d2]. Shows answers
// as '36ths' for easy comparision wih hand-calculated numbers.
// jrs 2016

// Call with the Defender's result you wish to test against, with the values for
// d1 and d2, like this:

// node estimate06.js 3 2

// d1 must be greater or equal to d2.


import Dice = require('../Dice');

let d1: number = process.argv[2];
let d2: number = process.argv[3];
let dice = new Dice();

let numberOfTests: number = 100000;

let defRoll: number[] = [d1, d2];

console.log("RUNNING 'estimate06' program");
console.log("Estimating probabilities for Attacker to win, lose or tie");
console.log("   when Attacker attacks with 2 dice");
console.log("   and Defender rolls " + d1 + ", " + d2);
console.log("Running test " + numberOfTests + " times");
console.log("");

let defLose: number = 0;
let attLose: number = 0;
let eachLose1: number = 0;

for (let i: number = 0; i < numberOfTests; i++) {
  let attRoll: number[] = dice.roll(2).sort().reverse();

  if (attRoll[0] > defRoll[0]) {
    if (attRoll[1] > defRoll[1]) {defLose ++;}
    else {eachLose1 ++;}
  }
  else {
    if (attRoll[1] > defRoll[1]) {eachLose1 ++;}
    else {attLose ++;}
  }

}

let probAtt: number = defLose / numberOfTests;
let probDef: number = attLose / numberOfTests;
let pA36: number = probAtt * 36;
let pD36: number = probDef * 36;
let oneEach: number = 1.0 - probAtt - probDef;
let oneEach36: number = oneEach * 36;

console.log("probablity of Defender losing two armies:");
console.log("   = " + probAtt);
console.log("   ~ " + pA36 + " / 36");
console.log(" ");
console.log("probablity of Attacker and Defender each losing one army:");
console.log("   = " + oneEach);
console.log("   ~ " + oneEach36 + " / 36");
console.log(" ");
console.log("probablity of Attacker losing two armies:");
console.log("   = " + probDef);
console.log("   ~ " + pD36 + " / 36");
console.log(" ");
