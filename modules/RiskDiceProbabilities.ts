// A module to supply constants for probabilities in Risk-style dice battles.
// jrs 2016

// Use like this:

// import  RiskDiceProbabilities = require('./RiskDiceProbabilities');
// let probs = new RiskDiceProbabilities();
//
// let probs1v1 = probs.get1v1Probs();
// let probs1v2 = probs.get1v2Probs();
// let probs2v1 = probs.get2v1Probs();
// let probs2v2 = probs.get2v2Probs();
// let probs3v1 = probs.get3v1Probs();
// let probs3v2 = probs.get3v2Probs();
//

class RiskDiceProbabilities {

  private probs1v1;
  private probs1v2;
  private probs2v1;
  private probs2v2;
  private probs3v1;
  private probs3v2;


  constructor() {


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



    // Probabilities for Attacker rolling 1 die and Defender rolling 1 die.

    let probs1v1: number[][] = [
      [],
      [180, 36],
      [144, 72],
      [108, 108],
      [72, 144],
      [36, 180],
      [0, 216]
    ];


    // Probabilities for Attacker rolling 1 die and Defender rolling 2 dice.

    let probs1v2: number[][] = probs1v1;


    // Probabilities for Attacker rolling 2 dice and Defender rolling 1 die.

    let probs2v1: number[][] = [
      [],
      [210, 6],
      [192, 24],
      [162, 54],
      [120, 96],
      [66, 150],
      [0, 216]
    ];


    // Probabilities for Attacker rolling 3 dice and Defender rolling 1 die.

    let probs3v1: number[][] = [
      [],
      [215, 1],
      [208, 8],
      [189, 27],
      [152, 64],
      [91, 125],
      [0, 216]
    ];



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


    // Probabilities for Attacker rolling 2 dice and Defender rolling 2 dice.

    let probs2v2: number[][][] = [
      [],

      [
        [],
        [25, 10, 1]
      ],

      [
        [],
        [24, 9, 3],
        [16, 16, 4]
      ],

      [
        [],
        [21, 10, 5],
        [15, 13, 8],
        [9, 18, 9]
      ],

      [
        [],
        [16, 13, 7],
        [12, 12, 12],
        [8, 13, 15],
        [4, 16, 16]
      ],

      [
        [],
        [9, 18, 9],
        [7, 13, 16],
        [5, 10, 21],
        [3, 9, 24],
        [1, 10, 25]
      ],

      [
        [],
        [0, 25, 11],
        [0, 16, 20],
        [0, 9, 27],
        [0, 4, 32],
        [0, 1, 35],
        [0, 0, 36]
      ]

    ];


    // Probabilities for Attacker rolling 3 dice and Defender rolling 2 dice.

    let probs3v2: number[][][] = [
      [],

      [
        [],
        [200, 15, 1]
      ],

      [
        [],
        [196, 16, 4],
        [160, 48, 8]
      ],

      [
        [],
        [180, 29, 7],
        [153, 43, 20],
        [108, 81, 27]
      ],

      [
        [],
        [146, 60, 10],
        [128, 56, 32],
        [98, 64, 54],
        [56, 96, 64]
      ],

      [
        [],
        [88, 115, 13],
        [79, 93, 44],
        [64, 71, 81],
        [43, 61, 112],
        [16, 75, 125]
      ],

      [
        [],
        [0, 200, 16],
        [0, 160, 56],
        [0, 108, 108],
        [0, 56, 160],
        [0, 16, 200],
        [0, 0, 216]
      ]

    ];

  }


  get1v1Probs() {
    let rt: number[][] = this.probs1v1.clone();
    return rt;
  }


  get1v2Probs() {
    let rt: number[][] = this.probs1v2.clone();
    return rt;
  }


  get2v1Probs() {
    let rt: number[][] = this.probs2v1.clone();
    return rt;
  }


  get2v2Probs() {
    let rt: number[][][] = this.probs2v2.clone();
    return rt;
  }


  get3v1Probs() {
    let rt: number[][] = this.probs3v1.clone();
    return rt;
  }


  get3v2Probs() {
    let rt: number[][][] = this.probs3v2.clone();
    return rt;
  }


}

export = RiskDiceProbabilities;
