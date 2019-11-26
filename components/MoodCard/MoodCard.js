import React, { StrictMode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, ListItem, Button } from "react-native-elements";

export default class MoodList extends React.Component {
  constructor(props) {
    super(props);
  }

  getIconColorStyle = rating => {
    const toBgColor = color => {
      return { backgroundColor: color };
    };
    switch (true) {
      case rating >= 75:
        return toBgColor("green");
      case rating >= 55:
        return toBgColor("blue");
      case rating >= 35:
        return toBgColor("purple");
      case rating >= 15:
        return toBgColor("orange");
      default:
        return toBgColor("red");
    }
  };

  render() {
    const { mood } = this.props;
    return (
      <Card wrapperStyle={styles.cardWrapper}>
        <View
          style={[styles.colorIcon, this.getIconColorStyle(mood.rating)]}
        ></View>
        <View style={styles.dataContainer}>
          <Text style={styles.date}>{mood.date}</Text>
          <Text>{mood.tags}</Text>
          {mood.note && <Text>{mood.note}</Text>}
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    flexDirection: "row"
  },
  dataContainer: {
    paddingLeft: 10
  },
  date: {
    fontSize: 16
  },
  colorIcon: {
    backgroundColor: "orange",
    borderRadius: 50,
    width: 50,
    height: 50
  },
  another: {
    backgroundColor: "green"
  }
});
