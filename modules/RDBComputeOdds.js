"use strict";
var RiskDiceProbabilities = require('../modules/RiskDiceProbabilities');
var RDBComputeOdds = (function () {
    function RDBComputeOdds() {
        var probsRD = new RiskDiceProbabilities();
        var maxArmies = 30;
    }
    RDBComputeOdds.prototype.computeOdds = function (attArmies, defArmies) {
        var result = { success: false };
        var newResult = { success: false };
        if (this.isInputBad(attArmies, defArmies)) {
            result.err = "invalid input parameters";
            result.errParams = [attArmies, defArmies];
        }
        else {
            if (defArmies < 2 || attArmies < 3) {
                newResult = this.computeOdds1ArmyLost(attArmies, defArmies);
            }
            else {
                newResult = this.computeOdds2ArmiesLost(attArmies, defArmies);
            }
            result = newResult;
        }
        return result;
    };
    RDBComputeOdds.prototype.computeOdds1ArmyLost = function (attArmies, defArmies) {
        var result = { success: false };
        if (attArmies == 2 && defArmies == 1) {
            result.success = true;
            result.prob = 15 / 36;
            result.remAtt = [0, 0, 0.416666];
            result.remDef = [0, 0.583333];
        }
        else {
            result.err = 'required lesser function not available';
            result.errParams = [attArmies, defArmies];
        }
        return result;
    };
    RDBComputeOdds.prototype.computeOdds2ArmiesLost = function (attArmies, defArmies) {
        var result = { success: false };
        result.err = 'required lesser function not available';
        result.errParams = [attArmies, defArmies];
        return result;
    };
    RDBComputeOdds.prototype.isInputBad = function (attArmies, defArmies) {
        if (!(attArmies > 1) ||
            !(defArmies > 0) ||
            attArmies > 30 ||
            defArmies > 30 ||
            attArmies - Math.floor(attArmies) > 0 ||
            defArmies - Math.floor(defArmies) > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    RDBComputeOdds.prototype.diceUsed = function (attArmies, defArmies) {
        var att;
        var def;
        if (attArmies > 3) {
            att = 3;
        }
        else {
            if (attArmies === 3) {
                att = 2;
            }
            else {
                if (attArmies === 2) {
                    att = 1;
                }
                else {
                    att = 0;
                }
            }
        }
        if (defArmies > 1) {
            def = 2;
        }
        else {
            if (defArmies === 1) {
                def = 1;
            }
            else {
                def = 0;
            }
        }
        return [att, def];
    };
    return RDBComputeOdds;
}());
module.exports = RDBComputeOdds;
