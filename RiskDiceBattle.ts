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
//   returns: { result: [], rolls: [], armies: [] }
//
//   result[] contains the number of armies the two antagonists have remaining
//   after the battle (Attacker first).
//
//   rolls[] contains the objects returned from the battle() function as it is
//   called once for each dice roll in the battle.
//
//   armies[] contains the number of armies Attacker and Defender have left
//   after the battle.


class RiskDiceBattle {



}

export = RiskDiceBattle;
