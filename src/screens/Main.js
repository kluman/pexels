import React, { Component } from "react";
import { getApiKey } from "../api/Utils";
import PexelsAPI from "pexels-api-wrapper";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = { page: undefined };
  }
  render() {
    const key = getApiKey();

    if (key) {
      const client = new PexelsAPI(key);

      client
        .getCuratedPhotos(10, 1)
        .then(result => {
          console.dir(result);
        })
        .catch(error => {
          console.error(error);
        });
    }

    return <div>Main 1</div>;
  }
}

export default Main;
