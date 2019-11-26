import React from "react";
import { View, Text } from "react-native";
import { Card, ListItem, Button } from "react-native-elements";

export default class MoodList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { mood } = this.props;
    return (
      <View>
        <Text>{mood.date}</Text>
        <Text>{mood.id}</Text>
        <Text>{mood.tags}</Text>
        <Text>{mood.rating}</Text>
      </View>
    );
  }
}
