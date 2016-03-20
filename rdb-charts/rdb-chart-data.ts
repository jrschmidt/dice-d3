// RDBComputeChartData extends the RDBComputeOdds module to compute chart data
// for nodes and connecting lines.
// jrs 2016


// This ResultObject is an extension of the ResultObject interface in
// RDBComputeOdds.ts. Specifically, what has been added is information that
// can be used to draw the chart.
interface ResultObject {
    success: boolean,
    err?: string,
    errParams?: number[],
    remAtt?: number[],
    remDef?: number[],
    graphHeight?: number,
    graphDepth?: number,
    lines?: LineObject[],
    nodes?: NodeObject[]
}

// Data for a line on the chart. `end0` and `end1` are the "chart coordinates"
// for the line. `probsStr` is the probability that the branch represented by the
// line will be chosen from the node that proceeds it, formatted as a string.
interface LineObject {
  end0: number[],
  end1: number[],
  type: string,
  probsStr: string
}

// `att` and `def` are the number of attacking and defending armies. `loc`
// contains the "chart coordinates" for the node.
interface NodeObject {
  type: string,
  att: number,
  def: number,
  loc: number[]
}

interface RemainderOdds {
  remAtt: number[],
  remDef: number[],
}



class RDBComputeChartData {
  private maxArmies: number;
  private resultStore: RemainderOdds[][];
  private rdbProbs: any;

  constructor() {

    this.rdbProbs = new RiskDiceProbabilities();

    // Maximum armies for one side this module will accept.
    this.maxArmies = 30;

    // A temporary store for results already computed.
    // (note - A new, empty resultStore[] array is initialized each time a new
    // RDBComputeChartData object is instantiated.)
    this.resultStore = [];

  }

  // Recursively compute probabilities for the various possible
  // results for A armies attacking and D armies defending by
  // computing probabilities for each permutation branching
  // from P(A,D) and merging those results, multiplying each
  // result set by the probability that that branch will be
  // reached. Also, compute the data needed to make a graph
  // of the branches and results.
  computeOdds(attArmies: number, defArmies: number): ResultObject {

    let result: ResultObject = {success: false};

    if (this.isInputBad(attArmies, defArmies)) {
      result.err = "invalid input parameters";
      result.errParams = [attArmies, defArmies];
    }

    // else if (this.resultIsSaved(attArmies, defArmies)) {
    //   result = this.fetchSavedResult(attArmies, defArmies);
    // }

    else if (defArmies < 1) {
        result = this.terminalBranchWin(attArmies, defArmies);
    }

    else if (attArmies < 2) {
      result = this.terminalBranchLose(attArmies, defArmies);
    }

    else if (defArmies < 2 || attArmies < 3) {
      result = this.computeOdds1ArmyLost(attArmies, defArmies);
      // if (result.success) {
      //   this.saveResult(attArmies, defArmies, result);
      // }
    }

    else {
      result = this.computeOdds2ArmiesLost(attArmies, defArmies);
      // if (result.success) {
      //   this.saveResult(attArmies, defArmies, result);
      // }
    }

    return result;
  }


  // Process a result node with 2 branches ('WIN', 'LOSE').
  private computeOdds1ArmyLost(attArmies: number, defArmies: number): ResultObject {
    let result: ResultObject = {success: false};

    if (attArmies != 2 && defArmies != 1) {
      result.err = 'computeOdds1ArmyLost() called with bad parameters';
      result.errParams = [attArmies, defArmies];
    }

    else {
      let dice: number[] = this.diceUsed(attArmies, defArmies);
      let probsStr: string[] = this.rdbProbs.getProbsStr(dice[0], dice[1]);
      let pwResult: ResultObject = this.computeOdds(attArmies, defArmies - 1);
      let plResult: ResultObject = this.computeOdds(attArmies - 1, defArmies);
      result = this.merge(attArmies, defArmies, probsStr, [pwResult, plResult]);
    }

    return result;
  }


