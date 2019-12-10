import React from "react";
import { AsyncStorage } from "react-native";

import { RATING_TYPES } from "../../constants/ratingtypes";
import {
  SliderWithNumber,
  SliderHiddenNumber
} from "../RatingElements/RatingElements";

export default class RatingContainer extends React.Component {
  constructor(props) {
    super(props);
    let ratingType = this.getRatingType();
    this.state = {
      ratingType: ratingType
    };
  }

  getRatingType = async () => {
    try {
      let ratingType = await AsyncStorage.getItem("@ratingType");
      console.log("rating type", ratingType);
      if (ratingType !== null) {
        this.setState({ ratingType: ratingType });
      } else {
        this.setState({ ratingType: RATING_TYPES.SLIDER_WITH_NUMBER });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  getRatingElement = ratingType => {
    const { onChangeRating, rating } = this.props;
    switch (ratingType) {
      case RATING_TYPES.SLIDER_HIDDEN_NUMBER:
        return (
          <SliderHiddenNumber onChangeRating={onChangeRating} rating={rating} />
        );
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
