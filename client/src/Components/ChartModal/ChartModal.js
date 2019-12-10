import React, { Component } from "react";
import { Dialog, DialogTitle, Button, Box } from "@material-ui/core";
import classes from "./ChartModal.module.css";
import Chart from "../Chart/Chart";
import { PROFILE } from "../../constants";

class ChartModal extends Component {
  handleClose() {
    console.log("yeet");
  }
  render() {
    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="simple-dialog-title"
        open={this.props.modalOpen}
        maxWidth={false}
        fullWidth={true}
        PaperProps={{
          className: classes.paper
        }}
      >
        <Button onClick={this.props.closeModal}>CLOSE WINDOW</Button>
        <Box className={classes.box}>
          <Chart
            className={classes.chart}
            width={500}
            height={300}
            chartFile={this.props.modalChart}
            chartId={"bigchart"}
            detailed={true}
          ></Chart>
        </Box>
      </Dialog>
    );
  }
}

export default ChartModal;
