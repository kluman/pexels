import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Error from "../components/Error";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import { getApiKey } from "../Utils";
import PexelsAPI from "pexels-api-wrapper";

const styles = {};

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = { grid: undefined, page: undefined };
    this.curatedPhotos(10, 1);
  }

  curatedPhotos(number, page) {
    const key = getApiKey();
    const { classes } = this.props;

    if (key) {
      const client = new PexelsAPI(key);
      client
        .getCuratedPhotos(number, page)
        .then(result => {
          if (result.error) {
            this.setState({ error: <Error message={result.error} /> });
          } else {
            console.dir(result);
            let grid = (
              <GridList cellHeight={180} className={classes.gridList}>
                <GridListTile
                  key="Subheader"
                  cols={2}
                  style={{ height: "auto" }}
                >
                  <ListSubheader component="div">TODO: Title</ListSubheader>
                </GridListTile>
                {result.photos.map(photo => (
                  <GridListTile key={photo.id}>
                    <img src={photo.src.medium} />
                    <GridListTileBar
                      subtitle={<span>Photographer: {photo.photographer}</span>}
                      actionIcon={<IconButton className={classes.icon} />}
                    />
                  </GridListTile>
                ))}
              </GridList>
            );

            this.setState({ grid: grid });
          }
        })
        .catch(error => {
          console.error(`Failed to get Pixels photos ${error}`);
        });
    }
  }

  render() {
    return (
      <div>
        {this.state.error}
        {this.state.grid}
      </div>
    );
  }
}

export default withStyles(styles)(Main);
