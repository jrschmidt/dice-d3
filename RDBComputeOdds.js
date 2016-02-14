"use strict";
var RDBComputeOdds = (function () {
    function RDBComputeOdds() {
        var p = [0, 216, 180, 144, 108, 72, 36];
        var pd2 = [0, 216, 210, 192, 162, 120, 66];
        var pd3 = [0, 216, 215, 208, 189, 152, 91];
        var pdd2 = [0, 216, 150, 96, 54, 24, 6];
        var pdd3 = [0, 216, 200, 160, 108, 56, 16];
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
    return RDBComputeOdds;
})();
module.exports = RDBComputeOdds;
