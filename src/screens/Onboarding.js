import React, { Component } from "react";
import OnboardingCard from "../components/OnboardingCard";
import Typography from "@material-ui/core/Typography";
import ExternalLink from "../components/ExternalLink";

class Onboarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      cards: [
        {
          image: {
            src: "../static/onboarding-1.jpg"
          },
          description: (
            <Typography>
              Bring all of the best stock photos shared by talented
              photographers directly into your InDesign documents.
            </Typography>
          )
        },
        {
          image: {
            src: "../static/onboarding-2.jpg"
          },
          description: (
            <Typography>
              You will need to request an API key from Pexels to access photos
              from the plugin. After an API key is emailed to you just save it
              in the settings screen.
              <ExternalLink
                url="https://www.pexels.com/api/"
                display="Request an API Key"
                size="large"
              />
            </Typography>
          )
        }
      ]
    };
  }

  handleDone = () => {
    this.props.doneHandler(new Date());
  };

  handleButtonPress = index => {
    let next = index + 1 < this.state.cards.length ? index + 1 : 0;
    next === 0 ? this.handleDone() : this.setState({ index: next });
  };

  render() {
    let currentCard = this.state.cards[this.state.index];

    return (
      <div className="Onboarding">
        <OnboardingCard
          data={currentCard}
          index={this.state.index}
          buttonHandler={this.handleButtonPress}
        />
      </div>
    );
  }
}

export default Onboarding;
