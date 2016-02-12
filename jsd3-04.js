// Make a grid of bubbles to visualize 'Risk battle' odds, using made up static
// sample data
// jrs 2016
//
// In this graph, green is the attacker and red is the defender.
//
// Each bubble, at position (a,d) on the graph, represents the odds of the
// attacker prevailing if attacker has (a) armies and defender has (d) armies.
//
// The bubbles start with a green circle with radius 100%. A red bubble is
// superimposed on each green circle. The radius of each red bubble is computed
// to give the circle an area which represents the percentage chances of defender
// prevailing in the battle. So if red's chances are 50%, the area of the red
// circle will be 50% of the area of the full circle.


var data = [
  [2, 4, 8], [3, 4, 10], [4, 4, 14], [5, 4, 18], [6, 4, 30], [7, 4, 44], [8, 4, 58],
  [2, 3, 20], [3, 3, 22], [4, 3, 26], [5, 3, 28], [6, 3, 44], [7, 3, 56], [8, 3, 78],
  [2, 2, 34], [3, 2, 36], [4, 2, 40], [5, 2, 42], [6, 2, 52], [7, 2, 68], [8, 2, 84],
  [2, 1, 42], [3, 1, 46], [4, 1, 48], [5, 1, 50], [6, 1, 64], [7, 1, 78], [8, 1, 92]
];


var svg = d3.select('body')
  .append("svg")
  .attr('width', 500)
  .attr('height', 300);

render(data);


function render(data) {

  // Update
  svg.selectAll('green-dot')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', function (d) {
      return 25 + 50 * d[0];
    })
    .attr('cy', function (d) {
      return 275 - 50 * d[1];
    })
    .style('fill', '#669966')
    .attr('r', 19);

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
      return d[2] * 0.19;
    });

  }
