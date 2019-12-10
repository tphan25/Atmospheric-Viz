import * as d3 from "d3";
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
/**convert profile data to an object w/ 3 arrays on it */
export const convertProfileData = data => {
  let dataConverted = {};
  dataConverted.timestamps = d3
    .map(data, function(d) {
      return d.timestamp;
    })
    .keys();
  dataConverted.altitudes = d3
    .map(data, function(d) {
      return d.altitude;
    })
    .keys();

  dataConverted.daytime = d3
    .map(data, function(d) {
      return d.daytime;
    })
    .keys();
  return dataConverted;
};
export const getProfileXScale = (data, width) => {
  return d3
    .scaleBand()
    .domain(data.daytime)
    .range([0, width])
    .padding(0.01);
};
export const getProfileYScale = (data, height) => {
  let xScale = d3
    .scaleBand()
    .range([height, 0])
    .domain(data.altitudes)
    .padding(0.01);
  return xScale;
};
export const getProfileColorScale = () => {
  return d3
    .scaleLinear()
    .range(["#ffffb2", "#fecc5c", "#fd8d3c", "#f03b20", "#bd0026"])
    .domain([0, 0.4, 0.6, 0.8, 1]);
};
export const drawProfileChart = (id, yScale, xScale, height, width) => {
  var margin = { top: 10, right: 5, bottom: 5, left: 5 };
  var svg = addSvg(id, margin, height, width);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));
  svg.append("g").call(d3.axisLeft(yScale));
  return svg;
};
export const drawProfileData = (svg, data, yScale, xScale, colorScale) => {
  svg
    .selectAll()
    .data(data)
    .enter()
    .append("rect")
    .attr("x", function(d) {
      return xScale(d.daytime);
    })
    .attr("y", function(d) {
      return yScale(d.altitude);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .style("fill", function(d) {
      return colorScale(d.profile);
    })
    .style("stroke-width", 4)
    .style("stroke", "none")
    .style("opacity", 0.8);
};