  // Process a result node with 3 branches ('WIN-WIN', 'WIN-LOSE', 'LOSE-LOSE').
  private computeOdds2ArmiesLost(attArmies: number, defArmies: number): ResultObject {
    let result: ResultObject = {success: false};

    if (attArmies < 3 || defArmies < 2) {
      result.err = 'computeOdds2ArmiesLost() called with bad parameters';
      result.errParams = [attArmies, defArmies];
    }

    else {
      let dice: number[] = this.diceUsed(attArmies, defArmies);
      let probsStr: string[] = this.rdbProbs.getProbsStr(dice[0], dice[1]);
      let pwwResult: ResultObject = this.computeOdds(attArmies, defArmies - 2);
      let pwlResult: ResultObject = this.computeOdds(attArmies -1, defArmies - 1);
      let pllResult: ResultObject = this.computeOdds(attArmies - 2, defArmies);
      result = this.merge(attArmies, defArmies, probsStr, [pwwResult, pwlResult, pllResult]);
    }


    return result;
  }


  // Process a result node that has no branches because Defender now
  // has zero armies (Attacker wins the battle).
  private terminalBranchWin(attArmies: number, defArmies: number): ResultObject {
    let result: ResultObject = {success: false};

    if (attArmies < 2 || defArmies > 0) {
        result.err = 'terminalBranchWin() called with bad parameters';
        result.errParams = [attArmies, defArmies];
    }

    else {
      result = this.terminalBranch(attArmies, defArmies);
      result.remAtt = this.rems100Percent(attArmies);
      result.remDef = [0];
    }

    return result;

  }


  // Process a result node that has no branches because Attacker only
  // has one army left and can no longer attack (Attacker loses the battle).
  private terminalBranchLose(attArmies: number, defArmies: number): ResultObject {
    let result: ResultObject = {success: false};

    if (attArmies > 1 || defArmies < 1) {
      result.err = 'terminalBranchLose() called with bad parameters';
      result.errParams = [attArmies, defArmies];
    }

    else {
      result = this.terminalBranch(attArmies, defArmies);
      result.remAtt = [0];
      result.remDef = this.rems100Percent(defArmies);
    }

    return result;

  }



  // Compute the chart drawing data for a terminal node.
  private terminalBranch(attArmies: number, defArmies: number): ResultObject {
    let result: ResultObject = {success: true};

    result.success = true;
    result.graphHeight = 1;
    result.graphDepth = 1;
    result.lines = [];
    result.nodes = [ {
      'type': 'root',
      'att': attArmies,
      'def': defArmies,
      'loc': [0,1]
    } ];

    return result;

  }

  // Merge the results of two or three branches.
  private merge(attArmies: number, defArmies: number, probsStr: string[], results: ResultObject[]): ResultObject {
    let result: ResultObject = {success: true};

    let height: number = 0;
    let maxDepth: number = 0;
    for (let i: number = 0; i < results.length; i++) {
      height += results[i].graphHeight;
      if (results[i].graphDepth > maxDepth) {maxDepth = results[i].graphDepth;}
    }
    result.graphHeight = height;
    result.graphDepth = maxDepth + 1;

    result.lines = this.mergeLines(maxDepth, probsStr, results);
    result.nodes = this.mergeNodes(attArmies, defArmies, height, maxDepth + 1, results);

    return result;
  }


  // Merge the arrays of line data and add new lines to connect to the branches.
  private mergeLines(maxDepth: number, probsStr: string[], results: ResultObject[]): LineObject[] {
    let mergedLines: LineObject[] = [];

    let br: string[];
    if (results.length > 2) {
      br = ['pww', 'pwl', 'pll'];
    }
    else {
      br = ['pw', 'pl'];
    }

    let dy: number[] = [0, 2 * results[0].graphHeight];
    if (results.length > 2) {dy.push(2 * (results[0].graphHeight + results[1].graphHeight) );}

    for (let i: number = 0; i < results.length; i++) {
      for (let j: number = 0; j < results[i].lines.length; j++) {
        let changedLine: LineObject = results[i].lines[j];

        changedLine.end0[0] += 1;
        changedLine.end0[1] += dy[i];

        if (changedLine.end1[0] >= results[i].graphDepth - 1) {changedLine.end1[0] = maxDepth;}
        else {changedLine.end1[0] += 1;}
        changedLine.end1[1] += dy[i];

        if (changedLine.type == 'root') {changedLine.type = br[i];}
        mergedLines.push(changedLine);
      }
    }

    mergedLines = mergedLines.concat(this.makeNewLines(results, maxDepth, probsStr));

     return mergedLines;
  }



