import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Download from "./Download";
import Error from "./Error";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import PexelsAPI from "pexels-api-wrapper";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { getApiKey } from "../Utils";
import { withStyles } from "@material-ui/core/styles";
import ExternalLink from "./ExternalLink";

const styles = {
  card: {
    width: "100%"
  },
  cardContentLabel: {
    display: "inline-block",
    marginRight: "5px",
    fontWeight: "bolder",
    fontSize: ".9rem"
  },
  media: {
    height: "55vh",
    width: "auto",
    backgroundSize: "contain"
  }
};

class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = { result: undefined };
    this.photo(props.id);
  }

  shouldComponentUpdate(newProps, newState) {
    return newState.result !== undefined;
  }

  handleDownloadClick = (e, photo, finishedHandler) => {
    this.props.downloadHandler(e, photo, finishedHandler);
  };

  handleCloseClick = () => {
    this.props.closeHandler();
  };

  photo(id) {
    const key = getApiKey();

    if (key) {
      const client = new PexelsAPI(key);
      const { classes } = this.props;

      client
        .getPhoto(id)
        .then(data => {
          this.setState({
            result: (
              <Card className={classes.card}>
                <CardMedia
                  className={classes.media}
                  image={data.src.large}
                  title={data.photographer}
                />
                <CardContent>
                  <div>
                    <Typography variant="caption">
                      <span className={classes.cardContentLabel}>
                        Photographer:
                      </span>
                      <Tooltip title="View all from this photographer.">
                        <ExternalLink
                          url={data.photographer_url}
                          display={data.photographer}
                          size="small"
                        />
                      </Tooltip>
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption">
                      <span className={classes.cardContentLabel}>Width:</span>{" "}
                      <span className={classes.cardContentValue}>
                        {data.width}
                      </span>
                    </Typography>
                  </div>
                  <div>
                    <Typography variant="caption">
                      <span className={classes.cardContentLabel}>Height:</span>{" "}
                      <span className={classes.cardContentValue}>
                        {data.height}
                      </span>
                    </Typography>
                  </div>
                </CardContent>
                <CardActions>
                  <Download
                    photo={data}
                    clickHandler={this.handleDownloadClick}
                  />
                  <IconButton
                    className={classes.iconButton}
                    onClick={e => this.handleCloseClick(e, data)}
                  >
                    <Icon>clear</Icon>
                  </IconButton>
                </CardActions>
              </Card>
            ),
            open: true
          });
        })
        .catch(error => {
          this.setState({ result: <Error message={error} /> });
        });
    }
  }

  render() {
    return <div className="Photo">{this.state.result}</div>;
  }
}

export default withStyles(styles)(Photo);
