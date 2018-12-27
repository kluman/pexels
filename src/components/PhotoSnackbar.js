import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const styles = {
  snackbar: {
    marginLeft: "2em",
    marginRight: "2em"
  },
  error: {
    backgroundColor: "red"
  },
  success: {
    backgroundColor: "#05a081"
  }
};

class PhotoSnackbar extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  shouldComponentUpdate(newProps, newState) {
    if (this.props.message !== newProps.message) {
      this.setState({ open: true });
    }
    return true;
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const props = this.props;
    const { classes } = props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={this.state.open}
        autoHideDuration={3000}
        onClose={this.handleClose}
        className={classes.snackbar}
      >
        <SnackbarContent
          onClose={this.handleClose}
          message={props.message}
          className={classes[props.variant]}
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(PhotoSnackbar);
