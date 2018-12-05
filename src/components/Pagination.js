import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

const styles = {};

class Pagination extends Component {
  clickHandler = page => {
    this.props.paginationHandler(page);
  };

  render() {
    const { classes, prev, next } = this.props;
    let prevButton,
      nextButton = undefined;

    if (prev) {
      prevButton = (
        <IconButton>
          <Icon onClick={e => this.clickHandler(prev, e)}>arrow_back_ios</Icon>
        </IconButton>
      );
    }

    if (next) {
      nextButton = (
        <IconButton>
          <Icon onClick={e => this.clickHandler(next, e)}>
            arrow_forward_ios
          </Icon>
        </IconButton>
      );
    }

    return (
      <div className={classes.pagination}>
        {prevButton}
        {nextButton}
      </div>
    );
  }
}

export default withStyles(styles)(Pagination);
