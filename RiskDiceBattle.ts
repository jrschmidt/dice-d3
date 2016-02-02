// A module to execute 'dice battles' according to the rules for Risk.
// jrs 2016


//   In Risk, the attacker rolls one, two or three dice, and the defender rolls
//   one or two dice. Attacker's highest die is compared to Defender's highest.
//   If Attacker rolls two or three dice and Defender rolls two dice, then the
//   Attacker's second highest die is compared to Defender's second highest. For
//   each comparision, one army is lost by the player with the lower of the two
//   rolls. Attacker loses an army if the rolls are the same ("tie goes to the
//   defender").


// Dependency: Dice


// Functions: battleOnce(), battle()

//   battleOnce(attDice, defDice)
//     returns: { attRoll: [], defRoll: [], loss: [] }

//   battle(attStartingArmies, defStartingArmies)
//     returns: { result: [], rolls: [], armies: [] }


//   battleOnce(attDice, defDice)
//
//   Simulates a single roll of a Risk-style dice battle.
//
//   attDice = number of dice Attacker throws
//   defDice = number of dice Defender throws
//
//   returns: { attRoll: [], defRoll: [], loss: [] }
//
//   attRoll[] contains the Attacker's rolls, and defRoll[] contains the
//   Defender's rolls. The values are sorted from highest to lowest.
//
//   loss[] contains two values. The first value is the number of armies lost by
//   the Attacker, and the second value is the number of armies lost by the
//   Defender.


//   battle(attStartingArmies, defStartingArmies)
//
//   Executes a series of rolls between Attacker and Defender which ends when
//   either Defender loses all his armies or Attacker is reduced to one army
//   (and hence unable to attack further).
//
//   attStartingArmies = number of armies Attacker has at beginning
//   defStartingArmies = number of armies Defender has at beginning
//
//   returns: { dice: [], result: [], rolls: [], armies: [] }
//
//   dice[] indicates how many dice Attacker and Defender use for their first
//   roll. (This app assumes players always use maximum allowable dice.)
//
//   result[] contains the number of armies the two antagonists have remaining
//   after the battle (Attacker first).
//
//   rolls[] contains the objects returned from the battle() function as it is
//   called once for each dice roll in the battle.
//
//   armies[] contains the number of armies each player has after each roll.
//   armies[i] corresponds to the same roll as rolls[i], and consists of an
//   array with the number of armies Attacker and defender have remaining after
//   the roll.


import Dice = require('./Dice');

var dice = new Dice();


class RiskDiceBattle {battle(attStartingArmies, defStartingArmies)

  battle(attStartingArmies: number, defStartingArmies: number) {
    let dice: number[] = [];
    let result: number[] = [];
    let rolls: Object[] = [];
    let armies: number[][] = [];

// temporary fake results #1
// (simulates calling battle() with parameters (8,4) )
    // dice = [3,2];
    // result = [8, 0];
    // rolls = [
    //   {attRolls: [4, 2, 1], defRolls: [3, 3], loss: [1, 1]},
    //   {attRolls: [6, 5, 2], defRolls: [6, 4], loss: [1, 1]},
    //   {attRolls: [4, 3, 1], defRolls: [2, 2], loss: [0, 2]} ];
    // armies = [ [7, 3], [6, 2], [6, 0] ];

// temporary fake results #2
// (simulates calling battle() with parameters (4,3) )
    dice = [3,2];
    result = [1, 2];
    rolls = [
      {attRolls: [4, 2, 1], defRolls: [5, 3], loss: [2, 0]},
      {attRolls: [6], defRolls: [4, 4], loss: [0, 1]},
      {attRolls: [3], defRolls: [6, 2], loss: [1, 0]} ];
    armies = [ [2, 3], [2, 2], [1, 2] ];

    return {dice: dice, result: result, rolls: rolls, armies: armies}
  }


  battleOnce(attDice: number, defDice: number) {
    let losses = [0, 0];
    let aRolls = dice.roll(attDice).sort().reverse();
    let dRolls = dice.roll(defDice).sort().reverse();

    if (aRolls[0] > dRolls[0])
      {losses[1] ++}
    else
    {losses[0] ++}

    if ((attDice > 1) && (defDice > 1))
      {
        if (aRolls[1] > dRolls[1])
        {losses[1] ++}
        else
        {losses[0] ++}
      }

    return {attRoll: aRolls, defRoll: dRolls, loss: losses};
  }


}

export = RiskDiceBattle;
