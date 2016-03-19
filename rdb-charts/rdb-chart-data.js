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
            var probsStr = this.rdbProbs.getProbsStr(dice[0], dice[1]);
            var pwResult = this.computeOdds(attArmies, defArmies - 1);
            var plResult = this.computeOdds(attArmies - 1, defArmies);
            result = this.merge(attArmies, defArmies, probsStr, [pwResult, plResult]);
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
            var probsStr = this.rdbProbs.getProbsStr(dice[0], dice[1]);
            var pwwResult = this.computeOdds(attArmies, defArmies - 2);
            var pwlResult = this.computeOdds(attArmies - 1, defArmies - 1);
            var pllResult = this.computeOdds(attArmies - 2, defArmies);
            result = this.merge(attArmies, defArmies, probsStr, [pwwResult, pwlResult, pllResult]);
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
    RDBComputeChartData.prototype.merge = function (attArmies, defArmies, probsStr, results) {
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
        result.lines = this.mergeLines(maxDepth, probsStr, results);
        result.nodes = this.mergeNodes(attArmies, defArmies, height, maxDepth + 1, results);
        return result;
    };
    RDBComputeChartData.prototype.mergeLines = function (maxDepth, probsStr, results) {
        var mergedLines = [];
        var br;
        if (results.length > 2) {
            br = ['pww', 'pwl', 'pll'];
        }
        else {
            br = ['pw', 'pl'];
        }
        var dy = [0, 2 * results[0].graphHeight];
        if (results.length > 2) {
            dy.push(2 * (results[0].graphHeight + results[1].graphHeight));
        }
        for (var i = 0; i < results.length; i++) {
            for (var j = 0; j < results[i].lines.length; j++) {
                var changedLine = results[i].lines[j];
                changedLine.end0[0] += 1;
                changedLine.end0[1] += dy[i];
                if (changedLine.end1[0] >= results[i].graphDepth - 1) {
                    changedLine.end1[0] = maxDepth;
                }
                else {
                    changedLine.end1[0] += 1;
                }
                changedLine.end1[1] += dy[i];
                if (changedLine.type == 'root') {
                    changedLine.type = br[i];
                }
                mergedLines.push(changedLine);
            }
        }
        mergedLines = mergedLines.concat(this.makeNewLines(results, maxDepth, probsStr));
        return mergedLines;
    };
    RDBComputeChartData.prototype.makeNewLines = function (results, maxDepth, probsStr) {
        var newLines = [];
        var newLine;
        var x1;
        var br;
        var ht = 0;
        for (var i = 0; i < results.length; i++) {
            ht += results[i].graphHeight;
        }
        if (results.length < 3) {
            br = 'pw';
        }
        else {
            br = 'pww';
        }
        if (results[0].lines.length > 0) {
            x1 = 1;
        }
        else {
            x1 = maxDepth;
        }
        newLine = {
            'end0': [0, ht],
            'end1': [x1, results[0].graphHeight],
            'type': br,
            'probsStr': probsStr[0]
        };
        newLines.push(newLine);
        if (results.length < 3) {
            br = 'pl';
        }
        else {
            br = 'pwl';
        }
        if (results[1].lines.length > 0) {
            x1 = 1;
        }
        else {
            x1 = maxDepth;
        }
        newLine = {
            'end0': [0, ht],
            'end1': [x1, 2 * results[0].graphHeight + results[1].graphHeight],
            'type': br,
            'probsStr': probsStr[1]
        };
        newLines.push(newLine);
        if (results.length == 3) {
            if (results[2].lines.length > 0) {
                x1 = 1;
            }
            else {
                x1 = maxDepth;
            }
            newLine = {
                'end0': [0, ht],
                'end1': [x1, 2 * (results[0].graphHeight + results[1].graphHeight) + results[2].graphHeight],
                'type': 'pll',
                'probsStr': probsStr[2]
            };
            newLines.push(newLine);
        }
        return newLines;
    };
    RDBComputeChartData.prototype.mergeNodes = function (attArmies, defArmies, height, depth, results) {
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
        var probs;
        var probsStr;
        var pw;
        var pl;
        var pww;
        var pwl;
        var pll;
        this.probs = [[], [], [], []];
        this.probsStr = [[], [], [], []];
        pw = 15 / 36;
        pl = 21 / 36;
        this.probs[1][1] = [pw, pl];
        this.probsStr[1][1] = ['0.417', '0.583'];
        pw = 55 / 216;
        pl = 161 / 216;
        this.probs[1][2] = [pw, pl];
        this.probsStr[1][2] = ['0.255', '0.745'];
        pw = 125 / 216;
        pl = 91 / 216;
        this.probs[2][1] = [pw, pl];
        this.probsStr[2][1] = ['0.579', '0.421'];
        pww = 295 / 1296;
        pwl = 420 / 1296;
        pll = 581 / 1296;
        this.probs[2][2] = [pww, pwl, pll];
        this.probsStr[2][2] = ['0.228', '0.324', '0.448'];
        pw = 855 / 1296;
        pl = 441 / 1296;
        this.probs[3][1] = [pw, pl];
        this.probsStr[3][1] = ['0.659', '0.341'];
        pww = 2890 / 7776;
        pwl = 2611 / 7776;
        pll = 2275 / 7776;
        this.probs[3][2] = [pww, pwl, pll];
        this.probsStr[3][2] = ['0.372', '0.335', '0.293'];
    }
    RiskDiceProbabilities.prototype.getProbs = function (dA, dD) {
        return this.probs[dA][dD];
    };
    RiskDiceProbabilities.prototype.getProbsStr = function (dA, dD) {
        return this.probsStr[dA][dD];
    };
    return RiskDiceProbabilities;
}());
var chartDataGenerator = new RDBComputeChartData();
var result = chartDataGenerator.computeOdds(5, 2);
var dataNodes = result.nodes;
var dataLines = result.lines;
var dataSpecs = {
    'graphHeight': result.graphHeight,
    'graphDepth': result.graphDepth
};
