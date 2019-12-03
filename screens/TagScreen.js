import React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import TagList from "../components/TagList/TagList";
import Database from "../database/database";

import { NavigationActions, StackActions } from "react-navigation";

const db = new Database();
export default class TagScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      selectedTags: [],
      note: "",
      rating: 0,
      date: new Date(),
      newTagAdded: false
    };
  }

  onNewTagAdded = () => {
    this.resetTagState();
  };

  resetTagState = () => {
    const { navigation } = this.props;
    let date = navigation.getParam("date");
    let rating = navigation.getParam("rating");
    console.log(date, rating);
    db.getTags().then(tags => {
      this.setState({
        tags: tags._array,
        date: date ? date : new Date(),
        rating: rating ? rating : 0
      });
    });
  };

  componentDidMount() {
    this.resetTagState();
  }

  componentWillReceiveProps(nextProps) {
    let { navigation } = nextProps;
    let d = navigation.getParam("date");
    let r = navigation.getParam("rating");
    if (d !== this.state.date || r !== this.state.rating) {
      this.setState({
        date: d,
        rating: r
      });
    }
  }

  onIconPress = id => {
    let currentTags = [...this.state.selectedTags];
    if (currentTags.includes(id)) {
      currentTags.splice(currentTags.indexOf(id), 1);
    } else {
      currentTags.push(id);
    }
    this.setState({ selectedTags: currentTags });
  };

  onChangeText = text => {
    this.setState({ note: text });
  };

  onSubmitTags = () => {
    let { rating, date, selectedTags, note } = this.state;
    let mood = {
      rating: rating,
      date: date.toISOString(),
      tags: selectedTags,
      note: note
    };
    db.insertMood(mood)
      .then(result => {
        // create and dispatch a reset action to reset
        // the current navigation stack back to top screen.
        let resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: "NewEntry"
            })
          ]
        });
        this.props.navigation.dispatch(resetAction);
        // navigate to different
        this.props.navigation.navigate("Entries", { hasNewEntry: true });
      })
      .catch(error => {
        //TODO: Display error.
        console.log("tagscreen", error);
      });
  };

  render() {
    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.svContentContainer}
      >
        <Text style={styles.titleText}>WHAT HAVE YOU BEEN UP TO?</Text>
        <TagList
          selectedTags={this.state.selectedTags}
          tags={this.state.tags}
          onIconPress={id => this.onIconPress(id)}
        />
        <Input
          onChangeText={text => this.onChangeText(text)}
          placeholder={"Add a note"}
        />
        <Button
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnStyle}
          title="Save"
          onPress={this.onSubmitTags}
        >
          Save
        </Button>
        <Button
          onPress={() => {
            this.props.navigation.navigate("NewTag", {
              onNewTagAdded: this.onNewTagAdded
            });
          }}
          containerStyle={styles.btnContainer}
          title="Add more tags"
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: "column"
  },
  svContentContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    paddingTop: 50,
    textAlign: "center",
    fontSize: 36
  },
  btnContainer: {
    marginTop: 25,
    marginBottom: 25
  },
  btnStyle: { borderRadius: 600, height: 60, width: 60 }
});
