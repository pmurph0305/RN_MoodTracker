import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import TagContainer from "../components/TagContainer/TagContainer";

import { allIcons } from "../constants/icons";

import Database from "../database/database";

export default class NewTagScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIconName: undefined,
      iconType: undefined,
      displayName: ""
    };
  }

  onIconPress = (iconName, iconType) => {
    console.log("press", iconName);
    console.log("type", iconType);
    this.setState({ selectedIconName: iconName, iconType: iconType });
  };

  onChangeText = text => {
    this.setState({ displayName: text });
  };

  onSubmitNewTag = () => {
    if (
      this.state.iconType &&
      this.state.selectedIconName &&
      this.state.displayName.length > 0
    ) {
      let db = new Database();
      db.insertTag(this.state.iconType, {
        iconName: this.state.selectedIconName,
        displayName: this.state.displayName
      })
        .then(result => {
          // navigate back to previous screen, make it requery for the new tag.
          this.props.navigation.goBack();
          this.props.navigation.state.params.onNewTagAdded();
        })
        .catch(error => {
          console.log("Error adding a new tag", error);
        });
    }
  };

  render() {
    return (
      <View style={styles.viewContainer}>
        <Text style={styles.title}>Select an Icon</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContentContainer}
        >
          {allIcons.fontAwesomeIcons.map((icon, index) => {
            return (
              <TagContainer
                key={"icon_" + index}
                tag={{
                  iconName: icon.iconName,
                  iconType: "FontAwesome",
                  id: icon.iconName,
                  displayName: ""
                }}
                size={16}
                onIconPress={() =>
                  this.onIconPress(icon.iconName, "FontAwesome")
                }
                isSelected={this.state.selectedIconName === icon.iconName}
                iconContainerStyle={styles.iconContainerStyle}
                containerStyle={styles.iconOuterContainerStyle}
              />
            );
          })}
          {allIcons.featherIcons.map((icon, index) => {
            return (
              <TagContainer
                key={"icon_" + index}
                tag={{
                  iconName: icon.iconName,
                  iconType: "Feather",
                  id: icon.iconName,
                  displayName: ""
                }}
                size={16}
                onIconPress={() => this.onIconPress(icon.iconName, "Feather")}
                isSelected={this.state.selectedIconName === icon.iconName}
                iconContainerStyle={styles.iconContainerStyle}
                containerStyle={styles.iconOuterContainerStyle}
              />
            );
          })}
          {allIcons.materialIcons.map((icon, index) => {
            return (
              <TagContainer
                key={"icon_" + index}
                tag={{
                  iconName: icon.iconName,
                  iconType: "MaterialIcons",
                  id: icon.iconName,
                  displayName: ""
                }}
                size={16}
                onIconPress={() =>
                  this.onIconPress(icon.iconName, "MaterialIcons")
                }
                isSelected={this.state.selectedIconName === icon.iconName}
                iconContainerStyle={styles.iconContainerStyle}
                containerStyle={styles.iconOuterContainerStyle}
              />
            );
          })}
        </ScrollView>
        <Input
          onChangeText={text => this.onChangeText(text)}
          placeholder={"Name your new tag"}
        />
        <Button
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnStyle}
          title="Save"
          onPress={this.onSubmitNewTag}
        >
          Save
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16
  },
  viewContainer: {
    marginTop: 50,
    marginBottom: 50,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  scrollView: {},
  scrollViewContentContainer: {
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "row",
    paddingBottom: 20
  },
  iconContainerStyle: {
    width: 35,
    height: 35
  },
  iconOuterContainerStyle: {
    padding: 5
  },
  btnContainer: {
    marginTop: 30,
    marginBottom: 30
  },
  btnStyle: { borderRadius: 600, height: 60, width: 60 }
});
