import React, { StrictMode } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, ListItem, Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
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
      case rating >= 80:
        return toBgColor("#f1c40f");
      case rating >= 60:
        return toBgColor("#2ecc71");
      case rating >= 40:
        return toBgColor("#27ae9c");
      case rating >= 20:
        return toBgColor("#2781ae");
      default:
        return toBgColor("#2742ae");
    }
  };

  getIconName = rating => {
    switch (true) {
      case rating >= 80:
        return "emoticon-excited";
      case rating >= 60:
        return "emoticon-happy";
      case rating >= 40:
        return "emoticon-neutral";
      case rating >= 20:
        return "emoticon-sad";
      default:
        return "emoticon-dead";
    }
  };

  render() {
    const { mood } = this.props;
    return (
      <Card wrapperStyle={styles.cardWrapper}>
        <MaterialCommunityIcons
          size={40}
          name={this.getIconName(mood.rating)}
          color={this.getIconColorStyle(mood.rating).backgroundColor}
        />

        <View style={styles.dataContainer}>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.date}>{mood.date}</Text>
            <Text style={styles.time}>{mood.time}</Text>
          </View>
          <View style={styles.tagContainer}>
            {mood.tags &&
              mood.tags.map((tag, index) => {
                // if (index < 3) {
                //   return (
                //     <MoodCardTag key={mood.id + "_tag_" + index} tag={tag} />
                //   );
                // } else {
                //   return <Text key={mood.id + "_extra"}>...</Text>;
                // }
                return (
                  <MoodCardTag key={mood.id + "_tag_" + index} tag={tag} />
                );
              })}
          </View>
          {mood.note ? <Text style={styles.note}>{mood.note}</Text> : null}
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
  time: {
    fontSize: 10
  },
  dateTimeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  icon: {
    padding: 5
  },
  another: {
    backgroundColor: "green"
  },
  tagContainer: {
    paddingTop: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  note: {}
});
