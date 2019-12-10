import React, { Component } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from "@material-ui/core";
import classes from "./AddChartForm.module.css";
import { PROFILE, AODVCD } from "../constants";

/*Consider loading in from an external source */
// const gasList = ["HCHO", "NO2uv", "NO2vis", "O4uv", "O4vis"];

let dates = [];
let datesToProfiles = {};
let datesToAodVcd = {};
for (var i = 0; i < 16; i++) {
  //We want to map each of these date objects to a filename (heatmapx.csv)
  dates.push(new Date(2019, 0, 255 + i));
  datesToProfiles[dates[i]] = "heatmap" + i + ".csv";
  datesToAodVcd[dates[i]] = "vcd" + (255 + i) + ".csv";
}

class AddChartForm extends Component {
  constructor() {
    super();
    this.state = {
      gasName: "",
      date: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleAddChart = () => {
    let fileName = "";
    if (this.props.chartType === PROFILE) {
      fileName = datesToProfiles[this.state.date];
    } else if (this.props.chartType === AODVCD) {
      fileName = datesToAodVcd[this.state.date];
    }
    let chart = {
      gas: this.state.gasName,
      date: this.state.date,
      fileName: fileName
    };
    this.props.addChart(chart);
  };

  loadGasItems = items => {
    return items.map((item, index) => {
      return (
        <MenuItem key={index} value={item}>
          {item}
        </MenuItem>
      );
    });
  };

  loadDateItems = items => {
    return items.map((item, index) => {
      return (
        <MenuItem key={index} value={item.toString()}>
          {item.toString()}
        </MenuItem>
      );
    });
  };

  render() {
    return (
      <div className={classes.form}>
        <Typography display="inline">
          Select a gas and date from the dropdown and click "Add Chart" to view
          the plot on that date.
        </Typography>
        <FormControl
          margin="normal"
          variant="filled"
          className={classes.formControl}
        >
          <InputLabel shrink>Gas</InputLabel>
          <Select
            name="gasName"
            value={this.state.gasName}
            onChange={this.handleChange}
          >
            {this.loadGasItems(this.props.gasList)}
          </Select>
        </FormControl>
        <FormControl
          margin="normal"
          variant="filled"
          className={classes.formControl}
        >
          <InputLabel shrink>Date</InputLabel>
          <Select
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          >
            {this.loadDateItems(dates)}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className={classes.formButton}
          onClick={this.handleAddChart}
          disabled={
            this.state.gasName === "" ||
            this.state.date === "" ||
            this.props.charts.length >= 8
          }
        >
          Generate Chart
        </Button>
      </div>
    );
  }
}

export default AddChartForm;
