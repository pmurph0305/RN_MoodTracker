import React from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import MoodsList from "../components/MoodList/MoodList.js";
import TagList from "../components/TagList/TagList.js";
import { Header } from "react-native-elements";

import DateNavHeader from "../components/DateNavHeader/DateNavHeader";

import * as SQLite from "expo-sqlite";

import Database from "../database/database";

const dbClass = new Database();
const db = dbClass.db;
// const dbClass = new Database();
// const db = dbClass.getDatabase();
//const db = database.getDatabase();
const data = [
  {
    date: "November 24 2019",
    tags: "Relax, Games, Programming",
    rating: 45,
    note: "good day"
  },
  {
    date: "November 25 2019",
    tags: "Relax, Games",
    rating: 55
  },
  {
    date: "November 26 2019",
    tags: "Games, TV",
    rating: 75
  }
];

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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

  insertIntoDatabase = item => {
    db.transaction(
      tx => {
        tx.executeSql(
          "insert into moods (rating, date, tags, note) values (?, ?, ?, ?);",
          [item.rating, item.date, item.tags, item.note],
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
    //dbClass.getTags();
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
                "create table if not exists moods (id integer primary key not null, rating int, date text, tags text, note text);"
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
    dbClass.seedDatabase();
    dbClass.getTags().then(result => {
      this.setState({ tags: result });
    });
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
        <TagList
          selectedTags={[0, 1, 5]}
          tags={this.state.tags}
          onIconPress={data => this.onIconPress(data)}
        />
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
        <Text
          onPress={() => {
            console.log("press");
          }}
        >
          AHHH{" "}
        </Text>
      </ScrollView>
    );
  }
}
