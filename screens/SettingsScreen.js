import React from "react";
import { AsyncStorage, ScrollView, Text, View } from "react-native";
import { withTheme, ButtonGroup } from "react-native-elements";

import { themeColors } from "../themes/themes";
import ThemePickerDisplay from "../components/ThemePickerDisplay/ThemePickerDisplay";

class SettingsScreen extends React.Component {
  componentDidMount() {
    this.loadData("themeIndex").then(result => {
      this.setState({ selectedThemeIndex: parseInt(result) });
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      selectedThemeIndex: 0
    };
  }

  onChangeThemeIndex = index => {
    let { updateTheme } = this.props;
    this.setState({ selectedThemeIndex: index });
    updateTheme({ colors: themeColors[index].colors });
    this.storeData("themeIndex", index);
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

  getButtonGroup = () => {
    let components = themeColors.map((theme, index) => {
      return { element: () => <ThemePickerDisplay theme={theme} /> };
    });
    return (
      <ButtonGroup
        buttons={components}
        selectedIndex={this.state.selectedThemeIndex}
        onPress={this.onChangeThemeIndex}
      />
    );
  };

  render() {
    return (
      <ScrollView style={{ flex: 1, paddingTop: 100 }}>
        <Text>Settings Screen</Text>
        <View>
          <Text>Theme</Text>
          {this.getButtonGroup()}
        </View>
      </ScrollView>
    );
  }
}

export default withTheme(SettingsScreen);
