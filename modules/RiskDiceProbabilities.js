"use strict";
var RiskDiceProbabilities = (function () {
    function RiskDiceProbabilities() {
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
                [25, 10, 1]
            ],
            [
                [],
                [24, 9, 3],
                [16, 16, 4]
            ],
            [
                [],
                [21, 10, 5],
                [15, 13, 8],
                [9, 18, 9]
            ],
            [
                [],
                [16, 13, 7],
                [12, 12, 12],
                [8, 13, 15],
                [4, 16, 16]
            ],
            [
                [],
                [9, 18, 9],
                [7, 13, 16],
                [5, 10, 21],
                [3, 9, 24],
                [1, 10, 25]
            ],
            [
                [],
                [0, 25, 11],
                [0, 16, 20],
                [0, 9, 27],
                [0, 4, 32],
                [0, 1, 35],
                [0, 0, 36]
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
