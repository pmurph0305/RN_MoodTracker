import React from "react";
import { View } from "react-native";

import MoodCard from "../MoodCard/MoodCard";

export default class MoodList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { moods } = this.props;
    if (moods && moods.length > 0) {
      return moods.map((mood, index) => {
        return (
          <MoodCard
            key={"mood_" + index}
            mood={mood}
            onRemoveMood={this.props.onRemoveMood}
            onEditMood={this.props.onEditMood}
          />
        );
      });
    } else {
      return <View></View>;
    }
  }
}
