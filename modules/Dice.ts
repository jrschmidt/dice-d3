// A module to generate one or more dice rolls.
// jrs 2016

// Call roll(n) and the function will return an array of n numbers
// chosen randomly from the integers 1, 2, 3, 4, 5, 6.

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
