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
//   returns: { result: [], rolls: [] }
//
//   result[] contains the number of armies each antagonist has remaining after
//   the battle (Attacker first). This is a deliberate redunancy to provide the
//   final result without accessing the array of individual roll data.
//
//   rolls[] contains objects with information for each roll. These objects
//   consist of the  data returned from the battle() function as it is
//   called once for each dice roll in the battle, with two properties added:
//
//   rolls.dice[] indicates how many dice Attacker and Defender use for the
//   roll. (This app assumes players always use maximum allowable dice.)
//
//   rolls.attRoll[] contains the Attacker's rolls.
//
//   rolls.defRoll[] contains the Defender's rolls.
//
//   rolls.loss[] contains the number of armies lost by Attacker and Defender.
//
//   rolls.armies[] contains the number of armies each player has left after
//   each roll.


import Dice = require('./Dice');

var diceRoller = new Dice();


class RiskDiceBattle {

  battle(attStartingArmies: number, defStartingArmies: number) {
    let attArmies:number = attStartingArmies;
    let defArmies:number = defStartingArmies;
    let rolls: Object[] = [];
    let armiesRemaining: number[];

    // Loop for each set of dice rolls:
    while ( (attArmies > 1) && (defArmies > 0) ) {
      let attNumberOfDice: number = this.getAttNumberOfDice(attArmies);
      let defNumberOfDice: number = this.getDefNumberOfDice(defArmies);
      let roll = this.battleOnce(attNumberOfDice, defNumberOfDice);

      attArmies = attArmies - roll.loss[0];
      defArmies = defArmies - roll.loss[1];
      armiesRemaining = [attArmies, defArmies];

      let rollInfo = {
        dice: [attNumberOfDice, defNumberOfDice],
        attRolls: roll.attRoll,
        defRolls: roll.defRoll,
        loss: roll.loss,
        armies: armiesRemaining
      };
      rolls.push(rollInfo);
    }

    return {result: armiesRemaining, rolls: rolls}
  }


  battleOnce(attDice: number, defDice: number) {
    let losses = [0, 0];
    let aRolls = diceRoller.roll(attDice).sort().reverse();
    let dRolls = diceRoller.roll(defDice).sort().reverse();

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

  private getAttNumberOfDice(armies: number): number {
    if (armies > 3)
      return 3;
    else
      if (armies > 2)
        return 2;
      else
        return 1;
  }


  private getDefNumberOfDice(armies: number): number {
    if (armies > 1)
      return 2;
    else
      return 1;
  }


}

export = RiskDiceBattle;
