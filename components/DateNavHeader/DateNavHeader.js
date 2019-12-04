import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { withTheme } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";

class DateNavHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { theme } = this.props;
    return (
      <View style={styles.container}>
        <FontAwesome
          color={theme.colors.primary}
          size={32}
          name="long-arrow-left"
          onPress={() => this.props.onPressDateNav(-1)}
        />
        <Text style={[styles.dateText, { color: theme.colors.primary }]}>
          {this.props.date}
        </Text>
        <FontAwesome
          size={32}
          name="long-arrow-right"
          onPress={() => this.props.onPressDateNav(1)}
          color={theme.colors.primary}
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

export default withTheme(DateNavHeader);
