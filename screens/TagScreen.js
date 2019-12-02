import React from "react";
import { Text, ScrollView, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import TagList from "../components/TagList/TagList";
import Database from "../database/database";

const db = new Database();
export default class TagScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      selectedTags: [],
      note: "",
      rating: 0,
      date: new Date()
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    console.log("dn", navigation.getParam("date"));
    let date = navigation.getParam("date");
    let rating = navigation.getParam("rating");
    db.getTags().then(tags => {
      this.setState({
        tags: tags._array,
        date: date ? date : new Date(),
        rating: rating ? rating : 0
      });
    });
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
    console.log("Inserting...", mood);
    db.insertMood(mood)
      .then(result => {
        console.log("ts", result);
      })
      .catch(error => {
        console.log("ts", error);
      });
  };

  render() {
    return (
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.svContentContainer}
      >
        <Text>{this.state.rating}</Text>
        <Text>{this.state.date.toISOString()}</Text>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    flexDirection: "column",
    marginTop: 50
  },
  svContentContainer: {
    justifyContent: "center",
    alignItems: "center"
  },
  titleText: {
    textAlign: "center",
    fontSize: 36
  },
  btnContainer: {
    marginTop: 30,
    marginBottom: 30
  },
  btnStyle: { borderRadius: 600, height: 60, width: 60 }
});
