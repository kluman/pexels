import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  progress: {
    width: 12,
    height: 12
  }
});

class Download extends Component {
  constructor(props) {
    super(props);

    this.state = { downloading: false };
  }

  finishedHandler = () => {
    this.setState({ downloading: false });
  };

  handleClick = (photo, e) => {
    this.setState({ downloading: true });
    this.props.clickHandler(e, photo, this.finishedHandler);
  };

  render() {
    const { classes, photo } = this.props;

    return this.state.downloading ? (
      <CircularProgress
        className={classes.progress}
        style={{ width: 20, height: 20 }}
      />
    ) : (
      <IconButton
        className={classes.iconButton}
        onClick={e => this.handleClick(photo, e)}
      >
        <Icon>cloud_download</Icon>
      </IconButton>
    );
  }
}

export default withStyles(styles)(Download);
