import React, { Component } from "react";
import { drawAodVcdChart, drawAodVcdData } from "../../AodVcdGraph";
import {
  convertProfileData,
  drawProfileChart,
  getProfileColorScale,
  getProfileXScale,
  getProfileYScale,
  drawProfileData,
  drawDetailedProfileData,
  drawDetailedProfileChart
} from "../../ProfileGraph";
import * as d3 from "d3";
import { AODVCD, PROFILE } from "../../constants";

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
    let chartType = this.props.chartFile.chartType;
    let fileName = "";
    if (chartType === PROFILE) {
      fileName = "heatmap_files/" + chartFile.gas + "/" + chartFile.fileName;
      if (this.props.detailed) {
        this.drawDetailedProfileGraph(fileName);
      } else {
        this.drawProfileGraph(fileName);
      }
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

  //This is what will go in our modal
  drawDetailedProfileGraph(fileName) {
    let id = "#" + this.props.chartId;
    let dataArr = [];
    d3.csv(fileName, function(data) {
      dataArr.push(data);
    })
      .then(() => {
        let dataConverted = convertProfileData(dataArr);
        let xScale = getProfileXScale(dataConverted, this.props.width);
        let yScale = getProfileYScale(dataConverted, this.props.height);
        let colorScale = getProfileColorScale();
        let svg = drawDetailedProfileChart(
          id,
          yScale,
          xScale,
          this.props.height,
          this.props.width,
          this.props.chartFile.gas + ", " + this.state.abbrevDate
        );
        drawDetailedProfileData(
          "#bigchart",
          svg,
          dataArr,
          yScale,
          xScale,
          colorScale
        );
        console.log(this.state.abbrevDate);
      })
      .catch(error => {
        console.log(error);
      });
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
        let xScale = getProfileXScale(dataConverted, this.props.width);
        let yScale = getProfileYScale(dataConverted, this.props.height);
        let colorScale = getProfileColorScale();
        let svg = drawProfileChart(
          id,
          yScale,
          xScale,
          this.props.height,
          this.props.width
        );
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
        let svg = drawAodVcdChart(
          id,
          dataArr,
          this.props.height,
          this.props.width
        );
        //Need to create scatter & currvyline here because selecting by id for a <g> element doesn't work in d3
        // Create the scatter variable: where both the circles and the brush take place
        let scatter = svg
          .append("g")
          .attr("clip-path", "url(#detailedclip)")
          .attr("id", id + "scatter");
        //This draws actual line of best fit
        let curvyline = svg
          .append("g")
          .attr("clip-path", "url(#detailedclip)")
          .attr("id", id + "curvyline");
        drawAodVcdData(
          dataArr,
          this.props.height,
          this.props.width,
          scatter,
          curvyline
        );
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
