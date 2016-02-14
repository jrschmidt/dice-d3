"use strict";
var RDBComputeOdds = (function () {
    function RDBComputeOdds() {
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
