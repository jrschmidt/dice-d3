// A module to compute the exact odds of winning a Risk dice battle when
// Attacker and Defender each have a certain number of armies.
// jrs 2016

// Call with number of armies for Attacker and Defender, like this:

// computeOdds(8, 3)


import RiskDiceProbabilities = require('../modules/RiskDiceProbabilities');


interface ResultObject {
    success: boolean,
    err?: string,
    errParams?: number[],
    prob?: number,
    remAtt?: number[],
    remDef?: number[],
}


class RDBComputeOdds {
  private maxArmies;

  constructor() {

    let probsRD = new RiskDiceProbabilities();

    // Maximum armies for one side this module will accept.
    let maxArmies: number = 30;
  }


  computeOdds(attArmies: number, defArmies: number) {

    let result: ResultObject = {success: false};
    let newResult: ResultObject = {success: false};

    if (this.isInputBad(attArmies, defArmies)) {
      result.err = "invalid input parameters";
      result.errParams = [attArmies, defArmies];
    }

    else {
      if (defArmies < 2 || attArmies < 3) {
        newResult = this.computeOdds1ArmyLost(attArmies, defArmies);
      }
      else {
        newResult = this.computeOdds2ArmiesLost(attArmies, defArmies);
      }

      result = newResult;
    }

    return result;
  }


private computeOdds1ArmyLost(attArmies: number, defArmies: number) {
  let result: ResultObject = {success: false};

  if (attArmies == 2 && defArmies == 1) {
    result.success = true;
    result.prob = 15 / 36;
    result.remAtt = [ 0, 0, 0.416666 ];
    result.remDef = [ 0, 0.583333 ];
  }

  else {
    result.err = 'required lesser function not available';
    result.errParams = [attArmies, defArmies];
  }

  return result;
}


private computeOdds2ArmiesLost(attArmies: number, defArmies: number) {
  let result: ResultObject = {success: false};

  result.err = 'required lesser function not available';
  result.errParams = [attArmies, defArmies];

  return result;
}


  private isInputBad(attArmies: number, defArmies: number): boolean {
    if (! (attArmies > 1) ||
        ! (defArmies > 0) ||
        attArmies > 30 ||
        defArmies > 30 ||
        attArmies - Math.floor(attArmies) > 0 ||
        defArmies - Math.floor(defArmies) > 0 )
      {return true;}
    else { return false;}
  }


  private diceUsed(attArmies: number, defArmies: number) {
    let att: number;
    let def: number;

    if (attArmies > 3) {att = 3;}
    else {
      if (attArmies === 3) {att = 2;}
      else {
        if (attArmies === 2) {att = 1;}
        else {att = 0;}
      }
    }

    if (defArmies > 1) {def = 2;}
    else {
      if (defArmies === 1) {def = 1;}
      else {def = 0;}
    }

    return [att, def];
  }

}

export = RDBComputeOdds;
