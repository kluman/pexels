import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PexelsSearch from "../components/PexelsSearch";

const styles = {};

class Main extends Component {
  render() {
    const { queryString } = this.props;

    return (
      <div className="Main">
        <PexelsSearch queryString={queryString} />
      </div>
    );
  }
}

export default withStyles(styles)(Main);
