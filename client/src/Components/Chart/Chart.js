import React, { Component } from "react";
import { drawAodVcdChart, drawAodVcdData } from "../../AodVcdGraph";
import {
  convertProfileData,
  drawProfileChart,
  getProfileColorScale,
  getProfileXScale,
  getProfileYScale,
  drawProfileData
} from "../../ProfileGraph";
import * as d3 from "d3";
import { AODVCD, PROFILE } from "../../constants";
const WIDTH = 120;
const HEIGHT = 80;
class Chart extends Component {
  constructor(props) {
    super(props);
    let splitDate = this.props.chartFile.date.split(" ");
    let abbrev = "";
    for (let i = 1; i <= 3; i++) {
      //Only get month, date, year
      abbrev = abbrev + " " + splitDate[i];
    }
    this.state = {
      abbrevDate: abbrev
    };
  }
  componentDidMount() {
    let chartFile = this.props.chartFile;
    let chartType = this.props.chartType;
    let fileName = "";
    if (chartType === PROFILE) {
      fileName = "heatmap_files/" + chartFile.gas + "/" + chartFile.fileName;
      this.drawProfileGraph(fileName);
    } else if (chartType === AODVCD) {
      fileName = "VCD_data/" + chartFile.gas + "/" + chartFile.fileName;
      this.drawAodVcdGraph(fileName);
    }
  }
  drawTitle(svg, title) {
    svg
      .append("text")
      .attr("x", 0)
      .attr("y", -2)
      .attr("text-anchor", "left")
      .style("font-size", "10px")
      .text(title);
  }
  //"heatmap_files/NO2vis/heatmap3.csv"
  drawProfileGraph(fileName) {
    let id = "#" + this.props.chartId;
    let dataArr = [];
    d3.csv(fileName, function(data) {
      dataArr.push(data);
    })
      .then(() => {
        let dataConverted = convertProfileData(dataArr);
        let xScale = getProfileXScale(dataConverted, WIDTH);
        let yScale = getProfileYScale(dataConverted, HEIGHT);
        let colorScale = getProfileColorScale();
        let svg = drawProfileChart(id, yScale, xScale, HEIGHT, WIDTH);
        drawProfileData(svg, dataArr, yScale, xScale, colorScale);
        this.drawTitle(
          svg,
          this.props.chartFile.gas + ", " + this.state.abbrevDate
        );
      })
      .catch(error => {
        console.log(error);
      });
  }
  //"vcd261.csv"
  drawAodVcdGraph(fileName) {
    let id = "#" + this.props.chartId;
    let dataArr = [];
    d3.csv(fileName, function(data) {
      dataArr.push(data);
    })
      .then(() => {
        let svg = drawAodVcdChart(id, HEIGHT, WIDTH);
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
        drawAodVcdData(id, dataArr, HEIGHT, WIDTH, scatter, curvyline);
        this.drawTitle(
          svg,
          this.props.chartFile.gas + ", " + this.state.abbrevDate
        );
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return <div id={this.props.chartId}></div>;
  }
}

export default Chart;