 private makeNewLines(results: ResultObject[], maxDepth: number, probsStr: string[]): LineObject[] {
  let newLines: LineObject[] = [];
  let newLine: LineObject;
  let x1: number;
  let br: string;

  let ht: number = 0;
  for (let i: number = 0; i < results.length; i++) {ht += results[i].graphHeight;}


  // First branch (PW or PWW)
  if (results.length < 3) {br = 'pw';}
  else {br = 'pww';}

  if (results[0].lines.length > 0) {x1 = 1;}
  else {x1 = maxDepth;}

  newLine = {
    'end0': [0, ht],
    'end1': [x1, results[0].graphHeight],
    'type': br,
    'probsStr': probsStr[0]
  };
  newLines.push(newLine);


  // Second branch (PL or PWL)
  if (results.length < 3) {br = 'pl';}
  else {br = 'pwl';}

  if (results[1].lines.length > 0) {x1 = 1;}
  else {x1 = maxDepth;}

  newLine = {
    'end0': [0, ht],
    'end1': [x1, 2 * results[0].graphHeight + results[1].graphHeight],
    'type': br,
    'probsStr': probsStr[1]
  };
  newLines.push(newLine);


  // Third branch (PLL)
  if (results.length == 3) {

    if (results[2].lines.length > 0) {x1 = 1;}
    else {x1 = maxDepth;}

    newLine = {
      'end0': [0, ht],
      'end1': [x1, 2 * (results[0].graphHeight + results[1].graphHeight) + results[2].graphHeight],
      'type': 'pll',
      'probsStr': probsStr[2]
    };
    newLines.push(newLine);
    }

  return newLines;

}



  // Merge the arrays of node data and add a new root node.
  private mergeNodes(attArmies: number, defArmies: number, height: number, depth: number, results: ResultObject[]): NodeObject[] {
    let mergedNodes: NodeObject[] = [];
    let ht: number = 0;

    for (let br: number = 0; br < results.length; br ++) {
      let branchType: string = this.getBranchType(br, results.length);
      let branchDepth: number = results[br].graphDepth;
      let branchNodes: NodeObject[] = results[br].nodes;

      for (let i: number = 0; i < branchNodes.length; i++) {
        let node: NodeObject = branchNodes[i];
        if (node.type == 'root') {node.type = branchType;}
        if (node.def < 1 || node.att < 2) {node.loc[0] = depth - 1;}
        else {node.loc[0] += 1;}
        node.loc[1] += 2 * ht;
        mergedNodes.push(node);
      }

    ht += results[br].graphHeight;
    }

    let newRoot: NodeObject = {
      type: 'root',
      att: attArmies,
      def: defArmies,
      loc: [0, ht]
    };

    mergedNodes.push(newRoot);

    return mergedNodes;
  }



