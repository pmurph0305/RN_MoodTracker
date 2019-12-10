import React from "react";
import { AsyncStorage } from "react-native";
import { withTheme } from "react-native-elements";
import { themeColors } from "./themes/themes";

/**
 * An empty component that loads the theme using AsyncStorage.
 * It tries to load the theme, then calls update theme if successful.
 */
class ThemeLoader extends React.Component {
  componentDidMount() {
    this.loadTheme();
  }

  loadTheme = async () => {
    let { updateTheme } = this.props;
    try {
      const index = await AsyncStorage.getItem("@Settings:themeIndex");
      if (index !== null) {
        updateTheme({ colors: themeColors[parseInt(index)].colors });
      }
    } catch (error) {
      console.log("error getting theme", error);
    }
  };

  render() {
    return <></>;
  }
}
export default withTheme(ThemeLoader);
