"use strict";
var RiskDiceProbabilities = (function () {
    function RiskDiceProbabilities() {
        var pgd1 = [0, 216, 180, 144, 108, 72, 36, 0];
        var pgd2 = [0, 216, 210, 192, 162, 120, 66, 0];
        var pgd3 = [0, 216, 215, 208, 189, 152, 91, 0];
        var pgdd2 = [0, 216, 150, 96, 54, 24, 6, 0];
        var pgdd3 = [0, 216, 200, 160, 108, 56, 16, 0];
    }
    RiskDiceProbabilities.prototype.getProbs1v1 = function () {
        var pw = 15 / 36;
        var pl = 21 / 36;
        return [pw, pl];
    };
    RiskDiceProbabilities.prototype.getProbs1v2 = function () {
        var pw = 55 / 216;
        var pl = 161 / 216;
        return [pw, pl];
    };
    RiskDiceProbabilities.prototype.getProbs2v1 = function () {
        var pw = 125 / 216;
        var pl = 91 / 216;
        return [pw, pl];
    };
    RiskDiceProbabilities.prototype.getProbs2v2 = function () {
        var pww = 295 / 1296;
        var pwl = 420 / 1296;
        var pll = 581 / 1296;
        return [pww, pwl, pll];
    };
    RiskDiceProbabilities.prototype.getProbs3v1 = function () {
        var pw = 855 / 1296;
        var pl = 441 / 1296;
        return [pw, pl];
    };
    RiskDiceProbabilities.prototype.getProbs3v2 = function () {
        var pww = 2890 / 7776;
        var pwl = 2611 / 7776;
        var pll = 2275 / 7776;
        return [pww, pwl, pll];
    };
    RiskDiceProbabilities.prototype.getPd1 = function () {
        var rt = this.pgd1.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.getPd2 = function () {
        var rt = this.pgd2.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.getPd3 = function () {
        var rt = this.pgd3.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.getPdd2 = function () {
        var rt = this.pgdd2.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.getPdd3 = function () {
        var rt = this.pgdd3.clone();
        return rt;
    };
    return RiskDiceProbabilities;
}());
module.exports = RiskDiceProbabilities;
