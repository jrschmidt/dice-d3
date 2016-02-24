"use strict";
var RDBComputeOdds = (function () {
    function RDBComputeOdds() {
        var maxArmies = 30;
    }
    RDBComputeOdds.prototype.computeOdds = function (attArmies, defArmies) {
        var result;
        result = { success: false };
        var badInput = this.isInputBad(attArmies, defArmies);
        if (badInput) {
            result.err = "invalid input parameters";
            result.errParams = [attArmies, defArmies];
        }
        else {
            result.err = 'required lesser function not available';
            result.errParams = [attArmies, defArmies];
        }
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
