import React from "react";
import {
  ActivityIndicator,
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet
} from "react-native";
import MoodsList from "../components/MoodList/MoodList.js";
import TagList from "../components/TagList/TagList.js";
import { Header } from "react-native-elements";

import DateNavHeader from "../components/DateNavHeader/DateNavHeader";

import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";

import Database from "../database/database";

const db = new Database();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingData: true,
      success: false,
      error: false,
      moods: [],
      tags: []
    };
  }

  setError = () => {
    this.setState({ error: true });
  };

  setSuccess = () => {
    this.setState({ success: true });
  };

  logData = () => {
    console.log("log data");
    db.getMoods()
      .then(result => {
        console.log("Successfully queried moods", result);
      })
      .catch(error => console.log("Error getting moods", error));

    db.getTags()
      .then(result => {
        console.log("Successfully queries tags", result);
      })
      .catch(error => console.log("Error getting tags", error));
  };

  componentDidMount() {
    // display a loading bar of some sort while initial query goes.
    db.executeSql("DROP TABLE IF EXISTS TAGS")
      .then(() => {
        return db.reseedDatabase().then(r => {
          return db.getMoods().then(result => {
            this.setState({ moods: result._array, isLoadingData: false });
          });
        });
      })
      .catch(error => console.log("Error dropping tags", error));
  }

  onPressDateNav = change => {
    console.log("Month Change:" + change);
  };

  render() {
    const { moods } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <Header
          backgroundColor="FFF"
          centerComponent={
            <DateNavHeader
              onPressDateNav={value => this.onPressDateNav(value)}
              date="Nov 2019"
            />
          }
        />
        {this.state.isLoadingData && (
          <View style={styles.aiContainer}>
            <ActivityIndicator
              size="large"
              animating={this.state.isLoadingData}
              color="#0000ff"
            />
          </View>
        )}

        <MoodsList moods={moods} />
        <Button title="Log data" onPress={() => this.logData()} />
      </ScrollView>
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
