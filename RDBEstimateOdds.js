"use strict";
var RiskDiceBattle = require('./RiskDiceBattle');
var riskBattle = new RiskDiceBattle();
var RDBEstimateOdds = (function () {
    function RDBEstimateOdds() {
    }
    RDBEstimateOdds.prototype.run = function (greenArmies, redArmies, numberOfTests) {
        var result = [0, 0];
        for (var i = 0; i < numberOfTests; i++) {
            var results = riskBattle.battle(greenArmies, redArmies);
            if (results.result[0] > 1) {
                result[0]++;
            }
            else {
                result[1]++;
            }
        }
        return result;
    };
    return RDBEstimateOdds;
})();
module.exports = RDBEstimateOdds;
