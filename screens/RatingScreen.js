import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slider, Button } from "react-native-elements";
import DateTimePicker from "react-native-modal-datetime-picker";
import RatingContainer from "../components/RatingContainer/RatingContainer";

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
    let randomRating = Math.round(Math.random() * 1000) / 10;
    this.state = {
      datePicked: new Date(),
      timePicked: new Date(),
      isDatePickerVisible: false,
      isTimePickerVisible: false,
      dateString: "",
      timeString: "",
      rating: randomRating
    };
  }

  componentDidMount() {
    let date = new Date();
    this.setState({ datePicked: date, timePicked: date });
    this.parseDateToString(date);
    this.parseDateToTimeString(date);

    // workaround to prevent needing higher state when changing rating type then going back to rating screen.
    this.willFocusListener = this.props.navigation.addListener(
      "willFocus",
      payload => {
        this.forceUpdate();
      }
    );
  }

  componentWillUnMount() {
    //  remove nagivation listener on unmount.
    this.willFocusListener.remove();
  }

  onChangeRating = value => {
    value = parseFloat(value.toFixed(1));
    this.setState({ rating: value });
  };

  /**
   * @param {object} date JS date object.
   * Parses a js date object to a "3:14 pm" string
   * (A 12-hour 12:00 am -> 11:59 pm string.)
   * Ignores milliseconds.
   * Sets timeString's state.
   */
  parseDateToTimeString = date => {
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
    // add an extra 0 to minutes before joining if needed.
    if (time[1] < 10) {
      time[1] = "0" + time[1];
    }
    // join em back up. & add am/pm.
    time = time.join(":") + " " + AmPm;
    this.setState({ timeString: time });
  };

  /**
   * @param {object} date JS Date object
   * Parses a js date object to a "Mon, Nov 5" string format.
   * Sets dateString's state.
   */
  parseDateToString = date => {
    let dateString =
      DaysOfWeek[date.getDay()] +
      ", " +
      MonthsOfYear[date.getMonth()] +
      " " +
      date.getDate();
    this.setState({ dateString: dateString });
  };

  handleDatePicked = date => {
    this.setState({ datePicked: date });
    this.parseDateToString(date);
    this.hideDatePicker();
  };

  hideDatePicker = () => {
    this.setState({ isDatePickerVisible: false });
  };

  showDatePicker = () => {
    this.setState({ isDatePickerVisible: true });
  };

  handleTimePicked = date => {
    this.setState({ timePicked: date });
    this.parseDateToTimeString(date);
    this.hideTimePicker();
  };

  hideTimePicker = () => {
    this.setState({ isTimePickerVisible: false });
  };

  showTimePicker = () => {
    this.setState({ isTimePickerVisible: true });
  };

  // Converts date & time picked if they are different
  // to a single date, then navigates to tags, passing the date & rating to that screen.
  onContinuePress = () => {
    let datePicked = this.state.datePicked.toISOString();
    let timePicked = this.state.timePicked.toISOString();
    let fullDatePicked = datePicked;
    if (datePicked !== timePicked) {
      fullDatePicked =
        datePicked.split("T")[0] + "T" + timePicked.split("T")[1];
    }
    this.props.navigation.navigate("Tags", {
      date: new Date(fullDatePicked),
      rating: this.state.rating
    });
  };

  render() {
    return (
      <View style={styles.scrollView}>
        <Text style={styles.titleText}>HOW ARE YOU?</Text>
        <View style={styles.ratingDateTimeContainer}>
          <Button
            title={this.state.dateString}
            type="clear"
            icon={{
              name: "caret-down",
              type: "font-awesome",
              size: 15,
              color: "black"
            }}
            iconRight={true}
            iconContainerStyle={styles.btnPickerIconContainer}
            titleStyle={styles.btnPickerTitle}
            onPress={this.showDatePicker}
          />
          <Button
            title={this.state.timeString}
            type="clear"
            icon={{
              name: "caret-down",
              type: "font-awesome",
              size: 15,
              color: "black"
            }}
            iconRight={true}
            iconContainerStyle={styles.btnPickerIconContainer}
            titleStyle={styles.btnPickerTitle}
            onPress={this.showTimePicker}
          />
        </View>

        <DateTimePicker
          isVisible={this.state.isDatePickerVisible}
          onConfirm={this.handleDatePicked}
          onCancel={this.hideDatePicker}
          maximumDate={new Date()}
          date={this.state.datePicked}
        />
        {/* en_GB makes is24Hour work on iOS according to docs */}
        <DateTimePicker
          locale="en_GB"
          mode="time"
          date={this.state.timePicked}
          is24Hour={false}
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this.handleTimePicked}
          onCancel={this.hideTimePicker}
        />

        <RatingContainer
          rating={this.state.rating}
          onChangeRating={this.onChangeRating}
        />
        <Button
          title="Continue"
          type="solid"
          buttonStyle={styles.continueButton}
          containerStyle={styles.continueButton}
          onPress={this.onContinuePress}
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
    marginTop: 150
  },

  ratingDateTimeContainer: {
    fontSize: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginBottom: 50
  },

  continueButton: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 51
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.3,
    elevation: 2
  },

  titleText: {
    textAlign: "center",
    fontSize: 36,
    marginBottom: 20
  },

  btnPickerIconContainer: {
    marginLeft: 10
  },
  btnPickerTitle: {
    color: "black"
  }
});

// iconRight={true}
// iconContainerStyle={{ marginLeft: 10 }}
// titleStyle={{ color: "black" }}
// onPress={this.showDatePicker}
