import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

import MoodStatistics from "../MoodStatistics/MoodStatistics";

const ms = new MoodStatistics();

export default class StatsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingData: true,
      moods: []
    };
  }

  componentDidMount() {
    ms.getAllMoods().then(result =>
      this.setState({ moods: result, isLoadingData: false })
    );
  }

  render() {
    console.log(this.state.moods);
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {this.state.isLoadingData && (
          <View style={styles.aiContainer}>
            <ActivityIndicator
              size="large"
              animating={this.state.isLoadingData}
              color="#0000ff"
            />
          </View>
        )}
        <Text>Stats Screen</Text>
        {this.state.moods.map((mood, index) => {
          return <Text key={"mood_" + index}>{mood.rating}</Text>;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  aiContainer: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
    padding: 40
  }
});
