import React from "react";
import { AsyncStorage } from "react-native";

import { RATING_TYPES } from "../../constants/ratingtypes";
import {
  SliderWithNumber,
  SliderHiddenNumber,
  DiscreteMoodFaces
} from "../RatingElements/RatingElements";

export default class RatingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingType: ""
    };
  }

  componentDidMount() {
    this.checkUpdateRatingType();
  }

  checkUpdateRatingType = () => {
    this.getRatingType().then(result => {
      if (this.state.ratingType !== result) {
        this.setState({ ratingType: result });
      }
    });
  };

  getRatingType = async () => {
    try {
      let ratingType = await AsyncStorage.getItem("@Settings:ratingKey");
      if (ratingType !== null) {
        return ratingType;
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  componentWillReceiveProps() {
    this.checkUpdateRatingType();
  }

  getRatingElement = ratingType => {
    const { onChangeRating, rating } = this.props;
    switch (RATING_TYPES[ratingType]) {
      case RATING_TYPES.SLIDER_HIDDEN_NUMBER:
        return (
          <SliderHiddenNumber onChangeRating={onChangeRating} rating={rating} />
        );
      case RATING_TYPES.DISCRETE_FACE_MOODS:
        return <DiscreteMoodFaces onChangeRating={onChangeRating} />;
      default:
        return (
          <SliderWithNumber onChangeRating={onChangeRating} rating={rating} />
        );
    }
  };

  render() {
    return this.getRatingElement(this.state.ratingType);
  }
}
