import React, { Component } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import classes from "./AddChartForm.module.css";

export default class AddChartForm extends Component {
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

  render() {
    return (
      <div className={classes.form}>
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
            <MenuItem value="filler">
              <em>filler</em>
            </MenuItem>
            {/*Add more options for gases soon */}
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
            <MenuItem value="filler">
              <em>fillerdate</em>
            </MenuItem>
            {/*Add more options for dates soon */}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          className={classes.formButton}
        >
          Generate Chart
        </Button>
      </div>
    );
  }
}
