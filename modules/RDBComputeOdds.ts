// A module to compute the exact odds of winning a Risk dice battle when
// Attacker and Defender each have a certain number of armies.
// jrs 2016

// Call with number of armies for Attacker and Defender, like this:

// computeOdds(8, 3)


class RDBComputeOdds {

  private p;
  private pd2;
  private pd3;
  private pdd2;
  private pdd3;

  constructor() {

    // CONSTANTS FOR PROBABILITIES

    // The probablity constants given here are expressed as '216ths'. That is,
    // they represent numerators of fractions with a denominator of 216. This
    // number is 6 to the third power. Any probability value for one, two or
    // three dice will have a denominator which divides into this number.

    // In simpler terms, dividing one of these values by 216 will give the
    // probability that the term represents.

    // pp[0] for any of these arrays is a dummy value. pp[6] represents the
    // probability of getting the indicated number of 6's, pp[5] represents
    // probabilities for 5 or greater, etc. pp[7] is set to zero to make it
    // easy to access the correct probability of rolling a number higher than 6.

    // The probabilities here were computed algebraicially, then confirmed by
    // Monte Carlo estimation using test03 and test04 in this project folder.


    // The probability of rolling d or greater when rolling one die is
    // represented by:  p[d] / 216
    let p: number[] = [0, 216, 180, 144, 108, 72, 36, 0];

    // The probability that the highest number rolled will be d or greater
    // when rolling two dice is represented by:  pd2[d] / 216
    let pd2: number[] = [0, 216, 210, 192, 162, 120, 66, 0];

    // The probability that the highest number rolled will be d or greater
    // when rolling three dice is represented by:  pd3[d] / 216
    let pd3: number[] = [0, 216, 215, 208, 189, 152, 91, 0];

    // The probability that both numbers rolled will be d or greater when
    // rolling two dice is represented by:  pdd2[d] / 216
    let pdd2: number[] = [0, 216, 150, 96, 54, 24, 6, 0];

    // The probability that the two highest numbers rolled will be d or greater
    // when rolling three dice is represented by:  pdd3[d] / 216
    let pdd3: number[] = [0, 216, 200, 160, 108, 56, 16, 0];
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

    let success: boolean = false;
    let err: string = 'required lesser function not available';
    let errParams = [attArmies, defArmies];

    result.success = success;
    result.err = err;
    result.errParams = errParams;
    return result;
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