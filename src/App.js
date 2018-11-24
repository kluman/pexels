import React, { Component } from "react";
import "./App.css";
import Settings from "./screens/Settings";
import Main from "./screens/Main";
import PexelsAppBar from "./components/PexelsAppBar";
import Onboarding from "./components/Onboarding";

class App extends Component {
  constructor(props) {
    super(props);

    let screen;
    if (this.getOnboardedDate()) {
      screen = <Main />;
    } else {
      screen = <Onboarding doneHandler={this.handleOnboardingDone} />;
    }

    this.state = { screen: screen, onboarded: undefined };
  }

  getOnboardedDate() {
    return localStorage.getItem("onboarded");
  }

  setOnboardedDate(date) {
    localStorage.setItem("onboarded", date.getTime());
  }

  handleOnboardingDone = date => {
    this.setOnboardedDate(date);
    this.setState({ onboarded: date });
  };

  handleRoute = route => {
    console.log(`changing to route ${route}`);
    this.setState({ screen: route });
  };

  screenFromRoute() {
    switch (this.state.screen) {
      case "settings": {
        return <Settings />;
      }
      default: {
        return <Main />;
      }
    }
  }

  render() {
    let screen = this.screenFromRoute();

    return (
      <div className="App">
        <PexelsAppBar
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
