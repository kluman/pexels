import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Paper from "@material-ui/core/Paper";

const styles = {};

class Error extends Component {
  render() {
    if (!this.props.message) {
      return;
    }

    return (
      <Paper>
        <div>
          <Icon>error</Icon>
          <span>{this.props.message}</span>
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(Error);
