import React, { Component } from "react";
import { drawChart, drawData } from "../../AodVcdGraph";
import * as d3 from "d3";
const WIDTH = 120;
const HEIGHT = 60;
class Chart extends Component {
  componentDidMount() {
    let id = "#" + this.props.chartId;
    let dataArr = [];
    //Fixed sample data for now
    d3.csv("vcd261.csv", function(data) {
      dataArr.push(data);
    }).then(() => {
      let svg = drawChart(id, HEIGHT, WIDTH);
      //Need to create scatter & currvyline here because selecting by id for a <g> element doesn't work in d3
      // Create the scatter variable: where both the circles and the brush take place
      let scatter = svg
        .append("g")
        .attr("clip-path", "url(#clip)")
        .attr("id", id + "scatter");
      //This draws actual line of best fit
      let curvyline = svg
        .append("g")
        .attr("clip-path", "url(#clip)")
        .attr("id", id + "curvyline");
      drawData(id, dataArr, HEIGHT, WIDTH, scatter, curvyline);
    });

    //drawChart("#" + name, data, 50, 100);
  }
  render() {
    //export const drawChart = (id, data, height, width) => {

    return <div id={this.props.chartId}></div>;
  }
}

export default Chart;
