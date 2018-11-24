import React, { Component } from "react";
import OnboardingCard from "./OnboardingCard";

class Onboarding extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      cards: [
        {
          image: {
            src:
              "https://images.pexels.com/photos/1249214/pexels-photo-1249214.jpeg",
            title: "Person With Tattoo Playing Paper, Scissor and Stone",
            source: "rawpixel.com"
          },
          heading: "This is the first slide",
          description: "Lorem ipsum ..."
        },
        {
          image: {
            src:
              "https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg",
            title: "Flat-lay Photography of Macbook Pro Beside Paper",
            source: "rawpixel.com"
          },
          heading: "This is the second slide",
          description: "Lorem ipsum ..."
        },
        {
          image: {
            src:
              "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg",
            title: "Smiling Woman Looking Upright Standing Against Yellow Wall",
            source: "juan mendez"
          },
          heading: "This is the third slide",
          description: "Lorem ipsum ..."
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
        <p>
          Welcome, need a nice thing to say here to introduce users to the
          plugin.
        </p>
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
