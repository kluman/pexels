import React, { Component } from "react";
import ExternalLink from "../components/ExternalLink";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { getApiKey, homeDirectoryPath } from "../Utils";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  heading: {
    marginBottom: "1em",
    fontSize: "1.2em"
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
  directoryField: {
    marginBottom: "2em"
  },
  externalLink: {
    marginTop: "1em",
    marginBottom: "1em"
  },
  actions: {
    display: "flex",
    justifyContent: "center"
  }
};

class Settings extends Component {
  handleSaveOnClick = () => {
    let value = document.getElementById("pexelsKey").value;
    if (value && (value.trim().length > 0)) {
      this.props.keyHandler(document.getElementById("pexelsKey").value);
      this.props.routeHandler("main");
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.wrapper}>
        <Typography
          variant="h2"
          gutterBottom={true}
          className={classes.heading}
        >
          Settings
        </Typography>
        <Paper elevation={1}>
          <div className={classes.keyFieldWrapper}>
            <TextField
              helperText="Download Directory"
              fullWidth
              disabled
              margin="dense"
              variant="outlined"
              defaultValue={homeDirectoryPath()}
              InputProps={{
                readOnly: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>folder</Icon>
                  </InputAdornment>
                )
              }}
              variant="outlined"
              className={classes.directoryField}
            />
            <TextField
              required
              id="pexelsKey"
              label="Required"
              defaultValue={getApiKey()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon>vpn_key</Icon>
                  </InputAdornment>
                )
              }}
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
              <Fab color="primary" onClick={this.handleSaveOnClick}>
                <Icon>save</Icon>
              </Fab>
            </Tooltip>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
