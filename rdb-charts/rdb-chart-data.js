var RDBComputeChartData = (function () {
    function RDBComputeChartData() {
        this.rdbProbs = new RiskDiceProbabilities();
        this.maxArmies = 30;
        this.resultStore = [];
    }
    RDBComputeChartData.prototype.computeOdds = function (attArmies, defArmies) {
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
    RDBComputeChartData.prototype.computeOdds1ArmyLost = function (attArmies, defArmies) {
        var result = { success: false };
        if (attArmies != 2 && defArmies != 1) {
            result.err = 'computeOdds1ArmyLost() called with bad parameters';
            result.errParams = [attArmies, defArmies];
        }
        else {
            var dice = this.diceUsed(attArmies, defArmies);
            var probs = this.rdbProbs.getProbs(dice[0], dice[1]);
            var pwResult = this.computeOdds(attArmies, defArmies - 1);
            var plResult = this.computeOdds(attArmies - 1, defArmies);
            result = this.merge(attArmies, defArmies, probs, [pwResult, plResult]);
        }
        return result;
    };
    RDBComputeChartData.prototype.computeOdds2ArmiesLost = function (attArmies, defArmies) {
        var result = { success: false };
        if (attArmies < 3 || defArmies < 2) {
            result.err = 'computeOdds2ArmiesLost() called with bad parameters';
            result.errParams = [attArmies, defArmies];
        }
        else {
            var dice = this.diceUsed(attArmies, defArmies);
            var probs = this.rdbProbs.getProbs(dice[0], dice[1]);
            var pwwResult = this.computeOdds(attArmies, defArmies - 2);
            var pwlResult = this.computeOdds(attArmies - 1, defArmies - 1);
            var pllResult = this.computeOdds(attArmies - 2, defArmies);
            result = this.merge(attArmies, defArmies, probs, [pwwResult, pwlResult, pllResult]);
        }
        return result;
    };
    RDBComputeChartData.prototype.terminalBranchWin = function (attArmies, defArmies) {
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
    RDBComputeChartData.prototype.terminalBranchLose = function (attArmies, defArmies) {
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
    RDBComputeChartData.prototype.terminalBranch = function (attArmies, defArmies) {
        var result = { success: true };
        result.success = true;
        result.graphHeight = 1;
        result.graphDepth = 1;
        result.lines = [];
        result.nodes = [{
                'type': 'root',
                'att': attArmies,
                'def': defArmies,
                'loc': [0, 1]
            }];
        return result;
    };
    RDBComputeChartData.prototype.merge = function (attArmies, defArmies, probs, results) {
        var result = { success: true };
        var height = 0;
        var maxDepth = 0;
        for (var i = 0; i < results.length; i++) {
            height += results[i].graphHeight;
            if (results[i].graphDepth > maxDepth) {
                maxDepth = results[i].graphDepth;
            }
        }
        result.graphHeight = height;
        result.graphDepth = maxDepth + 1;
        result.lines = this.mergeLines(probs, results);
        result.nodes = this.mergeNodes(attArmies, defArmies, height, maxDepth + 1, probs, results);
        return result;
    };
    RDBComputeChartData.prototype.mergeLines = function (probs, results) {
        var mergedLines = [];
        if (results.length < 3) {
            mergedLines = [
                {
                    'end0': [0, 2],
                    'end1': [1, 1],
                    'type': 'pw',
                    'probs': probs[0]
                },
                {
                    'end0': [0, 2],
                    'end1': [1, 3],
                    'type': 'pl',
                    'probs': probs[1]
                }
            ];
        }
        else {
            mergedLines = [
                {
                    'end0': [0, 3],
                    'end1': [1, 1],
                    'type': 'pww',
                    'probs': probs[0]
                },
                {
                    'end0': [0, 3],
                    'end1': [1, 3],
                    'type': 'pwl',
                    'probs': probs[1]
                },
                {
                    'end0': [0, 3],
                    'end1': [5, 1],
                    'type': 'pll',
                    'probs': probs[2]
                }
            ];
        }
        return mergedLines;
    };
    RDBComputeChartData.prototype.mergeNodes = function (attArmies, defArmies, height, depth, probs, results) {
        var mergedNodes = [];
        var ht = 0;
        for (var br = 0; br < results.length; br++) {
            var branchType = this.getBranchType(br, results.length);
            var branchDepth = results[br].graphDepth;
            var branchNodes = results[br].nodes;
            for (var i = 0; i < branchNodes.length; i++) {
                var node = branchNodes[i];
                if (node.type == 'root') {
                    node.type = branchType;
                }
                if (node.def < 1 || node.att < 2) {
                    node.loc[0] = depth - 1;
                }
                else {
                    node.loc[0] += 1;
                }
                node.loc[1] += 2 * ht;
                mergedNodes.push(node);
            }
            ht += results[br].graphHeight;
        }
        var newRoot = {
            type: 'root',
            att: attArmies,
            def: defArmies,
            loc: [0, ht]
        };
        mergedNodes.push(newRoot);
        return mergedNodes;
    };
    RDBComputeChartData.prototype.mergeRemainderOdds = function (attArmies, defArmies, probs, results) {
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
        for (var i = 2; i <= attArmies; i++) {
            var sum = 0;
            for (var j = 0; j < results.length; j++) {
                if (remsArrayAtt[j].length > i) {
                    sum += remsArrayAtt[j][i] * probs[j];
                }
            }
            rems.remAtt.push(sum);
        }
        for (var i = 1; i <= defArmies; i++) {
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
    RDBComputeChartData.prototype.getBranchType = function (branchOrdinal, numberOfBranches) {
        var type;
        if (numberOfBranches == 2) {
            if (branchOrdinal == 0) {
                type = 'pw';
            }
            else {
                type = 'pl';
            }
        }
        else {
            if (branchOrdinal == 0) {
                type = 'pww';
            }
            else if (branchOrdinal == 1) {
                type = 'pwl';
            }
            else {
                type = 'pll';
            }
        }
        return type;
    };
    RDBComputeChartData.prototype.resultIsSaved = function (attArmies, defArmies) {
        if (this.resultStore[attArmies] != undefined && this.resultStore[attArmies][defArmies] != undefined) {
            return true;
        }
        else {
            return false;
        }
    };
    RDBComputeChartData.prototype.saveResult = function (attArmies, defArmies, result) {
        var remOdds = {
            remAtt: result.remAtt,
            remDef: result.remDef
        };
        if (this.resultStore[attArmies] == undefined) {
            this.resultStore[attArmies] = [];
        }
        this.resultStore[attArmies][defArmies] = remOdds;
    };
    RDBComputeChartData.prototype.fetchSavedResult = function (attArmies, defArmies) {
        var result = { success: true };
        var res = this.resultStore[attArmies][defArmies];
        result.remAtt = res.remAtt;
        result.remDef = res.remDef;
        return result;
    };
    RDBComputeChartData.prototype.rems100Percent = function (max) {
        var vals = [];
        for (var i = 0; i < max; i++) {
            vals.push(0);
        }
        vals[max] = 1.0;
        return vals;
    };
    RDBComputeChartData.prototype.isInputBad = function (attArmies, defArmies) {
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
    RDBComputeChartData.prototype.diceUsed = function (attArmies, defArmies) {
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
    return RDBComputeChartData;
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
var chartDataGenerator = new RDBComputeChartData();
var result = chartDataGenerator.computeOdds(2, 1);
var dataNodes = result.nodes;
var dataLines = result.lines;
var dataSpecs = {
    'graphHeight': result.graphHeight,
    'graphDepth': result.graphDepth
};
