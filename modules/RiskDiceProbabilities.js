"use strict";
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
module.exports = RiskDiceProbabilities;
