import React, { Component } from "react";
import { Dialog, Button, Box } from "@material-ui/core";
import classes from "./ChartModal.module.css";
import Chart from "../Chart/Chart";

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
        <Box className={classes.box} display="flex" alignItems="center">
          <Chart
            className={classes.chart}
            width={700}
            height={500}
            chartFile={this.props.modalChart}
            chartId={"bigchart"}
            detailed={true}
          />
          <div className={classes.scaleContainer}>
            <img
              src={"/colorscale.png"}
              alt={"Color Scale"}
              className={classes.scale}
            />
          </div>
        </Box>
      </Dialog>
    );
  }
}

export default ChartModal;
