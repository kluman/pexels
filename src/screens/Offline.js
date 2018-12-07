import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Error from "../components/Error";

const styles = {};

class Offline extends Component {
  render() {
    const { queryString, searchType } = this.props;

    return (
      <div className="Offline">
        <Error message="You are currently offline." />
      </div>
    );
  }
}

export default withStyles(styles)(Offline);
