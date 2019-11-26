import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

export default class DateNavHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <FontAwesome
          size={32}
          name="long-arrow-left"
          onPress={() => this.props.onPressDateNav(-1)}
        />
        <Text style={styles.dateText}>{this.props.date}</Text>
        <FontAwesome
          size={32}
          name="long-arrow-right"
          onPress={() => this.props.onPressDateNav(1)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  dateText: {
    fontSize: 20,
    paddingLeft: 20,
    paddingRight: 20
  }
});
