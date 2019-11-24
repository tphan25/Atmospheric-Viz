import React, { Component, Fragment } from "react";
import classes from "./ChartArea.module.css";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box
} from "@material-ui/core";
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
  dataToChart = (data, index) => {
    return (
      <Card key={index} className={classes.chart}>
        <CardContent>
          <Box display="flex">
            <Box className={classes.plot}>
              <Typography variant="caption">{data.gas}</Typography>
              <Typography variant="caption">{data.date}</Typography>
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
