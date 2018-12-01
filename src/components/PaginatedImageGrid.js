import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Error from "../components/Error";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import Pagination from "./Pagination";

const styles = {};

class PaginatedImageGrid extends Component {
  handlePagination = page => {
    this.props.paginationHandler(page);
  };

  render() {
    const { classes, data, title } = this.props;

    if (data.error) {
      return <Error message={data.error} />;
    }

    return (
      <div className="PaginatedImageGrid">
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">{title}</ListSubheader>
          </GridListTile>
          {data.photos.map(photo => (
            <GridListTile key={photo.id}>
              <img src={photo.src.medium} />
              <GridListTileBar
                subtitle={<span>Photographer: {photo.photographer}</span>}
                actionIcon={<IconButton className={classes.icon} />}
              />
            </GridListTile>
          ))}
        </GridList>

        <Pagination
          prev={data.prev_page ? data.page - 1 : undefined}
          next={data.next_page ? data.page + 1 : undefined}
          paginationHandler={this.handlePagination}
        />
      </div>
    );
  }
}

export default withStyles(styles)(PaginatedImageGrid);
