// A test for the computeOdds() function in module RDBComputeOdds.
// jrs 2016

// All this test does is call the computeOdds() function with the parameters
// supplied and print the contents of the returned 'results' object.

// Call with number of armies for Attacker and Defender like this:
// node RDBCtest01.js 12 10


import RDBComputeOdds = require('../modules/RDBComputeOdds');

console.log(" ");
console.log("RUNNING test01 for 'RDBComputeOdds' module");
console.log("test of computeOdds() function");

let computeOdds = new RDBComputeOdds();

let attArmies: number = process.argv[2];
let defArmies: number = process.argv[3];

let result: any = computeOdds.computeOdds(attArmies, defArmies);
let remAtt: number[] = result.remAtt;
let remDef: number[] = result.remDef;

console.log(' ');
console.log(result);
console.log(' ');

let attTotal: number = 0;
let defTotal: number = 0;

for (let i: number = 0; i < remAtt.length; i++) {
  attTotal += remAtt[i];
}

for (let i: number = 0; i < remDef.length; i++) {
  defTotal += remDef[i];
}

console.log("   probability of Attacker winning = " + attTotal);
console.log("   probability of Defender winning = " + defTotal);
console.log("");
