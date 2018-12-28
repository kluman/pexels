import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { nativeOpenBrowserUrl } from "../Utils";

const styles = {};

class ExternalLink extends Component {
  handleOnClick = e => {
    if (nativeOpenBrowserUrl(this.props.url)) {
      e.preventDefault();
    }
  };

  render() {
    const { display, url, variant } = this.props;

    return (
      <Button
        variant={variant ? variant : "text"}
        href={url}
        onClick={e => this.handleOnClick(e)}
        {...this.props}
      >
        {display}
      </Button>
    );
  }
}

export default withStyles(styles)(ExternalLink);
