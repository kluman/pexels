import React, { Component } from "react";
import "./App.css";
import Settings from "./screens/Settings";
import Main from "./screens/Main";
import PexelsAppBar from "./components/PexelsAppBar";
import Onboarding from "./screens/Onboarding";
import { getApiKey, setApiKey } from "./api/Utils";

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

    this.state = { screen: screen, onboarded: undefined, apiKey: apiKey };
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
        <Settings routeHandler={this.handleRoute} keyHandler={this.handleKey} />
      )
    });
  };

  handleRoute = route => {
    this.setState({ screen: this.screenFromRoute(route) });
  };

  handleKey = apiKey => {
    setApiKey(apiKey);
    this.setState({ apiKey: apiKey });
  };

  screenFromRoute(route) {
    switch (route) {
      case "settings": {
        return (
          <Settings
            routeHandler={this.handleRoute}
            keyHandler={this.handleKey}
          />
        );
      }
      default: {
        if (!getApiKey()) {
          return (
            <Settings
              routeHandler={this.handleRoute}
              keyHandler={this.handleKey}
            />
          );
        }
        return <Main />;
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
