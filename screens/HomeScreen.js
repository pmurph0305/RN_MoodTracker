import React from "react";
import {
  ActivityIndicator,
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet
} from "react-native";
import { Header } from "react-native-elements";

import Database from "../database/database";
import DateNavHeader from "../components/DateNavHeader/DateNavHeader";
import MoodsList from "../components/MoodList/MoodList.js";
const db = new Database();

const DaysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
const MonthsOfYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const ShortMonthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec"
];

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    let currentDate = new Date();
    this.state = {
      isLoadingData: true,
      currentDate: currentDate,
      dateString:
        ShortMonthsOfYear[currentDate.getMonth()] +
        " " +
        currentDate.getFullYear(),
      moods: []
    };
  }

  componentDidMount() {
    // this.reseedDatabase();
    this.updateMoodStateForDate(this.state.currentDate);
  }

  /**
   * Gets the moods from the database for the current month that date is in
   * Sets state of moods & isLoadingData after query completes.
   */
  updateMoodStateForDate = date => {
    db.getMoodsInCurrentDateMonth(date)
      .then(result => {
        // Go through each item and formate date & time to display values.
        result._array.forEach(mood => {
          this.formatMoodDateTime(mood);
        });
        this.setState({ moods: result._array, isLoadingData: false });
      })
      .catch(error =>
        console.log("Error updating mood state for date.", error)
      );
  };

  reseedDatabase = () => {
    db.reseedDatabase()
      .then(r => {
        return db.getMoodsWithTags().then(result => {
          result._array.forEach(mood => {
            this.formatMoodDateTime(mood);
          });
          this.setState({ moods: result._array, isLoadingData: false });
        });
      })
      .catch(error =>
        console.log("Error reseeding or querying new data.", error)
      );
  };

  formatMoodDateTime = mood => {
    let date = new Date(mood.date);
    let dateString =
      DaysOfWeek[date.getDay()] +
      ", " +
      MonthsOfYear[date.getMonth()] +
      " " +
      date.getDate();
    mood.date = dateString;
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let AmPm = hours > 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;
    minutes = minutes > 10 ? minutes : "0" + minutes;
    mood.time = hours + ":" + minutes + " " + AmPm;
  };

  onPressDateNav = change => {
    let newDate = new Date(this.state.currentDate);
    let newMonth = newDate.getMonth() + change;
    // Wrap year on < 0 and > 11
    if (newMonth < 0) {
      newMonth = 11;
      newDate.setFullYear(newDate.getFullYear() - 1);
    } else if (newMonth > 11) {
      newMonth = 0;
      newDate.setFullYear(newDate.getFullYear() + 1);
    }
    newDate.setMonth(newMonth);
    this.setNewDateState(newDate);
  };

  /**
   * Sets the current date & displayed string to formatted value
   * Then queries the database for the new moods in that date's month.
   */
  setNewDateState = date => {
    let dateString =
      ShortMonthsOfYear[date.getMonth()] + " " + date.getFullYear();
    this.setState({
      currentDate: date,
      dateString: dateString,
      isLoadingData: true
    });
    this.updateMoodStateForDate(date);
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
              date={this.state.dateString}
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
        <Button title="Reseed" onPress={() => this.reseedDatabase()} />
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
