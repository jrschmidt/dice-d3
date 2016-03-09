// A test for the computeOdds() function in module RDBComputeOdds.
// jrs 2016

// All this test does is call the computeOdds() function with the parameters
// supplied and print the contents of the returned 'results' object.

// Call with number of armies for Attacker and Defender like this:
// node RDBCtest01.js 12 10


import RDBComputeOdds = require('../modules/RDBComputeOdds');

let computeOdds = new RDBComputeOdds();

let attArmies: number = process.argv[2];
let defArmies: number = process.argv[3];

console.log(' ');
console.log('RUNNING test02 for RDBComputeOdds module');
console.log('Test of computeOdds() function');
console.log(' ');
console.log("Computing 'remainder' probabilities for Attacker and Defender");
console.log('when Attacker attacks with ' + attArmies);
console.log('and Defender defends with ' + defArmies);

let result: any = computeOdds.computeOdds(attArmies, defArmies);

console.log(' ');
console.log(result);
console.log(' ');

if (result.success) {
  let remAtt: number[] = result.remAtt;
  let remDef: number[] = result.remDef;
  let attTotal: number = 0;
  let defTotal: number = 0;

  for (let i: number = 0; i < remAtt.length; i++) {
    attTotal += remAtt[i];
  }

  for (let i: number = 0; i < remDef.length; i++) {
    defTotal += remDef[i];
  }

  console.log('Results for Attacker:');
  console.log('   probability of Attacker winning = ' + attTotal);
  for (let i: number = 2; i <= attArmies; i++) {
    console.log('   probability of Attacker winning with ' + i + ' armies remaining = ' + remAtt[i]);
  }

  console.log(' ');
  console.log('Results for Defender:');
  console.log('   probability of Defender winning = ' + defTotal);
  for (let i: number = 1; i <= defArmies; i++) {
    console.log('   probability of Defender winning with ' + i + ' armies remaining = ' + remDef[i]);
  }
  console.log(' ');
}
