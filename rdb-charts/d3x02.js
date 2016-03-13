// D3 experiments for building Risk Battle probability charts
// d3x02.html d3x02.js
// Drawing the charts from pre-configured data


var dataSpecs = {
  'graphHeight': 3,
  'graphDepth': 4
};


var dataNodes = [
  {'type': 'root', 'att': 3, 'def': 1, 'a': 0, 'b': 3},
  {'type': 'pw', 'att': 3, 'def': 0, 'a': 3, 'b': 1},
  {'type': 'pl', 'att': 2, 'def': 1, 'a': 1, 'b': 4},
  {'type': 'pw', 'att': 2, 'def': 0, 'a': 3, 'b': 3},
  {'type': 'pl', 'att': 1, 'def': 1, 'a': 3, 'b': 5}
];


var dataLines = [
  {'end0': [0, 3], 'end1': [3, 1], 'type': 'pw', 'probs': 0.579},
  {'end0': [0, 3], 'end1': [1, 4], 'type': 'pl', 'probs': 0.421},
  {'end0': [1, 4], 'end1': [3, 3], 'type': 'pw', 'probs': 0.417},
  {'end0': [1, 4], 'end1': [3, 5], 'type': 'pl', 'probs': 0.583}
];


// Compute graph specs
var dx = Math.floor(500 / dataSpecs.graphDepth);
var x0 = Math.floor(dx / 2);
var dy = Math.floor(300 / dataSpecs.graphHeight);


// SVG
var svg = d3.select('#chart2')
  .append('svg')
  .attr('width', 500)
  .attr('height', 600)
  .style('border', '5px solid #666666');


// Caption
var topCaptions = svg.append('text')
  .attr('x', 50)
  .attr('y', 30)
  .style('font', '16px sans-serif')
  .style('stroke', '#666666')
  .text('Risk-style Dice Battles - Probability Tree Chart');


  // Update Lines
  svg.selectAll('line')
  .data(dataLines)
  .enter()
  .append('line')
  .attr('class', 'line')
  .attr('x1', function (d) { return 62 + 125 * d.end0[0]; })
  .attr('y1', function (d) { return 100 * d.end0[1]; })
  .attr('x2', function (d) { return 62 + 125 * d.end1[0]; })
  .attr('y2', function (d) { return 100 * d.end1[1]; })
  .style('stroke', 'red');


// // Update Nodes
// svg.selectAll('node')
//   .data(dataNodes)
//   .enter()
//   .append('circle')
//   .attr('class', 'node')
//   .attr('cx', function (d) {
//     return 25 + 50 * d[0];
//   })
//   .attr('cy', function (d) {
//     return 275 - 50 * d[1];
//   })
//   .style('fill', '#669966')
//   .attr('r', 6);


  // Tooltip
  // var tip = svg.append('text')
  //   .attr('class', 'tooltip')
  //   .style('font', '10px sans-serif')
  //   .style('font-weight', 'bold')
  //   .style('color', '#ffffff')
  //   .style('opacity', 0);
