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

/*Consider loading in from an external source */
const gasList = ["O4", "NO2", "HCHO"];
let dates = [];
for (var i = 0; i < 5; i++) {
  dates.push(new Date(2019, 10, 24 - i));
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
    let chart = {
      gas: this.state.gasName,
      date: this.state.date
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
            {this.loadGasItems(gasList)}
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
