import React, { Component, Fragment } from "react";
import classes from "./ChartArea.module.css";
import { Card, CardContent, Typography } from "@material-ui/core";

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
  dataToChart = (data, index) => {
    return (
      <Card key={index} className={classes.chart}>
        <CardContent>
          <Typography>{data.gas}</Typography>
          <Typography>{data.date}</Typography>
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
