import React, { Component } from "react";
import classes from "./Layout.module.css";
import ChartArea from "./ChartArea";
import { Typography, Box } from "@material-ui/core";
import AddChartForm from "../Components/AddChartForm";

export default class Layout extends Component {
  render() {
    return (
      <div className={classes.pageContainer}>
        <Box display="flex" className={classes.profiles}>
          {/* Area for viewing concentration profiles*/}
          <div className={classes.chartContainer}>
            <div className={classes.containerHeader}>
              <Typography variant="h6" className={classes.containerHeader}>
                Concentration Profiles
              </Typography>
            </div>
            <ChartArea></ChartArea>
          </div>
          {/* Form for adding in new concentration profiles chart */}
          <div className={classes.form}>
            <AddChartForm></AddChartForm>
          </div>
        </Box>
        <Box display="flex" className={classes.aod}>
          {/* Area for viewing concentration profiles*/}
          <div className={classes.chartContainer}>
            <div className={classes.containerHeader}>
              <Typography variant="h6" className={classes.containerHeader}>
                AOD/VCD (Aerosol Optical Depth/Vertical Column Density)
              </Typography>
            </div>
            <ChartArea></ChartArea>
          </div>
          {/* Form for adding in new AOD/VCd chart */}
          <div className={classes.form}>
            <AddChartForm></AddChartForm>
          </div>
        </Box>
      </div>
    );
  }
}
