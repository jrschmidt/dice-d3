// D3 experiments for building Risk Battle probability charts
// d3x02.html d3x02.js
// Drawing the charts from pre-configured data


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
  .attr('x1', function (d) { return x0 + dx * d.end0[0]; })
  .attr('y1', function (d) { return dy * d.end0[1]; })
  .attr('x2', function (d) { return x0 + dx * d.end1[0]; })
  .attr('y2', function (d) { return dy * d.end1[1]; })
  .style('stroke', function(d) {
    if (d.type == 'pw' || d.type == 'pww') {return '#339933';}
    if (d.type == 'pl' || d.type == 'pll') {return '#993333';}
    if (d.type == 'pwl') {return '#333399';}
  });
