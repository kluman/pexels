import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

const styles = {
  pagination: {
    display: "flex",
    justifyContent: "center"
  },
  icon: {
    fontSize: "3rem",
    color: "#05a081"
  }
};

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
        <IconButton color="primary">
          <Icon
            color="primary"
            onClick={e => this.clickHandler(prev, e)}
            className={classes.icon}
          >
            chevron_left
          </Icon>
        </IconButton>
      );
    }

    if (next) {
      nextButton = (
        <IconButton color="primary">
          <Icon
            color="primary"
            onClick={e => this.clickHandler(next, e)}
            className={classes.icon}
          >
            chevron_right
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
