import React, { Component } from "react";
import "./PaginatedImageGrid.css";
import { withStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Download from "./Download";
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
import PhotoSnackbar from "./PhotoSnackbar";
import Typography from "@material-ui/core/Typography";
import { nativePlaceImage, saveImage } from "../Utils";

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

    this.state = {
      id: null,
      open: false,
      snackbarType: "info",
      snackbarMessage: undefined
    };
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

  handleDownloadClick = async (e, photo, finishedHandler) => {
    e.stopPropagation();

    await saveImage(photo)
      .then(localPath => {
        nativePlaceImage(
          `${localPath}/${photo.id}.jpg`,
          photo.width,
          photo.height,
          photo.photographer
        )
          .then(res => {
            this.setState({
              snackbarMessage: `Success, saved photo '${
                photo.id
              }' to '${localPath}'`,
              snackbarVariant: "success"
            });
            finishedHandler();
          })
          .catch(err => {
            this.setState({
              snackbarMessage: err.message,
              snackbarVariant: "error"
            });
            finishedHandler();
          });
      })
      .catch(err => {
        this.setState({
          snackbarMessage: err.message,
          snackbarVariant: "error"
        });
        finishedHandler();
      });

    console.dir(this.state);
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
                    <Download
                      photo={photo}
                      clickHandler={this.handleDownloadClick}
                    />
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

        <PhotoSnackbar
          message={this.state.snackbarMessage}
          variant={this.state.snackbarVariant}
        />
      </div>
    );
  }
}

export default withStyles(styles)(PaginatedImageGrid);
