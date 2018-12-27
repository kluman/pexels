import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    width: "90vw",
    minHeight: "4rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    color: "#fff",
    backgroundColor: "red"
  },
  icon: {
    marginRight: ".5rem"
  },
  message: {}
};

class Error extends Component {
  render() {
    const { classes } = this.props;

    if (!this.props.message) {
      return;
    }

    return (
      <Paper className={classes.wrapper}>
        <Icon className={classes.icon}>error</Icon>
        <Typography className={classes.message}>
          {this.props.message}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(Error);
