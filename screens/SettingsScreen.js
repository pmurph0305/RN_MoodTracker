import React from "react";
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Picker
} from "react-native";
import { withTheme, Button, Card } from "react-native-elements";

import { RATING_TYPES } from "../constants/ratingtypes";
import { themeColors } from "../themes/themes";
import ThemePickerDisplay from "../components/ThemePickerDisplay/ThemePickerDisplay";
import ButtonGroupFlex from "../components/ButtonGroupFlex/ButtonGroupFlex";

class SettingsScreen extends React.Component {
  componentDidMount() {
    // load theme index if it exists
    this.loadData("themeIndex")
      .then(result => {
        this.setState({ selectedThemeIndex: parseInt(result) });
      })
      .catch(error => console.log(error));
    // load selected rating index if it exists.
    this.loadData("ratingKey")
      .then(result => {
        this.setState({
          selectedRatingIndex: Object.keys(RATING_TYPES).indexOf(result)
        });
      })
      .catch(error => console.log(error));
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedThemeIndex: 0,
      selectedRatingIndex: 0
    };
  }

  onChangeThemeIndex = index => {
    let { updateTheme } = this.props;
    this.setState({ selectedThemeIndex: index });
    updateTheme({ colors: themeColors[index].colors });
    this.storeData("themeIndex", index);
  };

  onChangeRatingIndex = index => {
    this.setState({ selectedRatingIndex: index });
    this.storeData("ratingKey", Object.keys(RATING_TYPES)[index]);
  };

  loadData = async key => {
    try {
      const data = await AsyncStorage.getItem("@Settings:" + key);
      if (data !== null) {
        return data;
      }
    } catch (error) {
      console.log("Error getting data for key:" + key);
    }
  };

  storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem("@Settings:" + key, value.toString());
    } catch (error) {
      console.log("Error storing data. Key:" + key + " Value:" + value);
    }
  };

  createButtonGroup = (components, onPress, selectedIndex) => {
    return (
      <ButtonGroupFlex
        buttons={components}
        selectedIndex={selectedIndex}
        onPress={onPress}
        itemSelectedStyle={styles.bgSelectedStyle}
        itemContainerStyle={styles.bgContainerStyle}
        containerFlexStyle={styles.bgFlexStyle}
      />
    );
  };

  getThemeButtonGroup = () => {
    let components = themeColors.map(theme => {
      return <ThemePickerDisplay theme={theme} />;
    });
    return this.createButtonGroup(
      components,
      this.onChangeThemeIndex,
      this.state.selectedThemeIndex
    );
  };

  getRatingButtonGroup = () => {
    let components = Object.keys(RATING_TYPES).map((key, index) => {
      return <Text>{RATING_TYPES[key]}</Text>;
    });
    return this.createButtonGroup(
      components,
      this.onChangeRatingIndex,
      this.state.selectedRatingIndex
    );
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, paddingTop: 20 }}>
        <Text style={styles.screenTitle}>Settings</Text>
        <Card style={styles.settingsGroupContainer}>
          <Text style={styles.settingsTextLabel}>Theme</Text>
          {this.getThemeButtonGroup()}
        </Card>
        <Card style={styles.settingsGroupContainer}>
          <Text style={styles.settingsTextLabel}>Rating Method</Text>
          {this.getRatingButtonGroup()}
        </Card>
        <Button title="Save" onPress={() => this.props.navigation.goBack()} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 36,
    alignSelf: "center"
  },
  settingsTextLabel: {
    fontSize: 24,
    paddingLeft: 10,
    paddingBottom: 5
  },
  settingsGroupContainer: {
    flex: 1,
    flexDirection: "column",
    borderBottomWidth: 1
  },

  bgFlexStyle: {
    justifyContent: "space-around"
  }
});

export default withTheme(SettingsScreen);
