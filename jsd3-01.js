var data = [10, 15, 30, 50, 80, 65, 55, 30, 20, 10, 8];

function render(data) {

  // Enter
  d3.select("body").selectAll("div.h-bar")
  .data(data)
  .enter()
  .append("div")
  .attr("class", "h-bar")
  .append("span");

  // Update
  d3.select("body").selectAll("div.h-bar")
  .data(data)
  .style("width", function (d) {
    console.log('d = ' + d);
    return (d * 3) + "px";
  })
  .style("background-color", "#aaccaa")
  .select("span")
    .text(function (d) {
      console.log('d = ' + d);
      return d;
    });

  // Exit
  d3.select("body").selectAll("div.h-bar")
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

render(data);
