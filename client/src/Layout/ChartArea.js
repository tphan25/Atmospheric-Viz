import React, { Component, Fragment } from "react";
import classes from "./ChartArea.module.css";
import { Card, CardContent, IconButton, Box } from "@material-ui/core";
import Chart from "../Components/Chart/Chart";
import { Delete } from "@material-ui/icons";
import ZoomInIcon from "@material-ui/icons/ZoomIn";

export default class ChartArea extends Component {
  render() {
    return (
      <Fragment>
        <div className={classes.chartContainer}>
          {this.chartsJsxElement(this.props.charts)}
        </div>
      </Fragment>
    );
  }

  /*Convert this to a d3 chart contained by the card later. */
  dataToChart = (chartFile, index) => {
    return (
      <Card key={index} className={classes.chart}>
        <CardContent>
          <Box display="flex">
            <Box className={classes.plot}>
              <Chart
                chartFile={chartFile}
                chartType={this.props.chartType}
                chartId={this.props.chartType + "chart" + index}
              ></Chart>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              className={classes.buttonBox}
            >
              <IconButton>
                <ZoomInIcon />
              </IconButton>
              <IconButton onClick={this.props.deleteChart.bind(this, index)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
          <div className={classes.cardContent}></div>
        </CardContent>
      </Card>
    );
  };

  /*Rerenders every single time, for all elements*/
  chartsJsxElement = data => {
    if (!data || data.length === 0) {
      return;
    }
    let charts = data.map((element, index) =>
      this.dataToChart(element.chart, index)
    );
    return charts;
  };
}
