import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, withTheme } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MoodCardTag from "../MoodCardTag/MoodCardTag";

class MoodCard extends React.Component {
  constructor(props) {
    super(props);
  }

  getIconColorStyle = rating => {
    const { theme } = this.props;
    const toBgColor = color => {
      return { backgroundColor: color };
    };
    switch (true) {
      case rating >= 80:
        return toBgColor(theme.colors.primary);
      case rating >= 60:
        return toBgColor(theme.colors.secondary);
      case rating >= 40:
        return toBgColor(theme.colors.tertiary);
      case rating >= 20:
        return toBgColor(theme.colors.quaternary);
      default:
        return toBgColor(theme.colors.quinary);
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
    let colors = this.getIconColorStyle(mood.rating);
    return (
      <Card wrapperStyle={styles.cardWrapper}>
        <MaterialCommunityIcons
          size={40}
          name={this.getIconName(mood.rating)}
          color={colors.backgroundColor}
        />

        <View style={styles.dataContainer}>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.date}>{mood.date}</Text>
            <Text style={styles.time}>{mood.time}</Text>
          </View>
          <View style={styles.tagContainer}>
            {mood.tags &&
              mood.tags.map((tag, index) => {
                return (
                  <MoodCardTag
                    key={mood.id + "_tag_" + index}
                    tag={tag}
                    color={colors.backgroundColor}
                  />
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
  tagContainer: {
    paddingTop: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap"
  },
  note: {}
});

export default withTheme(MoodCard);
