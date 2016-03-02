"use strict";
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
module.exports = RiskDiceProbabilities;
