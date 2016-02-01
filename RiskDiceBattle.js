"use strict";
var Dice = require('./Dice');
var dice = new Dice();
var RiskDiceBattle = (function () {
    function RiskDiceBattle() {
    }
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
