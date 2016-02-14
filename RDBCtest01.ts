// A test for the computeOdds() function in module RDBComputeOdds.
// jrs 2016

// All this test does is call the computeOdds() function with the parameters
// supplied and print the contents of the returned 'results' object.

// Call with number of armies for Attacker and Defender like this:
// node RDBCtest01.ts


import RDBComputeOdds = require('./RDBComputeOdds');

console.log("RUNNING test01 for 'RDBComputeOdds' module");
console.log("test of computeOdds() function");

let computeOdds = new RDBComputeOdds();

let attArmies: number = process.argv[2];
let defArmies: number = process.argv[3];

let result: {} = computeOdds.computeOdds(attArmies, defArmies);

console.log(' ');
console.log(result);
console.log(' ');
