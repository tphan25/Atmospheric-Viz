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
  var margin = { top: 10, right: 5, bottom: 8, left: 5 };
  var svg = addSvg(id, margin, height, width);

  svg.append("g").attr("transform", "translate(0," + height + ")");

  svg
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 7)
    .text("Time of the day")
    .style("font-size", "8px");
  svg
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", 0)
    .attr("x", -20)
    .attr("transform", "rotate(-90)")
    .text("Altitude")
    .style("font-size", "8px");

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
export const drawDetailedProfileChart = (id, yScale, xScale, height, width) => {
  var margin = { top: 100, right: 100, bottom: 75, left: 100 };
  var svg = addSvg(id, margin, height, width);

  svg
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale))
    .selectAll("text")
    .attr("transform", "translate(-10,10)rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", 8)
    .style("fill", "black");
  svg.append("g").call(d3.axisLeft(yScale));
  svg
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .text("Time of the day");
  svg
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", -50)
    .attr("x", -50)
    .attr("dy", "-.20em")
    .attr("transform", "rotate(-90)")
    .text("Altitude");
  // Add title to graph
  svg
    .append("text")
    .attr("x", 0)
    .attr("y", -50)
    .attr("text-anchor", "left")
    .style("font-size", "22px")
    .text("Heatmap of a Trace Gas");
  console.log("detaield axies");
  return svg;
};
export const drawDetailedProfileData = (
  id,
  svg,
  data,
  yScale,
  xScale,
  colorScale
) => {
  var tooltip = d3
    .select(id)
    .append("div")
    .style("opacity", 0)
    .attr("class", "tooltip")
    .style("background-color", "white")
    .style("border", "solid")
    .style("border-width", "2px")
    .style("border-radius", "5px")
    .style("padding", "5px")
    .style("width", "400px")
    .style("margin", "auto");

  // Three function that change the tooltip when user hover / move / leave a cell
  var mouseover = function(d) {
    tooltip.style("opacity", 1);
    d3.select(this)
      .style("stroke", "black")
      .style("opacity", 1);
  };
  var mousemove = function(d) {
    tooltip
      .html(
        "The profile concentration of this cell is: " +
          d.value +
          "<br> at time: " +
          d.daytime
      )
      .style("left", d3.mouse(this)[0] + 70 + "px")
      .style("top", d3.mouse(this)[1] + "px");
  };
  var mouseleave = function(d) {
    tooltip.style("opacity", 0);
    d3.select(this)
      .style("stroke", "none")
      .style("opacity", 0.8);
  };

  svg
    .selectAll()
    .data(data, function(d) {
      return d.daytime + ":" + d["altitude"];
    })
    .enter()
    .append("g")
    .append("rect")
    .attr("x", function(d) {
      return xScale(d.daytime);
    })
    .attr("y", function(d) {
      return yScale(d["altitude"]);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .style("fill", function(d) {
      return colorScale(d["profile"]);
    })
    .style("stroke-width", 4)
    .style("stroke", "none")
    .style("opacity", 0.8)
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseleave", mouseleave);
};
