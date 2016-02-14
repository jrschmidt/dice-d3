// A module to compute the exact odds of winning a Risk dice battle when
// Attacker and Defender each have a certain number of armies.
// jrs 2016

// Call with number of armies for Attacker and Defender, like this:

// computeOdds(8, 3)


class RDBComputeOdds {

  computeOdds(attArmies: number, defArmies: number) {
    // let result: any = {};

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

    let success: boolean = false;
    let err: string = 'required lesser function not available';
    let errParams = [attArmies, defArmies];

    result.success = success;
    result.err = err;
    result.errParams = errParams;
    return result;
  }

}

export = RDBComputeOdds;
