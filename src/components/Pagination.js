import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import { withStyles } from "@material-ui/core";

const styles = {};

class Pagination extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return <div className={classes.pagination}>pagination</div>;
  }
}

export default withStyles(styles)(Pagination);
