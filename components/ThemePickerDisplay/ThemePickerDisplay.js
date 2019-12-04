import React from "react";
import { View, StyleSheet } from "react-native";

export default class ThemePickerDisplay extends React.Component {
  getStyleFromColor = color => {
    return {
      width: 20,
      height: 20,
      backgroundColor: color
    };
  };

  render() {
    let { theme } = this.props;

    return (
      <View style={styles.container}>
        <View style={this.getStyleFromColor(theme.colors.primary)}></View>
        <View style={this.getStyleFromColor(theme.colors.secondary)}></View>
        <View style={this.getStyleFromColor(theme.colors.tertiary)}></View>
        <View style={this.getStyleFromColor(theme.colors.quaternary)}></View>
        <View style={this.getStyleFromColor(theme.colors.quinary)}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  }
});
