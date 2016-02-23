// A module to execute the RiskDiceBattle.battle() function a large number of
// times with the same parameters in order to get an estimate of the chances
// of winning a Risk dice battle with a certain number of armies via "Monte
// Carlo methods."
// jrs 2016

// Call with number of armies for Attacker and Defender, and the number of
// repetitions desired, like this:

// run(8, 3, 1000)

import RiskDiceBattle = require('./RiskDiceBattle');

let riskBattle = new RiskDiceBattle();

class RDBEstimateOdds {

  run(greenArmies: number, redArmies: number, numberOfTests: number): number[] {
    let result: number[] = [0, 0];
    for (let i=0; i < numberOfTests; i++) {
      let results: any = riskBattle.battle(greenArmies, redArmies);
      if (results.result[0] > 1) {
        result[0] ++;
      }
      else {
        result[1] ++;
      }
    }
  return result;
  }

}

export = RDBEstimateOdds;
