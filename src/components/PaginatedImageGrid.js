import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Error from "../components/Error";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import ListSubheader from "@material-ui/core/ListSubheader";
import Modal from "@material-ui/core/Modal";
import Pagination from "./Pagination";
import Photo from "./Photo";
import { Typography } from "@material-ui/core";

const styles = {
  title: {
    fontSize: "1.6em"
  },
  media: {
    height: 200,
    width: "50vw"
  },
  iconButton: {
    color: "#fff"
  }
};

class PaginatedImageGrid extends Component {
  constructor(props) {
    super(props);

    this.state = { id: null, open: false };
  }

  handlePagination = page => {
    this.props.paginationHandler(page);
  };

  handleImageClick = (e, photo) => {
    e.stopPropagation();
    this.setState({ id: photo.id, open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleDownloadClick = (e, photo) => {
    e.stopPropagation();
    console.log(`TODO: execute CEP call. ID: ${photo.id}`);
  };

  render() {
    const { classes, data, title } = this.props;
    let { id, open } = this.state;

    if (data.error) {
      return <Error message={data.error} />;
    }

    return (
      <div className="PaginatedImageGrid">
        <GridList cellHeight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{ height: "auto" }}>
            <ListSubheader component="div">
              <Typography
                color="primary"
                variant="h1"
                className={classes.title}
              >
                {title}
              </Typography>
            </ListSubheader>
          </GridListTile>
          {data.photos.map(photo => (
            <GridListTile key={photo.id}>
              <CardMedia
                className={classes.media}
                image={photo.src.medium}
                title={photo.photographer}
              />
              <GridListTileBar
                className={classes.actions}
                actionIcon={
                  <div className={classes.iconContainer}>
                    <IconButton
                      className={classes.iconButton}
                      onClick={e => this.handleDownloadClick(e, photo)}
                    >
                      <Icon>cloud_download</Icon>
                    </IconButton>
                    <IconButton
                      className={classes.iconButton}
                      onClick={e => this.handleImageClick(e, photo)}
                    >
                      <Icon>info</Icon>
                    </IconButton>
                  </div>
                }
              />
            </GridListTile>
          ))}
        </GridList>

        <Pagination
          prev={data.prev_page ? data.page - 1 : undefined}
          next={data.next_page ? data.page + 1 : undefined}
          paginationHandler={this.handlePagination}
        />

        <Modal open={open} onClose={this.handleClose}>
          <Photo
            id={id}
            downloadHandler={this.handleDownloadClick}
            closeHandler={this.handleClose}
          />
        </Modal>
      </div>
    );
  }
}

export default withStyles(styles)(PaginatedImageGrid);
