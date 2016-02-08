// Make a grid of bubbles to visualize 'Risk battle' odds, using made up static
// sample data
// jrs 2016
//
// In this graph, green is the attacker and red is the defender.
//
// Each bubble, at position (a,d) on the graph, represents the odds of the defender
// prevailing if attacker has (a) armies and defender has (d) armies.
//
// The bubbles start with a green circle with radius 100%. A red bubble is
// superimposed on each green circle. The radius of each red bubble is computed
// to give the circle an area which represents the percentage chances of defender
// prevailing in the battle. So if red's chances are 50%, the area of the red
// circle will be 50% of the area of the full circle.


var data = [
  [2, 4, 92], [3, 4, 78], [4, 4, 64], [5, 4, 50], [6, 4, 48], [7, 4, 46], [8, 4, 42],
  [2, 3, 84], [3, 3, 68], [4, 3, 52], [5, 3, 42], [6, 3, 40], [7, 3, 36], [8, 3, 34],
  [2, 2, 78], [3, 2, 56], [4, 2, 44], [5, 2, 28], [6, 2, 26], [7, 2, 22], [8, 2, 20],
  [2, 1, 58], [3, 1, 44], [4, 1, 30], [5, 1, 18], [6, 1, 14], [7, 1, 10], [8, 1, 8]
];


var svg = d3.select('body')
  .append("svg")
  .attr('width', 500)
  .attr('height', 300);

render(data);


function render(data) {

  // // Enter
  // d3.select('body').selectAll('circle')
  // .data(data)
  // .enter();



  // Update
  svg.selectAll('red-dot')
    .data(data)
    .enter()
    .append('circle')
    .style('fill', '#cc6666')
    .attr('cx', function (d) {
      return 25 + 50 * d[0];
    })
    .attr('cy', function (d) {
      return 275 - 50 * d[1];
    })
    .attr('r', function (d) {
      return Math.floor(d[2] * 0.19 + 0.5);
  });


  // // Exit
  // d3.select('body').selectAll('circle')
  // .data(data)
  // .exit()
  // .remove();
  }
