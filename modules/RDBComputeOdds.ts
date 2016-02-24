// A module to compute the exact odds of winning a Risk dice battle when
// Attacker and Defender each have a certain number of armies.
// jrs 2016

// Call with number of armies for Attacker and Defender, like this:

// computeOdds(8, 3)


class RDBComputeOdds {
  private maxArmies;

  constructor() {

    // Maximum armies for one side this module will accept.
    let maxArmies: number = 30;
  }


  computeOdds(attArmies: number, defArmies: number) {

    let result: {
      success: boolean,
      err?: string,
      errParams?: number[],
      prob?: number,
      value216?: number,
      exponent216?: number,
      remAtt?: number[],
      remDef?: number[],
    };

    result = {success: false};

    let badInput: boolean = this.isInputBad(attArmies, defArmies);
    if (badInput) {
      result.err = "invalid input parameters";
      result.errParams = [attArmies, defArmies];

    }
    else {
      result.err = 'required lesser function not available';
      result.errParams = [attArmies, defArmies];
    }

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
