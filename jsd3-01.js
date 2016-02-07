// First D3 app
// jrs 2016


var data = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8];
var oddeven = 0;
var barColor = '#aacccc';

render(data);


function render(data) {

  // Enter
  d3.select('body').selectAll('div.h-bar')
  .data(data)
  .enter()
  .append('div')
  .attr('class', 'h-bar')
  .append('span');

  // Update
  d3.select('body').selectAll('div.h-bar')
  .data(data)
  .style('background-color', function() {
    if (barColor === '#aaccaa')
      {barColor = '#aacccc';}
    else
      {barColor = '#aaccaa';}
    return barColor;
  })
  .style('width', function (d) {
    console.log('d = ' + d);
    return (d * 3) + 'px';
  })
  .style('padding-top', '4px')
  .style('padding-bottom', '4px')
  .style('font-family', 'sans')
  .style('font-size', '0.6em')

  .select('span')
  .text(function (d) {
    console.log('d = ' + d);
    return d;
  });

  // Exit
  d3.select('body').selectAll('div.h-bar')
  .data(data)
  .exit()
  .remove();
  }


setInterval(
  function () {
    data.shift();
    data.push(Math.round(Math.random() * 100));
    render(data);
  },
  1500
  );
