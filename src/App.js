import React, { Component } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Settings from "./screens/Settings";
import Main from "./screens/Main";
import PexelsAppBar from "./components/PexelsAppBar";
import Offline from "./screens/Offline";
import Onboarding from "./screens/Onboarding";
import { getApiKey, setApiKey, nativeInit } from "./Utils";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  constructor(props) {
    super(props);

    nativeInit();

    let apiKey = getApiKey();
    let onboardedDate = this.getOnboardedDate();
    let screen;

    if (apiKey && onboardedDate) {
      screen = <Main />;
    } else if (!onboardedDate) {
      screen = <Onboarding doneHandler={this.handleOnboardingDone} />;
    } else {
      screen = (
        <Settings
          routeHandler={this.handleRoute}
          keyHandler={this.handleApiKeyUpdate}
        />
      );
    }

    this.state = {
      onboarded: undefined,
      apiKey: apiKey,
      qs: undefined,
      screen: screen
    };

    window.addEventListener(
      "online",
      () => {
        window.setTimeout(
          () => this.setState({ screen: this.screenFromRoute("") }),
          2000
        );
      },
      false
    );

    window.addEventListener(
      "offline",
      () => {
        this.setState({ screen: <Offline /> });
      },
      false
    );
  }

  getOnboardedDate() {
    return localStorage.getItem("onboarded");
  }

  setOnboardedDate(date) {
    localStorage.setItem("onboarded", date.getTime());
  }

  handleOnboardingDone = date => {
    this.setOnboardedDate(date);
    this.setState({
      onboarded: date,
      screen: (
        <Settings
          routeHandler={this.handleRoute}
          keyHandler={this.handleApiKeyUpdate}
        />
      )
    });
  };

  handleRoute = route => {
    this.setState({ screen: this.screenFromRoute(route) });
  };

  handleApiKeyUpdate = apiKey => {
    setApiKey(apiKey);
    this.setState({ apiKey: apiKey });
  };

  handleSearch = qs => {
    this.setState({ qs: qs, screen: <Main queryString={qs} /> });
  };

  handleSearchType = searchType => {
    this.setState({ screen: <Main searchType={searchType} /> });
  };

  screenFromRoute(route) {
    switch (route) {
      case "settings": {
        return (
          <Settings
            routeHandler={this.handleRoute}
            keyHandler={this.handleApiKeyUpdate}
          />
        );
      }
      default: {
        if (!getApiKey()) {
          return (
            <Settings
              routeHandler={this.handleRoute}
              keyHandler={this.handleApiKeyUpdate}
            />
          );
        }
        return <Main queryString={this.state.qs} />;
      }
    }
  }

  render() {
    let { apiKey, screen } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <PexelsAppBar
            isApiKey={apiKey !== null}
            routeHandler={this.handleRoute}
            searchHandler={this.handleSearch}
            searchTypeHandler={this.handleSearchType}
            onboarded={this.getOnboardedDate()}
          />
          <main
            className="App-body"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            {screen}
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
