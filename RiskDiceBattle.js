"use strict";
var Dice = require('./Dice');
var dice = new Dice();
var RiskDiceBattle = (function () {
    function RiskDiceBattle() {
    }
    RiskDiceBattle.prototype.battle = function (attStartingArmies, defStartingArmies) {
        var dice = [];
        var result = [];
        var rolls = [];
        var armies = [];
        dice = [3, 2];
        result = [1, 2];
        rolls = [
            { attRolls: [4, 2, 1], defRolls: [5, 3], loss: [2, 0] },
            { attRolls: [6], defRolls: [4, 4], loss: [0, 1] },
            { attRolls: [3], defRolls: [6, 2], loss: [1, 0] }];
        armies = [[2, 3], [2, 2], [1, 2]];
        return { dice: dice, result: result, rolls: rolls, armies: armies };
    };
    RiskDiceBattle.prototype.battleOnce = function (attDice, defDice) {
        var losses = [0, 0];
        var aRolls = dice.roll(attDice).sort().reverse();
        var dRolls = dice.roll(defDice).sort().reverse();
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
    return RiskDiceBattle;
})();
module.exports = RiskDiceBattle;
