import React, { Component, Fragment } from "react";
import classes from "./ChartArea.module.css";

export default class ChartArea extends Component {
  render() {
    return (
      <Fragment>
        <div className={classes.chartContainer}></div>
      </Fragment>
    );
  }
}
