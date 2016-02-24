// A module to supply constants for probabilities in Risk-style dice battles.
// jrs 2016


// Use like this:

// import  RiskDiceProbabilities = require('../modules/RiskDiceProbabilities');
// let probs = new RiskDiceProbabilities();
//
// let probs1v1 = probs.get1v1Probs();
// let probs1v2 = probs.get1v2Probs();
// let probs2v1 = probs.get2v1Probs();
// let probs2v2 = probs.get2v2Probs();
// let probs3v1 = probs.get3v1Probs();
// let probs3v2 = probs.get3v2Probs();
//


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
// Monte Carlo estimation using test scripts in this project folder.



class RiskDiceProbabilities {

  private pgd1;
  private pgd2;
  private pgd3;
  private pgdd2;
  private pgdd3;

  private probs1v1;
  private probs1v2;
  private probs2v1;
  private probs2v2;
  private probs3v1;
  private probs3v2;



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
        [150, 60, 6],
      ],

      [
        [],
        [144, 54, 18],
        [96, 96, 24],
      ],

      [
        [],
        [126, 60, 30],
        [90, 78, 48],
        [54, 108, 54],
      ],

      [
        [],
        [96, 78, 42],
        [72, 72, 72],
        [48, 78, 90],
        [24, 96, 96],
      ],

      [
        [],
        [54, 108, 54],
        [42, 78, 96],
        [30, 60, 126],
        [18, 54, 144],
        [6, 60, 150],
      ],

      [
        [],
        [0, 150, 66],
        [0, 96, 120],
        [0, 54, 162],
        [0, 24, 192],
        [0, 6, 210],
        [0, 0, 216],
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

  }  // end of constructor()


  // Getter methods

  getPd1() {
    let rt: number[][] = this.pd1.clone();
    return rt;
  }


  getPd2() {
    let rt: number[][] = this.pd2.clone();
    return rt;
  }


  getPd3() {
    let rt: number[][] = this.pd3.clone();
    return rt;
  }


  getPdd2() {
    let rt: number[][] = this.pdd2.clone();
    return rt;
  }


  getPdd3() {
    let rt: number[][] = this.pdd3.clone();
    return rt;
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
