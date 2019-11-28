import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slider, Button } from "react-native-elements";
import { Calendar } from "react-native-calendars";

const DaysOfWeek = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
const MonthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

export default class RatingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: "",
      dateString: "",
      timeString: "",
      rating: Math.random() * 100
    };
  }

  componentDidMount() {
    let date = new Date();
    this.setState({ date: date });
    console.log(date.toLocaleDateString());
    console.log(date.toISOString());
    console.log(date.toTimeString());
    // build date string.
    let dateString =
      DaysOfWeek[date.getDay()] +
      ", " +
      MonthsOfYear[date.getMonth()] +
      " " +
      date.getDate();

    // build time string.
    let time = date
      .toTimeString()
      .split(" ")[0]
      .split(":");
    // dont need ms.
    time.pop();
    // convert to ints.
    time = time.map(n => parseInt(n));
    // is it am or pm?
    let AmPm = time[0] >= 12 ? "pm" : "am";
    // convert 00 to 12 am, and > 12 (ie 13 to 1 etc.)
    if (time[0] > 12) {
      time[0] -= 12;
    }
    // if it's a 0, it's 12 am. not 00 am.
    if (time[0] === 0) {
      time[0] = 12;
    }
    // join em back up. & add am/pm.
    time = time.join(":") + " " + AmPm;

    this.setState({ dateString: dateString });
    this.setState({ timeString: time });
  }

  onCalendarDayPress = day => {
    console.log("Seelected:", day);
    let date = new Date(day.dateString);
    console.log(date.toString());
  };

  onChangeRating = value => {
    this.setState({ rating: value });
  };

  render() {
    return (
      <View style={styles.scrollView}>
        <Text style={styles.titleText}>HOW ARE YOU?</Text>
        <View style={styles.ratingTextContainer}>
          <Text>{this.state.dateString}</Text>
          <Text>{this.state.timeString}</Text>
        </View>
        <Calendar hideExtraDays={true} onDayPress={this.onCalendarDayPress} />
        <Text>{this.state.rating}</Text>
        <Slider
          style={styles.slider}
          value={this.state.rating}
          minimumValue={0}
          maximumValue={100}
          step={0.1}
          onValueChange={value => this.onChangeRating(value)}
        />
        <View style={styles.ratingTextContainer}>
          <Text>Bad</Text>
          <Text>Good</Text>
        </View>

        <Button
          title="Continue"
          type="solid"
          buttonStyle={styles.continueButton}
          containerStyle={styles.continueButton}
          onPress={() => this.props.navigation.navigate("Tags")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100
  },
  slider: {
    width: 300
  },
  continueButton: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.3,

    elevation: 2
  },

  ratingTextContainer: {
    fontSize: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300
  },
  titleText: {
    textAlign: "center",
    fontSize: 36,
    marginBottom: 20
  }
});
