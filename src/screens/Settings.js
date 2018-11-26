import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import { getApiKey, setApiKey } from "../Utils";

const styles = {
  keyFieldWrapper: {
    marginTop: ".5em",
    marginBottom: "1em",
    marginLeft: "1em",
    marginRight: "1em"
  },
  wrapper: {
    width: "95vw"
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
      <div>
        <Typography variant="h5" gutterBottom>
          Settings
        </Typography>
        <Paper elevation={1} className={classes.wrapper}>
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
          </div>
          <Tooltip title="Save Settings">
            <IconButton color="primary" onClick={this.handleSaveOnClick}>
              <Icon>save</Icon>
            </IconButton>
          </Tooltip>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
