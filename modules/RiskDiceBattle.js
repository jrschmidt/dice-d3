"use strict";
var Dice = require('./Dice');
var diceRoller = new Dice();
var RiskDiceBattle = (function () {
    function RiskDiceBattle() {
    }
    RiskDiceBattle.prototype.battle = function (attStartingArmies, defStartingArmies) {
        var attArmies = attStartingArmies;
        var defArmies = defStartingArmies;
        var rolls = [];
        var armiesRemaining;
        while ((attArmies > 1) && (defArmies > 0)) {
            var attNumberOfDice = this.getAttNumberOfDice(attArmies);
            var defNumberOfDice = this.getDefNumberOfDice(defArmies);
            var roll = this.battleOnce(attNumberOfDice, defNumberOfDice);
            attArmies = attArmies - roll.loss[0];
            defArmies = defArmies - roll.loss[1];
            armiesRemaining = [attArmies, defArmies];
            var rollInfo = {
                dice: [attNumberOfDice, defNumberOfDice],
                attRolls: roll.attRoll,
                defRolls: roll.defRoll,
                loss: roll.loss,
                armies: armiesRemaining
            };
            rolls.push(rollInfo);
        }
        return { result: armiesRemaining, rolls: rolls };
    };
    RiskDiceBattle.prototype.battleOnce = function (attDice, defDice) {
        var losses = [0, 0];
        var aRolls = diceRoller.roll(attDice).sort().reverse();
        var dRolls = diceRoller.roll(defDice).sort().reverse();
        if (aRolls[0] > dRolls[0]) {
            losses[1]++;
        }
        else {
            losses[0]++;
        }
        if ((attDice > 1) && (defDice > 1)) {
            if (aRolls[1] > dRolls[1]) {
                losses[1]++;
            }
            else {
                losses[0]++;
            }
        }
        return { attRoll: aRolls, defRoll: dRolls, loss: losses };
    };
    RiskDiceBattle.prototype.getAttNumberOfDice = function (armies) {
        if (armies > 3)
            return 3;
        else if (armies > 2)
            return 2;
        else
            return 1;
    };
    RiskDiceBattle.prototype.getDefNumberOfDice = function (armies) {
        if (armies > 1)
            return 2;
        else
            return 1;
    };
    return RiskDiceBattle;
}());
module.exports = RiskDiceBattle;
