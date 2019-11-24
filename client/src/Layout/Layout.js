import React, { Component } from "react";
import classes from "./Layout.module.css";
import ChartArea from "./ChartArea";
import { connect } from "react-redux";
import { Typography, Box } from "@material-ui/core";
import { addProfile } from "../actions/ProfileActions";
import { addAodVcd } from "../actions/AodVcdActions";
import AddChartForm from "../Components/AddChartForm";

class Layout extends Component {
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
            <ChartArea charts={this.props.profileCharts} />
          </div>
          {/* Form for adding in new concentration profiles chart */}
          <div className={classes.form}>
            <AddChartForm addChart={this.props.addProfile} />
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
            <ChartArea charts={this.props.aodVcd} />
          </div>
          {/* Form for adding in new AOD/VCd chart */}
          <div className={classes.form}>
            <AddChartForm addChart={this.props.addAodVcd} />
          </div>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profileCharts: state.profiles.profileCharts,
    aodVcd: state.aodVcd.aodVcdCharts
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProfile: chart => dispatch(addProfile(chart)),
    addAodVcd: chart => dispatch(addAodVcd(chart))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
