import React, { Component } from "react";
import classes from "./Layout.module.css";
import ChartArea from "./ChartArea";
import { connect } from "react-redux";
import { Typography, Box } from "@material-ui/core";
import { addProfile, deleteProfile } from "../actions/ProfileActions";
import { addAodVcd, deleteAodVcd } from "../actions/AodVcdActions";
import AddChartForm from "../Components/AddChartForm";
import { AODVCD, PROFILE } from "../constants";
import ChartModal from "../Components/ChartModal/ChartModal";
import { openModal, closeModal } from "../actions/ModalActions";

class Layout extends Component {
  render() {
    return (
      <div className={classes.pageContainer}>
        <ChartModal
          modalOpen={this.props.modalOpen}
          modalChart={this.props.modalChart}
          chart={this.props.modalChart}
          closeModal={this.props.closeModal}
        />
        <Box display="flex" className={classes.profiles}>
          {/* Area for viewing concentration profiles*/}
          <div className={classes.chartContainer}>
            <div className={classes.containerHeader}>
              <Typography variant="h6" className={classes.containerHeader}>
                Concentration Profiles
              </Typography>
            </div>
            <ChartArea
              chartType={PROFILE}
              charts={this.props.profileCharts}
              openModal={this.props.openModal}
              deleteChart={this.props.deleteProfile}
            />
          </div>
          {/* Form for adding in new concentration profiles chart */}
          <div className={classes.form}>
            <AddChartForm
              chartType={PROFILE}
              gasList={["HCHO", "NO2uv", "NO2vis", "O4uv", "O4vis"]}
              addChart={this.props.addProfile}
              charts={this.props.profileCharts}
            />
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
            <ChartArea
              chartType={AODVCD}
              charts={this.props.aodVcd}
              openModal={this.props.openModal}
              deleteChart={this.props.deleteAodVcd}
            />
          </div>
          {/* Form for adding in new AOD/VCd chart */}
          <div className={classes.form}>
            <AddChartForm
              chartType={AODVCD}
              gasList={["HCHO", "NO2uv", "NO2vis"]}
              addChart={this.props.addAodVcd}
              charts={this.props.aodVcd}
            />
          </div>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profileCharts: state.profiles.profileCharts,
    aodVcd: state.aodVcd.aodVcdCharts,
    modalOpen: state.modal.modalOpen,
    modalChart: state.modal.modalChart
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addProfile: chart => dispatch(addProfile(chart)),
    addAodVcd: chart => dispatch(addAodVcd(chart)),
    deleteProfile: index => dispatch(deleteProfile(index)),
    deleteAodVcd: index => dispatch(deleteAodVcd(index)),
    openModal: chart => dispatch(openModal(chart)),
    closeModal: () => dispatch(closeModal())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
