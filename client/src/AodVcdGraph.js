import * as d3 from "d3";
const addAxes = (svg, height, width, xScale, yScale) => {
  //Append axes to actual svg element
  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(
      d3
        .axisBottom(xScale)
        .tickSize(3)
        .tickFormat((domain, value) => "")
    );
  svg.append("g").call(
    d3
      .axisLeft(yScale)
      .tickSize(1)
      .tickFormat((domain, value) => "")
  );
  svg
    .append("g")
    .attr("transform", `translate(${width},0)`)
    .call(
      d3
        .axisRight(yScale)
        .tickSize(1)
        .tickFormat((domain, value) => "")
    );

  // text label for the x axis
  svg
    .append("text")
    .attr("transform", "translate(" + width / 2 + " ," + (height + 8) + ")")
    .style("text-anchor", "middle")
    .text("Time")
    .style("font-size", "8px");
  // text label for the y axis
  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0)
    .attr("x", -height / 2)
    .style("text-anchor", "middle")
    .text("Median")
    .style("font-size", "8px");
};

const addGridLines = (svg, height, width, xScale, yScale) => {
  // add the X gridlines
  svg
    .append("g")
    .attr("class", "grid")
    .attr("opacity", "0.1")
    .attr("transform", "translate(0," + height + ")")
    .call(
      make_x_gridlines(xScale)
        .tickSize(-height)
        .tickFormat("")
    );

  // add the Y gridlines
  svg
    .append("g")
    .attr("class", "grid")
    .attr("opacity", "0.1")
    .call(
      make_y_gridlines(yScale)
        .tickSize(-width)
        .tickFormat("")
    );
};

const make_x_gridlines = xScale => {
  return d3.axisBottom(xScale).ticks(10);
};
const make_y_gridlines = yScale => {
  return d3.axisLeft(yScale).ticks(10);
};
const addSvg = (id, margin, height, width) => {
  return d3
    .select(id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("id", id + "svg");
};
const getAodVcdXScale = (data, width) => {
  console.log(data);
  let min = data[0].time;
  let max = data[0].time;
  data.forEach(element => {
    min = Math.min(element.time, min);
    max = Math.max(element.time, max);
  });
  return d3
    .scaleLinear()
    .domain([min, max])
    .range([0, width]);
};
const getAodVcdYScale = (data, height) => {
  let min = data[0].value;
  let max = data[0].value;
  data.forEach(element => {
    min = Math.min(element.value, min);
    max = Math.max(element.value, max);
  });
  return d3
    .scaleLinear()
    .domain([min, max])
    .range([height, 0]);
};

export const drawAodVcdData = (data, height, width, scatter, curvyline) => {
  //Set up both x and y scales
  var xScale = getAodVcdXScale(data, width);
  var yScale = getAodVcdYScale(data, height);

  curvyline
    .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "blue")
    .attr("stroke-width", 1)
    .attr("opacity", "0.7")
    .attr(
      "d",
      d3
        .line()
        .curve(d3.curveBundle.beta(1)) // Just add that to have a curve instead of segments
        .x(function(d) {
          return xScale(d.time);
        })
        .y(function(d) {
          return yScale(d.value);
        })
    );
  // Add the points
  scatter
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "myCircle")
    .attr("cx", function(d) {
      return xScale(d.time);
    })
    .attr("cy", function(d) {
      return yScale(d.value);
    })
    .attr("r", 0.5)
    .attr("stroke", "red")
    .attr("stroke-width", 6)
    .attr("fill", "red")
    .attr("opacity", "0.5");
};

//Read the data in, and append to the given div with corresponding id
export const drawAodVcdChart = (id, data, height, width) => {
  // append the svg object to the body of the page
  // set the dimensions and margins of the graph
  var margin = { top: 10, right: 5, bottom: 5, left: 5 };
  var svg = addSvg(id, margin, height + 10, width);

  //Set up both x and y scales
  var xScale = getAodVcdXScale(data, width);
  var yScale = getAodVcdYScale(data, height);
  // Now I can use this dataset:
  addAxes(svg, height, width, xScale, yScale);
  //addGridLines(svg, height, width, xScale, yScale);

  // Add a clipPath: everything out of this area won't be drawn.
  svg
    .append("defs")
    .append("svg:clipPath")
    .attr("id", "clip")
    .append("svg:rect")
    .attr("width", width)
    .attr("height", height)
    .attr("x", 0)
    .attr("y", 0);
  return svg;
};
