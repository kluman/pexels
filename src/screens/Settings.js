import React, { Component } from "react";
import ExternalLink from "../components/ExternalLink";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { getApiKey } from "../Utils";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  heading: {
    marginBottom: "1rem",
    fontSize: ".9rem"
  },
  keyFieldWrapper: {
    marginTop: ".5em",
    marginBottom: "1em",
    marginLeft: "1em",
    marginRight: "1em",
    padding: "1em"
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContents: "center",
    width: "95vw"
  },
  externalLink: {
    marginTop: "1rem",
    marginBottom: "1rem"
  },
  actions: {
    display: "flex",
    justifyContent: "center"
  }
};

class Settings extends Component {
  handleSaveOnClick = () => {
    this.props.keyHandler(document.getElementById("pexelsKey").value);
    this.props.routeHandler("main");
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <Typography
          variant="h5"
          gutterBottom={true}
          className={classes.heading}
        >
          Settings
        </Typography>
        <Paper elevation={1}>
          <div className={classes.keyFieldWrapper}>
            <TextField
              required
              id="pexelsKey"
              label="Required"
              defaultValue={getApiKey()}
              placeholder="Pexels API Key"
              className={classes.keyField}
              fullWidth
              margin="dense"
              variant="outlined"
              helperText="API key from Pexels"
            />
            <ExternalLink
              url="https://www.pexels.com/api/"
              display="Request an API Key"
              className={classes.externalLink}
              variant="contained"
              color="primary"
            />
          </div>
          <div className={classes.actions}>
            <Tooltip title="Save Settings">
              <IconButton color="primary" onClick={this.handleSaveOnClick}>
                <Icon>save</Icon>
              </IconButton>
            </Tooltip>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
