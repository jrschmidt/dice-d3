// A module to supply constants for probabilities in Risk-style dice battles.
// jrs 2016

// Use like this:

// import  RiskDiceProbabilities = require('./RiskDiceProbabilities');
// let probs = new RiskDiceProbabilities();
//
// let probs1v1 = probs.get2v2Probs();
// let probs1v2 = probs.get2v2Probs();
// let probs2v1 = probs.get2v2Probs();
// let probs2v2 = probs.get2v2Probs();
// let probs3v1 = probs.get2v2Probs();
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

    let probs1v1: number[][] = [];


    let probs1v2: number[][] = [];


    let probs2v1: number[][] = [];


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



    let probs3v1: number[][] = [
    ];


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
