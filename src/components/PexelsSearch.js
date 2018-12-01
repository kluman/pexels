import React, { Component } from "react";
import Error from "../components/Error";
import { getApiKey } from "../Utils";
import PexelsAPI from "pexels-api-wrapper";
import PaginatedImageGrid from "../components/PaginatedImageGrid";

class PexelsSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      number: 12,
      page: 1,
      result: undefined
    };
  }

  componentDidMount() {
    this.curatedPhotos(this.state.number, this.state.page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.queryString !== this.props.queryString) {
      if (this.props.queryString) {
        this.search(this.props.queryString, this.state.number, this.state.page);
      } else {
        this.curatedPhotos(this.state.number, this.state.page);
      }
    }
  }

  handlePagination = page => {
    if (this.props.queryString) {
      this.search(this.props.queryString, this.state.number, page);
    } else {
      this.curatedPhotos(this.state.number, page);
    }
  };

  popularPhotos(number, page) {
    const key = getApiKey();

    if (key) {
      const client = new PexelsAPI(key);

      client
        .getPopularPhotos(number, page)
        .then(data => {
          this.setState({
            result: (
              <PaginatedImageGrid
                title="Popular Photos"
                data={data}
                paginationHandler={this.handlePagination}
              />
            )
          });
        })
        .catch(error => {
          this.setState({ result: <Error message={error} /> });
        });
    }
  }

  curatedPhotos(number, page) {
    const key = getApiKey();

    if (key) {
      const client = new PexelsAPI(key);

      client
        .getCuratedPhotos(number, page)
        .then(data => {
          this.setState({
            result: (
              <PaginatedImageGrid
                title="Curated Photos"
                data={data}
                paginationHandler={this.handlePagination}
              />
            )
          });
        })
        .catch(error => {
          this.setState({ result: <Error message={error} /> });
        });
    }
  }

  search(queryString, number, page) {
    const key = getApiKey();

    if (key) {
      const client = new PexelsAPI(key);

      client
        .search(queryString, number, page)
        .then(data => {
          this.setState({
            result: (
              <PaginatedImageGrid
                title={`Search for '${queryString}'`}
                data={data}
                paginationHandler={this.handlePagination}
              />
            )
          });
        })
        .catch(error => {
          this.setState({ result: <Error message={error} /> });
        });
    }
  }

  render() {
    const { result } = this.state;

    return <div>{result}</div>;
  }
}

export default PexelsSearch;
