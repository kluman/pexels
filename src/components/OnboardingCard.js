import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    width: "90vw"
  },
  media: {
    height: 230
  }
};

class OnboardingCard extends Component {
  handleButtonPress = index => {
    this.props.buttonHandler(index);
  };

  render() {
    const { classes, data, index } = this.props;

    return (
      <div className="OnboardingCard">
        <Card className={classes.card}>
          <CardActionArea>
            <div className="CardMedia-container">
              <CardMedia
                className={classes.media}
                image={data.image.src}
                title={data.image.title}
                onClick={() => this.handleButtonPress(index)}
              />
              <Typography component="span" className="CardMedia-source">
                {data.image.source}
              </Typography>
            </div>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {data.heading}
              </Typography>
              <Typography component="p">{data.description}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="medium"
              color="primary"
              variant="outlined"
              onClick={() => this.handleButtonPress(index)}
            >
              Next
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(OnboardingCard);
