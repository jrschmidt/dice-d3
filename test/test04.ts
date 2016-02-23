// A test to estimate odds of getting at least 2 dice greater than or equal to
// a desired number d with n dice.
// jrs 2016

// Use like this:
// node test03.js 4 2

import Dice = require('../modules/Dice');

let dice = new Dice();

let target: number = process.argv[2];
let diceUsed: number = process.argv[3];
let tests: number = 100000;
let wins: number = 0;

console.log("RUNNING test04 for 'Dice' module");
console.log("Estimating odds of rolling " + target + " or greater at least twice with " + diceUsed + " dice");

for (let i = 0; i < tests; i++) {
  let win1: boolean = false;
  let win2: boolean = false;
  let roll: number[] = dice.roll(diceUsed);
  for (let j = 0; j < roll.length; j++) {
    if (roll[j] >= target) {
      if (win1) {
        win2 = true;
      }
      else {
        win1 = true;
      }
    }
  }
  if (win2) {
    wins ++;
  }
}

let est: number = wins / tests;

console.log(" ");
console.log("The target was " + target);
console.log(diceUsed + " dice were used");
console.log(tests + " tests were run");
console.log("The estimate is " + est);
console.log(" ");
