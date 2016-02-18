"use strict";
var RDBComputeOdds = (function () {
    function RDBComputeOdds() {
        var p = [0, 216, 180, 144, 108, 72, 36, 0];
        var pd2 = [0, 216, 210, 192, 162, 120, 66, 0];
        var pd3 = [0, 216, 215, 208, 189, 152, 91, 0];
        var pdd2 = [0, 216, 150, 96, 54, 24, 6, 0];
        var pdd3 = [0, 216, 200, 160, 108, 56, 16, 0];
    }
    RDBComputeOdds.prototype.computeOdds = function (attArmies, defArmies) {
        var result;
        result = { success: false };
        var success = false;
        var err = 'required lesser function not available';
        var errParams = [attArmies, defArmies];
        result.success = success;
        result.err = err;
        result.errParams = errParams;
        return result;
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
})();
module.exports = RDBComputeOdds;
