// A module to supply constants for probabilities in Risk-style dice battles.
// jrs 2016


// Use like this:

// import  RiskDiceProbabilities = require('../modules/RiskDiceProbabilities');
// let probs = new RiskDiceProbabilities();
//
// let probs1v1 = probs.getProbs1v1();
// let probs1v2 = probs.getProbs1v2();
// let probs2v1 = probs.getProbs2v1();
// let probs2v2 = probs.getProbs2v2();
// let probs3v1 = probs.getProbs3v1();
// let probs3v2 = probs.getProbs3v2();
//


// RULES FOR DICE BATTLES
// WHEN DEFENDER ONLY ROLLS 1 DIE
// OR ATTACKER ONLY ROLLS 1 DIE:

// Only one army can be lost in a contest where either the Attacker or the
// Defender only rolls one die. If Attacker rolls 2 or 3 dice and Defender
// only rolls one die, then Attacker's highest die is compared with the
// Defender's roll. If Defender rolls 2 dice and Attacker only rolls
// one die, then the Attacker's roll is compared with the Defender's highest
// die. Defender loses one army if their result is lower than the Attacker's,
// otherwise the Attacker loses one army ("Tie goes to the Defender").


// RULES FOR DICE BATTLES
// WHEN DEFENDER ROLLS 2 DICE
// AND ATTACKER ROLLS 2 OR 3 DICE:

// A total of two armies will be lost for each roll. Either Defender will
// lose 2 armies ('WW'), Defender and Attacker will each lose one army
// ('WL'), or Attacker will lose 2 armies ('LL'). Results are computed by
// first comparing Attacker's highest die with Defender's highest die, then
// comparing Attacker's second highest to Defender's second highest. For
// each comparision, Defender loses one army if their die is lower than
// Attacker's die, and Attacker loses one army if their die is lower or
// equal to Defender's die ("Tie goes to the Defender").


class RiskDiceProbabilities {

  private pgd1;
  private pgd2;
  private pgd3;
  private pgdd2;
  private pgdd3;


  constructor() {

    // The probability of rolling d or greater when rolling one die is
    // represented by:  p[d] / 216
    let pgd1: number[] = [0, 216, 180, 144, 108, 72, 36, 0];

    // The probability that the highest number rolled will be d or greater
    // when rolling two dice is represented by:  pd2[d] / 216
    let pgd2: number[] = [0, 216, 210, 192, 162, 120, 66, 0];

    // The probability that the highest number rolled will be d or greater
    // when rolling three dice is represented by:  pd3[d] / 216
    let pgd3: number[] = [0, 216, 215, 208, 189, 152, 91, 0];

    // The probability that both numbers rolled will be d or greater when
    // rolling two dice is represented by:  pdd2[d] / 216
    let pgdd2: number[] = [0, 216, 150, 96, 54, 24, 6, 0];

    // The probability that the two highest numbers rolled will be d or greater
    // when rolling three dice is represented by:  pdd3[d] / 216
    let pgdd3: number[] = [0, 216, 200, 160, 108, 56, 16, 0];

  }  // end of constructor()


  // Getter methods

  // Probabilities for Attacker rolling 1 die and Defender rolling 1 die.

  getProbs1v1() {
    let pw: number = 15 / 36;
    let pl: number = 21 / 36;
    return [pw, pl];
  }


  // Probabilities for Attacker rolling 1 die and Defender rolling 2 dice.

  getProbs1v2() {
    let pw: number = 55 / 216;
    let pl: number = 161 / 216;
    return [pw, pl];
  }


  // Probabilities for Attacker rolling 2 dice and Defender rolling 1 die.

  getProbs2v1() {
    let pw: number = 125 / 216;
    let pl: number = 91 / 216;
    return [pw, pl];
  }


  // Probabilities for Attacker rolling 2 dice and Defender rolling 2 dice.

  getProbs2v2() {
    let pww: number = 295 / 1296;
    let pwl: number = 420 / 1296;
    let pll: number = 581 / 1296;
    return [pww, pwl, pll];
  }


  // Probabilities for Attacker rolling 3 dice and Defender rolling 1 die.

  getProbs3v1() {
    let pw: number = 855 / 1296;
    let pl: number = 441 / 1296;
    return [pw, pl];
  }


  // Probabilities for Attacker rolling 3 dice and Defender rolling 2 dice.

  getProbs3v2() {
    let pww: number = 2890 / 7776;
    let pwl: number = 2611 / 7776;
    let pll: number = 2275 / 7776;
    return [pww, pwl, pll];
  }


  getPd1() {
    let rt: number[][] = this.pgd1.clone();
    return rt;
  }


  getPd2() {
    let rt: number[][] = this.pgd2.clone();
    return rt;
  }


  getPd3() {
    let rt: number[][] = this.pgd3.clone();
    return rt;
  }


  getPdd2() {
    let rt: number[][] = this.pgdd2.clone();
    return rt;
  }


  getPdd3() {
    let rt: number[][] = this.pgdd3.clone();
    return rt;
  }


}

export = RiskDiceProbabilities;
