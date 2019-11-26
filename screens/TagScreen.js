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
      note: ""
    };
  }

  componentDidMount() {
    db.getTags().then(tags => {
      this.setState({ tags: tags });
    });
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
