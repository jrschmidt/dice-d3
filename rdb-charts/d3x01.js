// D3 experiments for building Risk Battle probability charts
// d3x01.html d3x01.js
// Tooltip test


var data = [
  [2, 4, 0.67], [3, 4, 9.12], [4, 4, 31.37], [5, 4, 47.79], [6, 4, 63.62], [7, 4, 74.81], [8, 4, 83.32],
  [2, 3, 2.58], [3, 3, 20.79], [4, 3, 46.93], [5, 3, 64.31], [6, 3, 76.89], [7, 3, 85.71], [8, 3, 90.80],
  [2, 2, 10.61], [3, 2, 36.25], [4, 2, 65.44], [5, 2, 78.44], [6, 2, 89.16], [7, 2, 93.40], [8, 2, 96.57],
  [2, 1, 41.82], [3, 1, 75.33], [4, 1, 91.63], [5, 1, 97.17], [6, 1, 98.99], [7, 1, 99.68], [8, 1, 99.89]
];


// SVG
var svg = d3.select('#chart1')
  .append('svg')
  .attr('width', 500)
  .attr('height', 320)
  .style('border', '5px solid #666666')
;


// Tooltip
var tip = svg.append('text')
  .attr('class', 'tooltip')
  .style('opacity', 0);


// Caption
var topCaptions = svg.append('text')
  .attr('x', 50)
  .attr('y', 30)
  .style('font', '16px sans-serif')
  .style('stroke', '#666666')
  .text('Risk-style Dice Battles - odds of Attacker prevailing');


// Define Axes
var attArmiesScale = d3.scale.ordinal()
  .domain( [2, 3, 4, 5, 6, 7, 8] )
  .range( [125, 175, 225, 275, 325, 375, 425] );

var defArmiesScale = d3.scale.ordinal()
  .domain( [4, 3, 2, 1] )
  .range( [75, 125, 175, 225] );

var axisAtt = d3.svg.axis()
  .scale(attArmiesScale)
  .orient('bottom');

var axisDef = d3.svg.axis()
  .scale(defArmiesScale)
  .orient('left');


// Render Axes
var attAxisRender = svg.append('g')
  .attr('class', 'axis-att')
  .attr('transform', 'translate(0, 250)')
  .style('font', 'bold 18px sans-serif')
  .style('stroke', '#669966')
  .style('fill', '#669966')
  .call(axisAtt);

attAxisRender.append('text')
  .attr('x', 190)
  .attr('y', 40)
  .text('Attacking Armies');


var defAxisRender = svg.append('g')
  .attr('class', 'axis-def')
  .attr('transform', 'translate(100, 0)')
  .style('font', 'bold 18px sans-serif')
  .style('stroke', '#cc6666')
  .style('fill', '#cc6666')
  .call(axisDef);

var defAxisText = defAxisRender.append('g')
  .attr('transform', 'translate(-50, 200), rotate(-90)');

defAxisText.append('text')
  .attr('x', 0)
  .attr('y', 0)
  .text('Defending');

defAxisText.append('text')
  .attr('x', 20)
  .attr('y', 20)
  .text('Armies');


// Update
svg.selectAll('green-dot')
  .data(data)
  .enter()
  .append('circle')
  .attr('class', 'green-dot')
  .attr('cx', function (d) {
    return 25 + 50 * d[0];
  })
  .attr('cy', function (d) {
    return 275 - 50 * d[1];
  })
  .style('fill', '#669966')
  .attr('r', 19)
  .on('mouseover', function(d) {
    tip.text((d3.event.pageX) + ',' + (d3.event.pageY))
      .style('opacity', 0.9)
      .attr('x', (d3.event.pageX))
      .attr('y', (d3.event.pageY));
  })
  .on('mouseout', function() {
    tip.style('opacity', 0);
  });


svg.selectAll('percent-text')
  .data(data)
  .enter()
  .append('text')
  .attr('class', 'percent-text')
  .style('stroke', '#333333')
  .style('font', '9px sans-serif')
  .style('text-anchor', 'middle')
  .attr('x', function (d) {
    return 25 + 50 * d[0];
  })
  .attr('y', function (d) {
    return 275 - 50 * d[1]
  })
  .text( function (d) {
    return d[2] + '%';
  });
