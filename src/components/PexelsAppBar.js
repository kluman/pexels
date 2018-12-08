import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import throttle from "lodash/throttle";

const styles = {
  root: { marginBottom: "1em" },
  componentsWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
  },
  search: { display: "flex", flexDirection: "row", alignItems: "center" },
  searchTypes: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  inputRoot: { marginLeft: "2em" },
  inputInput: {
    width: 200,
    padding: ".25em",
    border: "solid 1px",
    borderColor: "#cdcdcd",
    backgroundColor: "#fff",
    color: "#000"
  },
  settings: { width: "100%", textAlign: "right" },
  settingsIconActive: { color: "blue" }
};

class PexelsAppBar extends Component {
  constructor(props) {
    super(props);

    this.state = { settingsActive: false, key: props.key };
  }

  settingsClickHandler = () => {
    let settingsActive, route;
    if (this.state.settingsActive) {
      settingsActive = false;
      route = "main";
    } else {
      settingsActive = true;
      route = "settings";
    }
    this.setState({ settingsActive: settingsActive });
    this.props.routeHandler(route);
  };

  throttledSearchHandler = throttle(e => {
    e.preventDefault();

    const qs = document.getElementById("qs").value;
    this.props.searchHandler(qs);
  }, 1000);

  searchHandler = e => {
    e.persist();
    if (!e.keyCode || e.keyCode === 13) {
      this.throttledSearchHandler(e);
    }
  };

  searchTypeHandler = (searchType, e) => {
    this.props.searchTypeHandler(searchType);
  };

  render() {
    const state = this.state;
    const { classes, isApiKey } = this.props;
    let appBarComponents = undefined;

    if (isApiKey) {
      appBarComponents = (
        <div className={classes.componentsWrapper}>
          <div className={classes.search} id="search">
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              autoComplete="off"
              onKeyDown={this.searchHandler}
              id="qs"
            />
            <IconButton className={classes.searchIcon}>
              <Icon onClick={this.searchHandler}>search</Icon>
            </IconButton>
            <div className={classes.searchTypes}>
              <Button
                color="primary"
                size="small"
                className={classes.button}
                onClick={e => this.searchTypeHandler("curated", e)}
              >
                Curated
              </Button>
              <Button
                color="primary"
                size="small"
                className={classes.button}
                onClick={e => this.searchTypeHandler("popular", e)}
              >
                Popular
              </Button>
            </div>
          </div>
          <div className={classes.settings}>
            <Icon
              onClick={this.settingsClickHandler}
              className={
                state.settingsActive
                  ? classes.settingsIconActive
                  : classes.settingsIcon
              }
            >
              settings
            </Icon>
          </div>
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar variant="dense">
            <img
              src="/static/pexels-logo.svg"
              alt="Pexels"
              style={{ marginRight: ".4em" }}
            />
            <Typography variant="h6" color="inherit">
              Pexels
            </Typography>
            {appBarComponents}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(PexelsAppBar);
