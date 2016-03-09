// A module to compute the exact odds of winning a Risk dice battle when
// Attacker and Defender each have a certain number of armies.
// jrs 2016

// Call with number of armies for Attacker and Defender, like this:

// computeOdds(8, 3)


import RiskDiceProbabilities = require('../modules/RiskDiceProbabilities');

let rdbProbs = new RiskDiceProbabilities();

interface ResultObject {
    success: boolean,
    err?: string,
    errParams?: number[],
    remAtt?: number[],
    remDef?: number[],
    branches?: BranchesObject
}

interface RemainderOdds {
  remAtt: number[],
  remDef: number[],
}

interface BranchesObject {
  branchType: string
}

interface Branches2 extends BranchesObject {
  pw: ProbabilityBranch,
  pl: ProbabilityBranch
}

interface Branches3 extends BranchesObject {
  pww: ProbabilityBranch,
  pwl: ProbabilityBranch,
  pll: ProbabilityBranch
}

interface ProbabilityBranch {
  terminalBranch: boolean,
  probability: number,
  remAtt: number[],
  remDef: number[]
}


class RDBComputeOdds {
  private maxArmies;
  private rdbProbs;

  constructor() {

    // Maximum armies for one side this module will accept.
    this.maxArmies = 16;
  }

  // Recursively compute probabilities for the various possible
  // results for A armies attacking and D armies defending by
  // computing probabilities for each permutation branching
  // from P(A,D) and merging those results, multiplying each
  // result set by the probability that that branch will be
  // reached.
  computeOdds(attArmies: number, defArmies: number) {

    let result: ResultObject = {success: false};

    if (this.isInputBad(attArmies, defArmies)) {
      result.err = "invalid input parameters";
      result.errParams = [attArmies, defArmies];
    }

    else if (defArmies < 1) {
        result = this.terminalBranchWin(attArmies, defArmies);
    }

    else if (attArmies < 2) {
      result = this.terminalBranchLose(attArmies, defArmies);
    }

    else if (defArmies < 2 || attArmies < 3) {
      result = this.computeOdds1ArmyLost(attArmies, defArmies);
    }

    else {
      result = this.computeOdds2ArmiesLost(attArmies, defArmies);
    }

    return result;
  }


  // Process a result node with 2 branches ('WIN', 'LOSE').
  private computeOdds1ArmyLost(attArmies: number, defArmies: number) {
    let result: ResultObject = {success: false};

    if (attArmies != 2 && defArmies != 1) {
      result.err = 'computeOdds1ArmyLost() called with bad parameters';
      result.errParams = [attArmies, defArmies];
    }

    else {
      let dice: number[] = this.diceUsed(attArmies, defArmies);
      let probs: number[] = rdbProbs.getProbs(dice[0], dice[1]);
      let pwResult: ResultObject = this.computeOdds(attArmies, defArmies - 1);
      let plResult: ResultObject = this.computeOdds(attArmies - 1, defArmies);
      let mergeResult: RemainderOdds = this.merge(attArmies, defArmies, probs, [pwResult, plResult]);
      result.success = true;
      result.remAtt = mergeResult.remAtt;
      result.remDef = mergeResult.remDef;
    }

    return result;
  }


  // Process a result node with 3 branches ('WIN-WIN', 'WIN-LOSE', 'LOSE-LOSE').
  private computeOdds2ArmiesLost(attArmies: number, defArmies: number) {
    let result: ResultObject = {success: false};

    if (attArmies < 3 || defArmies < 2) {
      result.err = 'computeOdds2ArmiesLost() called with bad parameters';
      result.errParams = [attArmies, defArmies];
    }

    else {
      let dice: number[] = this.diceUsed(attArmies, defArmies);
      let probs: number[] = rdbProbs.getProbs(dice[0], dice[1]);
      let pwwResult: ResultObject = this.computeOdds(attArmies, defArmies - 2);
      let pwlResult: ResultObject = this.computeOdds(attArmies -1, defArmies - 1);
      let pllResult: ResultObject = this.computeOdds(attArmies - 2, defArmies);
      let mergeResult: RemainderOdds = this.merge(attArmies, defArmies, probs, [pwwResult, pwlResult, pllResult]);
      result.success = true;
      result.remAtt = mergeResult.remAtt;
      result.remDef = mergeResult.remDef;
    }


    return result;
  }


