import React, { StrictMode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, ListItem, Button } from "react-native-elements";

import MoodCardTag from "../MoodCardTag/MoodCardTag";

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
          <View style={styles.tagContainer}>
            {mood.tags.map((tag, index) => {
              if (index < 3) {
                return (
                  <MoodCardTag key={mood.id + "_tag_" + index} tag={tag} />
                );
              } else {
                return <Text key={mood.id + "_extra"}>...</Text>;
              }
            })}
          </View>
          {mood.note && <Text style={styles.note}>{mood.note}</Text>}
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
    paddingLeft: 10,
    flex: 1,
    flexDirection: "column"
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
  },
  tagContainer: {
    paddingTop: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  note: {
    paddingTop: 5
  }
});
