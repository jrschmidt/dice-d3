// A module to generate one or more dice rolls.
// jrs 2016

class Dice {

  roll(qty: number): number[] {
    let rolls: number[] = [];
    for (let i = 0; i < qty; i++) {
      rolls.push(Math.floor(Math.random()*6) + 1);
    }
    return rolls;
  }
}

export = Dice;
