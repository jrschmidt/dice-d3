// A module to supply constants for probabilities in Risk-style dice battles.
// jrs 2016


// Use like this:

// import  RiskDiceProbabilities = require('../modules/RiskDiceProbabilities');
// let probs = new RiskDiceProbabilities();
//
// (example: probabilities for 3 dice attacking 2 dice)
// let probs3v2 = probs.getProbs(3,2);
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

  private probs;


  constructor() {
    this.probs = [ [], [], [], [] ];
    let pw: number;
    let pl: number;
    let pww: number;
    let pwl: number;
    let pll: number;

    // Probabilities for Attacker rolling 1 die and Defender rolling 1 die.
    pw = 15 / 36;
    pl = 21 / 36;
    this.probs[1][1] = [pw, pl];

    // Probabilities for Attacker rolling 1 die and Defender rolling 2 dice.
    pw = 55 / 216;
    pl = 161 / 216;
    this.probs[1][2] = [pw, pl];

    // Probabilities for Attacker rolling 2 dice and Defender rolling 1 die.
    pw = 125 / 216;
    pl = 91 / 216;
    this.probs[2][1] = [pw, pl];

    // Probabilities for Attacker rolling 2 dice and Defender rolling 2 dice.
    pww = 295 / 1296;
    pwl = 420 / 1296;
    pll = 581 / 1296;
    this.probs[2][2] = [pww, pwl, pll];

    // Probabilities for Attacker rolling 3 dice and Defender rolling 1 die.
    pw = 855 / 1296;
    pl = 441 / 1296;
    this.probs[3][1] = [pw, pl];

    // Probabilities for Attacker rolling 3 dice and Defender rolling 2 dice.
    pww = 2890 / 7776;
    pwl = 2611 / 7776;
    pll = 2275 / 7776;
    this.probs[3][2] = [pww, pwl, pll];

  }  // end of constructor()


  // Getter method

  // Return probabilities for a given number of Attacker and Defender dice
  getProbs(dA: number, dD: number): number[] {
    return this.probs[dA][dD];
  }


}

export = RiskDiceProbabilities;
