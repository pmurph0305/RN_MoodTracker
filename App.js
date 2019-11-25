import React from "react";
import { View, Text, Button } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import StatsScreen from "./screens/StatsScreen";

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

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      error: false,
      items: []
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
  };

  logData = () => {
    console.log("log data");
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM MOODS", [], (tx, result) => {
        this.setState({ items: result.rows._array });
      });
    });
    //   tx.executeSql("select * from moods", [], (_, { rows }) => {

    //   }
    //   console.log(JSON.stringify(rows))
    // );
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

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Home Screen1</Text>
        <Button
          title="STATS!"
          onPress={() => this.props.navigation.navigate("Stats")}
        />
        <Button title="Log data" onPress={() => this.logData()} />
        <Text>{new Date().toDateString()}</Text>
        <Text>{this.state.success ? "SUCCESS" : "NOT S"}</Text>
        <Text>{this.state.error ? "ERROR" : "NOT E"}</Text>
        {this.state.items.length > 0 ? (
          this.state.items.map((item, index) => {
            return <Text key={index}>{item.date}</Text>;
          })
        ) : (
          <Text>NO items</Text>
        )}
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Stats: StatsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
