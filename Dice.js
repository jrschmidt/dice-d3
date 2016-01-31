"use strict";
var Dice = (function () {
    function Dice() {
    }
    Dice.prototype.roll = function (qty) {
        var rolls = [];
        for (var i = 0; i < qty; i++) {
            rolls.push(Math.floor(Math.random() * 6) + 1);
        }
        return rolls;
    };
    return Dice;
})();
module.exports = Dice;