  // Merge 'remainder arrays' (an array of probabilities that Attacker or
  // Defender will have 1, 2, 3, etc. armies left after the battle) for
  // each branch ('WIN', 'LOSE' for 1 army lost, or 'WIN-WIN', 'WIN-LOSE',
  // 'LOSE-LOSE' for 2 armies lost).
  private mergeRemainderOdds(attArmies: number, defArmies: number, probs: number[], results: ResultObject[]): RemainderOdds {

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
    for (let i: number = 2; i <= attArmies; i++) {

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
    for (let i: number = 1; i <= defArmies; i++) {

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



  private getBranchType(branchOrdinal: number, numberOfBranches: number): string {
    let type: string;

    if (numberOfBranches == 2) {
      if (branchOrdinal == 0) {type = 'pw';}
      else {type = 'pl';}
    }

    else {
      if (branchOrdinal == 0) {type = 'pww';}
      else if (branchOrdinal == 1) {type = 'pwl';}
      else {type = 'pll';}
    }

    return type;
  }


  // Checks if a result is already saved for A armies attacking D armies.
  private resultIsSaved(attArmies: number, defArmies: number): boolean {

    if (this.resultStore[attArmies] != undefined && this.resultStore[attArmies][defArmies] != undefined) {
      return true;
    }

    else {
      return false;
    }

  }


  // Save a result for reuse.
  private saveResult(attArmies: number, defArmies: number, result: ResultObject) {

    let remOdds: RemainderOdds = {
      remAtt: result.remAtt,
      remDef: result.remDef
    };

    if (this.resultStore[attArmies] == undefined) {
      this.resultStore[attArmies] = [];
    }

    this.resultStore[attArmies][defArmies] = remOdds;

  }


  // Reuse a result that has already been computed.
  fetchSavedResult(attArmies: number, defArmies: number) {
    let result: ResultObject = {success: true};
    let res: RemainderOdds = this.resultStore[attArmies][defArmies];
    result.remAtt = res.remAtt;
    result.remDef = res.remDef;
    return result;
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



class RiskDiceProbabilities {

  private probs;
  private probsStr;


  constructor() {
    let probs: number[][];
    let probsStr: string[][];
    let pw: number;
    let pl: number;
    let pww: number;
    let pwl: number;
    let pll: number;

    this.probs = [ [], [], [], [] ];
    this.probsStr = [ [], [], [], [] ];

    // Probabilities for Attacker rolling 1 die and Defender rolling 1 die.
    // Approximate values are 0.417, 0.583
    pw = 15 / 36;
    pl = 21 / 36;
    this.probs[1][1] = [pw, pl];
    this.probsStr[1][1] = ['0.417', '0.583'];

    // Probabilities for Attacker rolling 1 die and Defender rolling 2 dice.
    // Approximate values are 0.255, 0.745
    pw = 55 / 216;
    pl = 161 / 216;
    this.probs[1][2] = [pw, pl];
    this.probsStr[1][2] = ['0.255', '0.745'];

    // Probabilities for Attacker rolling 2 dice and Defender rolling 1 die.
    // Approximate values are 0.579, 0.421
    pw = 125 / 216;
    pl = 91 / 216;
    this.probs[2][1] = [pw, pl];
    this.probsStr[2][1] = ['0.579', '0.421'];

    // Probabilities for Attacker rolling 2 dice and Defender rolling 2 dice.
    // Approximate values are 0.228, 0.324, 0.448
    pww = 295 / 1296;
    pwl = 420 / 1296;
    pll = 581 / 1296;
    this.probs[2][2] = [pww, pwl, pll];
    this.probsStr[2][2] = ['0.228', '0.324', '0.448'];

    // Probabilities for Attacker rolling 3 dice and Defender rolling 1 die.
    // Approximate values are 0.659, 0.341
    pw = 855 / 1296;
    pl = 441 / 1296;
    this.probs[3][1] = [pw, pl];
    this.probsStr[3][1] = ['0.659', '0.341'];

    // Probabilities for Attacker rolling 3 dice and Defender rolling 2 dice.
    // Approximate values are 0.372, 0.335, 0.293
    pww = 2890 / 7776;
    pwl = 2611 / 7776;
    pll = 2275 / 7776;
    this.probs[3][2] = [pww, pwl, pll];
    this.probsStr[3][2] = ['0.372', '0.335', '0.293'];

  }  // end of constructor()


  // Getter methods

  // Return probabilities for a given number of Attacker and Defender dice
  getProbs(dA: number, dD: number): number[] {
    return this.probs[dA][dD];
  }

  // Return probabilities for a given number of Attacker and Defender dice
  getProbsStr(dA: number, dD: number): string[] {
    return this.probsStr[dA][dD];
  }


}



let chartDataGenerator = new RDBComputeChartData();

let result: ResultObject = chartDataGenerator.computeOdds(4,4);


let dataNodes: NodeObject[] = result.nodes;

let dataLines: LineObject[] = result.lines;

let dataSpecs = {
  'graphHeight': result.graphHeight,
  'graphDepth': result.graphDepth
};
