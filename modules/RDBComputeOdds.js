"use strict";
var RiskDiceProbabilities = require('../modules/RiskDiceProbabilities');
var rdbProbs = new RiskDiceProbabilities();
var RDBComputeOdds = (function () {
    function RDBComputeOdds() {
        this.maxArmies = 16;
    }
    RDBComputeOdds.prototype.computeOdds = function (attArmies, defArmies) {
        var result = { success: false };
        if (this.isInputBad(attArmies, defArmies)) {
            result.err = "invalid input parameters";
            result.errParams = [attArmies, defArmies];
        }
        else if (defArmies < 1) {
            result = this.terminalBranchWin(attArmies, defArmies);
        }
        else if (attArmies < 2) {
            result = this.terminalBranchLose(attArmies, defArmies);
        }
        else if (defArmies < 2 || attArmies < 3) {
            result = this.computeOdds1ArmyLost(attArmies, defArmies);
        }
        else {
            result = this.computeOdds2ArmiesLost(attArmies, defArmies);
        }
        return result;
    };
    RDBComputeOdds.prototype.computeOdds1ArmyLost = function (attArmies, defArmies) {
        var result = { success: false };
        if (attArmies != 2 && defArmies != 1) {
            result.err = 'computeOdds1ArmyLost() called with bad parameters';
            result.errParams = [attArmies, defArmies];
        }
        else {
            var dice = this.diceUsed(attArmies, defArmies);
            var probs = rdbProbs.getProbs(dice[0], dice[1]);
            var pwResult = this.computeOdds(attArmies, defArmies - 1);
            var plResult = this.computeOdds(attArmies - 1, defArmies);
            var mergeResult = this.merge(attArmies, defArmies, probs, [pwResult, plResult]);
            result.success = true;
            result.remAtt = mergeResult.remAtt;
            result.remDef = mergeResult.remDef;
        }
        return result;
    };
    RDBComputeOdds.prototype.computeOdds2ArmiesLost = function (attArmies, defArmies) {
        var result = { success: false };
        if (attArmies < 3 || defArmies < 2) {
            result.err = 'computeOdds2ArmiesLost() called with bad parameters';
            result.errParams = [attArmies, defArmies];
        }
        else {
            var dice = this.diceUsed(attArmies, defArmies);
            var probs = rdbProbs.getProbs(dice[0], dice[1]);
            var pwwResult = this.computeOdds(attArmies, defArmies - 2);
            var pwlResult = this.computeOdds(attArmies - 1, defArmies - 1);
            var pllResult = this.computeOdds(attArmies - 2, defArmies);
            var mergeResult = this.merge(attArmies, defArmies, probs, [pwwResult, pwlResult, pllResult]);
            result.success = true;
            result.remAtt = mergeResult.remAtt;
            result.remDef = mergeResult.remDef;
        }
        return result;
    };
    RDBComputeOdds.prototype.terminalBranchWin = function (attArmies, defArmies) {
        var result = { success: false };
        if (attArmies < 2 || defArmies > 0) {
            result.err = 'terminalBranchWin() called with bad parameters';
            result.errParams = [attArmies, defArmies];
        }
        result.success = true;
        result.remAtt = this.rems100Percent(attArmies);
        result.remDef = [0];
        return result;
    };
    RDBComputeOdds.prototype.terminalBranchLose = function (attArmies, defArmies) {
        var result = { success: false };
        if (attArmies > 1 || defArmies < 1) {
            result.err = 'terminalBranchLose() called with bad parameters';
            result.errParams = [attArmies, defArmies];
        }
        result.success = true;
        result.remAtt = [0];
        result.remDef = this.rems100Percent(defArmies);
        return result;
    };
    RDBComputeOdds.prototype.merge = function (maxAtt, maxDef, probs, results) {
        var rems = {
            remAtt: [0, 0],
            remDef: [0]
        };
        var remsArrayAtt = [];
        for (var i = 0; i < results.length; i++) {
            remsArrayAtt.push(results[i].remAtt);
        }
        var remsArrayDef = [];
        for (var i = 0; i < results.length; i++) {
            remsArrayDef.push(results[i].remDef);
        }
        for (var i = 2; i <= maxAtt; i++) {
            var sum = 0;
            for (var j = 0; j < results.length; j++) {
                if (remsArrayAtt[j].length > i) {
                    sum += remsArrayAtt[j][i] * probs[j];
                }
            }
            rems.remAtt.push(sum);
        }
        for (var i = 1; i <= maxDef; i++) {
            var sum = 0;
            for (var j = 0; j < results.length; j++) {
                if (remsArrayDef[j].length > i) {
                    sum += remsArrayDef[j][i] * probs[j];
                }
            }
            rems.remDef.push(sum);
        }
        return rems;
    };
    RDBComputeOdds.prototype.rems100Percent = function (max) {
        var vals = [];
        for (var i = 0; i < max; i++) {
            vals.push(0);
        }
        vals[max] = 1.0;
        return vals;
    };
    RDBComputeOdds.prototype.isInputBad = function (attArmies, defArmies) {
        if (!(attArmies >= 1) ||
            !(defArmies >= 0) ||
            attArmies > this.maxArmies ||
            defArmies > this.maxArmies ||
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
            if (attArmies == 3) {
                att = 2;
            }
            else {
                if (attArmies == 2) {
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
            if (defArmies == 1) {
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
