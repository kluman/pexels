import React, { Component } from "react";
import "./App.css";
import Settings from "./screens/Settings";
import Main from "./screens/Main";
import PexelsAppBar from "./components/PexelsAppBar";
import Onboarding from "./screens/Onboarding";
import { getApiKey, setApiKey } from "./Utils";

class App extends Component {
  constructor(props) {
    super(props);

    let apiKey = getApiKey();
    let onboardedDate = this.getOnboardedDate();
    let screen;

    if (apiKey && onboardedDate) {
      screen = <Main />;
    } else if (!onboardedDate) {
      screen = <Onboarding doneHandler={this.handleOnboardingDone} />;
    } else {
      screen = (
        <Settings routeHandler={this.handleRoute} keyHandler={this.handleKey} />
      );
    }

    this.state = {
      onboarded: undefined,
      apiKey: apiKey,
      qs: undefined,
      screen: screen
    };
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
      <div className="App">
        <PexelsAppBar
          isApiKey={apiKey !== null}
          routeHandler={this.handleRoute}
          searchHandler={this.handleSearch}
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
    );
  }
}

export default App;
