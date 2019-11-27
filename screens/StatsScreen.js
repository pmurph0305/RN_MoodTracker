import React from "react";
import { View, Text, Button } from "react-native";

export default class StatsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Stats Screen</Text>
        <Button
          title="STATS!"
          onPress={() => this.props.navigation.navigate("Stats")}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate("Entries")}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}
