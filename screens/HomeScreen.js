import React from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import MoodsList from "../components/MoodList/MoodList.js";
import IconsList from "../components/IconsList/IconsList.js";
import { Header } from "react-native-elements";

import DateNavHeader from "../components/DateNavHeader/DateNavHeader";

import * as SQLite from "expo-sqlite";
// import SQLite from "react-native-sqlite-storage";
// Using promises.
// SQLite.enablePromise(true);
const db = SQLite.openDatabase("MoodDB.db", "0", "Mood Database");

const data = [
  {
    date: "November 24 2019",
    tags: "Relax, Games, Programming",
    rating: 45
  },
  {
    date: "November 25 2019",
    tags: "Relax, Games",
    rating: 55
  }
];

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      error: false,
      moods: []
    };
  }

  setError = () => {
    this.setState({ error: true });
  };

  setSuccess = () => {
    this.setState({ success: true });
  };

  insertIntoDatabase = item => {
    db.transaction(
      tx => {
        tx.executeSql(
          "insert into moods (rating, date, tags) values (?, ?, ?);",
          [item.rating, item.date, item.tags],
          success => {
            console.log("Success insert:" + item.date);
          },
          error => {
            console.log("Error inserting " + item.date, error);
          }
        );
      },
      error => {
        console.log(error);
        this.setError();
      },
      success => {
        console.log("Succesfully inserted:" + item.date);
        this.setSuccess();
      }
    );
  };

  repopulateDB = () => {
    console.log("repopulating db");
    data.forEach(item => this.insertIntoDatabase(item));
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM MOODS", [], (tx, result) => {
        this.setState({ moods: result.rows._array });
      });
    });
  };

  logData = () => {
    console.log("log data");
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM MOODS", [], (tx, result) => {
        console.log(result.rows);
      });
    });
  };

  dropCreatePopulateDB = () => {
    if (db) {
      db.transaction(
        tx => {
          tx.executeSql("drop table if exists moods;");
        },
        null,
        () => {
          console.log("dropped table.");
          db.transaction(
            tx => {
              tx.executeSql(
                "create table if not exists moods (id integer primary key not null, rating int, date text, tags text);"
              );
            },
            null,
            () => {
              console.log("Recreated table");
              this.repopulateDB();
            }
          );
        }
      );
    }
  };

  componentDidMount() {
    this.dropCreatePopulateDB();
  }

  onIconPress = iconName => {
    console.log("Example:" + iconName);
  };

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
        <IconsList onIconPress={data => this.onIconPress(data)} />
        <MoodsList moods={moods} />
        <Text>Home Screen</Text>
        <Button
          title="STATS!"
          onPress={() => this.props.navigation.navigate("Stats")}
        />
        <Button title="Log data" onPress={() => this.logData()} />
        <Text>{new Date().toDateString()}</Text>
        <Text>{this.state.success ? "SUCCESS" : "NOT S"}</Text>
        <Text>{this.state.error ? "ERROR" : "NOT E"}</Text>
      </ScrollView>
    );
  }
}
