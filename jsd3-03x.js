// Try to convert jsd3-01 to a bubble chart
// jrs 2016


var data = [33, 80];

var svg = d3.select('body')
  .append("svg")
  .attr('width', 500)
  .attr('height', 300);

render(data);


function render(data) {

  // Enter
  d3.select('body').selectAll('circle')
  .data(data)
  .enter();

  svg.append('circle');


  // Update
  d3.select('body').selectAll('circle')
  .data(data)
  .attr('cx', 120)
  .attr('cy', 120)
  .attr('r', function (d) {
    return d;
  });


  // Exit
  d3.select('body').selectAll('circle')
  .data(data)
  .exit()
  .remove();
  }
