// Run the Dice module multiple times and show statistics.
// jrs 2016

import Dice = require('../modules/Dice');

console.log("RUNNING test02 for 'Dice' module");
console.log("test of roll() function");

let dice = new Dice();

const runs: number = 600;
let hits: number[] = [0,0,0,0,0,0,0];
let n: number;

for (let i = 0; i < runs; i++) {
  let dd: number[] = dice.roll(10);
  for (let j = 0; j < 10; j++) {
    n = dd[j];
    hits[n] = hits[n] + 1;
  }
}

console.log(" ");
console.log("   10 dice were rolled 600 times for a total of 6000 dice rolls.");
for (let nn = 1; nn < 7; nn++) {
  console.log("     " + nn + " was rolled " + hits[nn] + " times.");
}
console.log(" ");