  // Process a result node that has no branches because Defender now
  // has zero armies (Attacker wins the battle).
  private terminalBranchWin(attArmies: number, defArmies: number) {
    let result: ResultObject = {success: false};

    if (attArmies < 2 || defArmies > 0) {
        result.err = 'terminalBranchWin() called with bad parameters';
        result.errParams = [attArmies, defArmies];
    }

    result.success = true;
    result.remAtt = this.rems100Percent(attArmies);
    result.remDef = [0];

    return result;
  }


  // Process a result node that has no branches because Attacker only
  // has one army left and can no longer attack (Attacker loses the battle).
  private terminalBranchLose(attArmies: number, defArmies: number) {
    let result: ResultObject = {success: false};

    if (attArmies > 1 || defArmies < 1) {
      result.err = 'terminalBranchLose() called with bad parameters';
      result.errParams = [attArmies, defArmies];
    }

    result.success = true;
    result.remAtt = [0];
    result.remDef = this.rems100Percent(defArmies);

    return result;
  }


  // Merge 'remainder arrays' (an array of probabilities that Attacker or
  // Defender will have 1, 2, 3, etc. armies left after the battle) for
  // each branch ('WIN', 'LOSE' for 1 army lost, or 'WIN-WIN', 'WIN-LOSE',
  // 'LOSE-LOSE' for 2 armies lost).
  private merge(maxAtt: number, maxDef: number, probs: number[], results: ResultObject[]): RemainderOdds {

    let rems: RemainderOdds = {
      remAtt: [0, 0],
      remDef: [0]
    }

    // Extract Attacker's remainder arrays for each branch.
    let remsArrayAtt: number[][] = [];
    for (let i: number = 0; i < results.length; i++) {
      remsArrayAtt.push(results[i].remAtt);
    }

    // Extract Defender's remainder arrays for each branch.
    let remsArrayDef: number[][] = [];
    for (let i: number = 0; i < results.length; i++) {
      remsArrayDef.push(results[i].remDef);
    }

    // Up to the length of the longest Attacker remainder array ...
    for (let i: number = 2; i <= maxAtt; i++) {

      let sum: number = 0;
      // For each branch...
      for (let j: number = 0; j < results.length; j++) {
        if (remsArrayAtt[j].length > i) {
          sum += remsArrayAtt[j][i] * probs[j];
        }
      }
      rems.remAtt.push(sum);
    }

    // Up to the length of the longest Defender remainder array ...
    for (let i: number = 1; i <= maxDef; i++) {

      let sum: number = 0;
      // For each branch...
      for (let j: number = 0; j < results.length; j++) {
        if (remsArrayDef[j].length > i) {
          sum += remsArrayDef[j][i] * probs[j];
        }
      }
      rems.remDef.push(sum);
    }

    return rems
  }


  // Returns number[] with last value = 1.0 and other values = 0
  private rems100Percent(max: number): number[] {
    let vals: number[] = [];
    for (let i: number = 0; i < max; i++) {vals.push(0);}
    vals[max] = 1.0;
    return vals;
  }


  private isInputBad(attArmies: number, defArmies: number): boolean {
    if (! (attArmies >= 1) ||
        ! (defArmies >= 0) ||
        attArmies > this.maxArmies ||
        defArmies > this.maxArmies ||
        attArmies - Math.floor(attArmies) > 0 ||
        defArmies - Math.floor(defArmies) > 0 )
      {return true;}
    else { return false;}
  }


  // How many dice are used by Attacker and Defender, based on
  // the number of armies each one has.
  private diceUsed(attArmies: number, defArmies: number) {
    let att: number;
    let def: number;

    if (attArmies > 3) {att = 3;}
    else {
      if (attArmies == 3) {att = 2;}
      else {
        if (attArmies == 2) {att = 1;}
        else {att = 0;}
      }
    }

    if (defArmies > 1) {def = 2;}
    else {
      if (defArmies == 1) {def = 1;}
      else {def = 0;}
    }

    return [att, def];
  }


}

export = RDBComputeOdds;
