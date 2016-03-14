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


  // Update lines - draw the lines and set mouseover
  svg.selectAll('line')
    .data(dataLines)
    .enter()
    .append('line')
    .attr('class', 'line')
    .attr('x1', function (d) { return x0 + dx * d.end0[0]; })
    .attr('y1', function (d) { return dy * d.end0[1]; })
    .attr('x2', function (d) { return x0 + dx * d.end1[0]; })
    .attr('y2', function (d) { return dy * d.end1[1]; })
    .attr('stroke-width', 2)
    .style('stroke', function(d) {
      if (d.type == 'pw' || d.type == 'pww') {return '#339933';}
      if (d.type == 'pl' || d.type == 'pll') {return '#993333';}
      if (d.type == 'pwl') {return '#333399';}
    });



  // Update nodes - draw the dot
  svg.selectAll('node-dot')
    .data(dataNodes)
    .enter()
    .append('circle')
    .attr('class', 'node-dot')
    .attr('cx', function (d) { return x0 + dx * d.loc[0]; })
    .attr('cy', function (d) { return dy * d.loc[1]; })
    .attr('r', 4)
    .style('fill', '#333399');


    // Update nodes - show number of attacking armies
    svg.selectAll('att-number')
    .data(dataNodes)
    .enter()
    .append('text')
    .attr('class', 'att-number')
    .attr('x', function (d) { return x0 + dx * d.loc[0] - 10; })
    .attr('y', function (d) { return dy * d.loc[1] - 5; })
    .style('stroke', '#339933')
    .style('font', '14px sans-serif')
    .text(function (d) { return d.att.toString()});


    // Update nodes - show number of defending armies
    svg.selectAll('def-number')
    .data(dataNodes)
    .enter()
    .append('text')
    .attr('class', 'def-number')
    .attr('x', function (d) { return x0 + dx * d.loc[0] - 10; })
    .attr('y', function (d) { return dy * d.loc[1] + 15; })
    .style('stroke', '#993333')
    .style('font', '14px sans-serif')
    .text(function (d) { return d.def.toString()});


    // Define percentage text
    svg.selectAll('percent-text')
    .data(dataLines)
    .enter()
    .append('text')
    .attr('class', 'percent-text')
    .attr('x', function (d) {
      return Math.floor(x0 + dx * (d.end0[0] + d.end1[0]) / 2)
    })
    .attr('y', function (d) {
      return Math.floor(dy * (d.end0[1] + d.end1[1]) / 2)
    })
    .style('font', '10px sans-serif')
    .style('font-weight', 'bold')
    .style('color', '#ff3333')
    .text(function (d) { return d.probs.toString(); });
