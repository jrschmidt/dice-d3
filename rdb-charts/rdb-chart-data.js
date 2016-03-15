var dataSpecs = {};
var dataNodes = [];
var dataLines = [];
var rdbProbs = new RiskDiceProbabilities();
var RDBComputeOdds = (function () {
    function RDBComputeOdds() {
        this.maxArmies = 30;
        this.resultStore = [];
    }
    RDBComputeOdds.prototype.computeOdds = function (attArmies, defArmies) {
        var result = { success: false };
        if (this.isInputBad(attArmies, defArmies)) {
            result.err = "invalid input parameters";
            result.errParams = [attArmies, defArmies];
        }
        else if (this.resultIsSaved(attArmies, defArmies)) {
            result = this.fetchSavedResult(attArmies, defArmies);
        }
        else if (defArmies < 1) {
            result = this.terminalBranchWin(attArmies, defArmies);
        }
        else if (attArmies < 2) {
            result = this.terminalBranchLose(attArmies, defArmies);
        }
        else if (defArmies < 2 || attArmies < 3) {
            result = this.computeOdds1ArmyLost(attArmies, defArmies);
            if (result.success) {
                this.saveResult(attArmies, defArmies, result);
            }
        }
        else {
            result = this.computeOdds2ArmiesLost(attArmies, defArmies);
            if (result.success) {
                this.saveResult(attArmies, defArmies, result);
            }
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
        else {
            result = this.terminalBranch(attArmies, defArmies);
            result.remAtt = this.rems100Percent(attArmies);
            result.remDef = [0];
        }
        return result;
    };
    RDBComputeOdds.prototype.terminalBranchLose = function (attArmies, defArmies) {
        var result = { success: false };
        if (attArmies > 1 || defArmies < 1) {
            result.err = 'terminalBranchLose() called with bad parameters';
            result.errParams = [attArmies, defArmies];
        }
        else {
            result = this.terminalBranch(attArmies, defArmies);
            result.remAtt = [0];
            result.remDef = this.rems100Percent(defArmies);
        }
        return result;
    };
    RDBComputeOdds.prototype.terminalBranch = function (attArmies, defArmies) {
        var result = { success: true };
        result.success = true;
        result.branchHeight = 1;
        result.branchDepth = 1;
        result.lines = [];
        result.nodes = [{
                'type': 'root',
                'att': attArmies,
                'def': defArmies,
                'loc': [0, 1]
            }];
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
    RDBComputeOdds.prototype.resultIsSaved = function (attArmies, defArmies) {
        if (this.resultStore[attArmies] != undefined && this.resultStore[attArmies][defArmies] != undefined) {
            return true;
        }
        else {
            return false;
        }
    };
    RDBComputeOdds.prototype.saveResult = function (attArmies, defArmies, result) {
        var remOdds = {
            remAtt: result.remAtt,
            remDef: result.remDef
        };
        if (this.resultStore[attArmies] == undefined) {
            this.resultStore[attArmies] = [];
        }
        this.resultStore[attArmies][defArmies] = remOdds;
    };
    RDBComputeOdds.prototype.fetchSavedResult = function (attArmies, defArmies) {
        var result = { success: true };
        var res = this.resultStore[attArmies][defArmies];
        result.remAtt = res.remAtt;
        result.remDef = res.remDef;
        return result;
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
var RiskDiceProbabilities = (function () {
    function RiskDiceProbabilities() {
        this.probs = [[], [], [], []];
        var pw;
        var pl;
        var pww;
        var pwl;
        var pll;
        pw = 15 / 36;
        pl = 21 / 36;
        this.probs[1][1] = [pw, pl];
        pw = 55 / 216;
        pl = 161 / 216;
        this.probs[1][2] = [pw, pl];
        pw = 125 / 216;
        pl = 91 / 216;
        this.probs[2][1] = [pw, pl];
        pww = 295 / 1296;
        pwl = 420 / 1296;
        pll = 581 / 1296;
        this.probs[2][2] = [pww, pwl, pll];
        pw = 855 / 1296;
        pl = 441 / 1296;
        this.probs[3][1] = [pw, pl];
        pww = 2890 / 7776;
        pwl = 2611 / 7776;
        pll = 2275 / 7776;
        this.probs[3][2] = [pww, pwl, pll];
    }
    RiskDiceProbabilities.prototype.getProbs = function (dA, dD) {
        return this.probs[dA][dD];
    };
    return RiskDiceProbabilities;
}());
