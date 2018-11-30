import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Error from "../components/Error";
import { getApiKey } from "../Utils";
import PexelsAPI from "pexels-api-wrapper";
import PaginatedImageGrid from "../components/PaginatedImageGrid";

const styles = {};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      api: this.curatedPhotos,
      number: 12,
      main: this.curatedPhotos(12, 1)
    };
  }

  handlePagination = page => {
    const api = this.state.api.bind(this);
    api(this.state.number, page);
  };

  curatedPhotos(number, page) {
    const key = getApiKey();

    if (key) {
      const client = new PexelsAPI(key);

      client
        .getCuratedPhotos(number, page)
        .then(data => {
          this.setState({
            main: (
              <PaginatedImageGrid
                data={data}
                paginationHandler={this.handlePagination}
              />
            )
          });
        })
        .catch(error => {
          this.setState({ main: <Error message={error} /> });
        });
    }
  }

  render() {
    let { main } = this.state;

    return <div>{main}</div>;
  }
}

export default withStyles(styles)(Main);
