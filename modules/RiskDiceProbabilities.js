"use strict";
var RiskDiceProbabilities = (function () {
    function RiskDiceProbabilities() {
        var pgd1 = [0, 216, 180, 144, 108, 72, 36, 0];
        var pgd2 = [0, 216, 210, 192, 162, 120, 66, 0];
        var pgd3 = [0, 216, 215, 208, 189, 152, 91, 0];
        var pgdd2 = [0, 216, 150, 96, 54, 24, 6, 0];
        var pgdd3 = [0, 216, 200, 160, 108, 56, 16, 0];
        var probs1v1 = [
            [],
            [180, 36],
            [144, 72],
            [108, 108],
            [72, 144],
            [36, 180],
            [0, 216]
        ];
        var probs1v2 = probs1v1;
        var probs2v1 = [
            [],
            [210, 6],
            [192, 24],
            [162, 54],
            [120, 96],
            [66, 150],
            [0, 216]
        ];
        var probs3v1 = [
            [],
            [215, 1],
            [208, 8],
            [189, 27],
            [152, 64],
            [91, 125],
            [0, 216]
        ];
        var probs2v2 = [
            [],
            [
                [],
                [150, 60, 6],
            ],
            [
                [],
                [144, 54, 18],
                [96, 96, 24],
            ],
            [
                [],
                [126, 60, 30],
                [90, 78, 48],
                [54, 108, 54],
            ],
            [
                [],
                [96, 78, 42],
                [72, 72, 72],
                [48, 78, 90],
                [24, 96, 96],
            ],
            [
                [],
                [54, 108, 54],
                [42, 78, 96],
                [30, 60, 126],
                [18, 54, 144],
                [6, 60, 150],
            ],
            [
                [],
                [0, 150, 66],
                [0, 96, 120],
                [0, 54, 162],
                [0, 24, 192],
                [0, 6, 210],
                [0, 0, 216],
            ]
        ];
        var probs3v2 = [
            [],
            [
                [],
                [200, 15, 1]
            ],
            [
                [],
                [196, 16, 4],
                [160, 48, 8]
            ],
            [
                [],
                [180, 29, 7],
                [153, 43, 20],
                [108, 81, 27]
            ],
            [
                [],
                [146, 60, 10],
                [128, 56, 32],
                [98, 64, 54],
                [56, 96, 64]
            ],
            [
                [],
                [88, 115, 13],
                [79, 93, 44],
                [64, 71, 81],
                [43, 61, 112],
                [16, 75, 125]
            ],
            [
                [],
                [0, 200, 16],
                [0, 160, 56],
                [0, 108, 108],
                [0, 56, 160],
                [0, 16, 200],
                [0, 0, 216]
            ]
        ];
    }
    RiskDiceProbabilities.prototype.getPd1 = function () {
        var rt = this.pd1.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.getPd2 = function () {
        var rt = this.pd2.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.getPd3 = function () {
        var rt = this.pd3.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.getPdd2 = function () {
        var rt = this.pdd2.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.getPdd3 = function () {
        var rt = this.pdd3.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.get1v1Probs = function () {
        var rt = this.probs1v1.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.get1v2Probs = function () {
        var rt = this.probs1v2.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.get2v1Probs = function () {
        var rt = this.probs2v1.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.get2v2Probs = function () {
        var rt = this.probs2v2.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.get3v1Probs = function () {
        var rt = this.probs3v1.clone();
        return rt;
    };
    RiskDiceProbabilities.prototype.get3v2Probs = function () {
        var rt = this.probs3v2.clone();
        return rt;
    };
    return RiskDiceProbabilities;
}());
module.exports = RiskDiceProbabilities;
