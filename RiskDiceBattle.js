"use strict";
var Dice = require('./Dice');
var dice = new Dice();
var RiskDiceBattle = (function () {
    function RiskDiceBattle() {
    }
    RiskDiceBattle.prototype.battle = function (attStartingArmies, defStartingArmies) {
        var attArmies = attStartingArmies;
        var defArmies = defStartingArmies;
        var dice = [];
        var result = [];
        var rolls = [];
        var armies = [];
        while ((attArmies > 1) && (defArmies > 0)) {
            var attNumberOfDice = this.getAttNumberOfDice(this);
            var defNumberOfDice = this.getDefNumberOfDice(this);
        }
        return { result: result, rolls: rolls };
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
    RiskDiceBattle.prototype.getAttNumberOfDice = function (app) {
        app = app;
        if (app.attArmies > 2)
            return 3;
        else if (app.attArmies === 2)
            return 2;
        else
            return 1;
    };
    RiskDiceBattle.prototype.getDefNumberOfDice = function (app) {
        app = app;
        if (app.defArmies > 1)
            return 2;
        else
            return 1;
    };
    return RiskDiceBattle;
})();
module.exports = RiskDiceBattle;
