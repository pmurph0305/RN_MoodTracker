import React from "react";
import { View, Text } from "react-native";
import { Card, ListItem, Button } from "react-native-elements";

import MoodCard from "../MoodCard/MoodCard";

export default class MoodList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { moods } = this.props;
    if (moods && moods.length > 0) {
      return moods.map((mood, index) => {
        return <MoodCard key={"mood_" + index} mood={mood} />;
      });
    } else {
      return <Text>No moods.</Text>;
    }
  }
}
