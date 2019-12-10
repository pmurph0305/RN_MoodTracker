import React from "react";
import {
  Button,
  StyleSheet,
  View,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { withTheme } from "react-native-elements";
import ThemePickerDisplay from "../ThemePickerDisplay/ThemePickerDisplay";
const ButtonGroupFlex = props => {
  const { buttons, selectedIndex, onPress, theme } = props;
  const {
    itemContainerStyle,
    itemSelectedStyle,
    containerFlexStyle,
    activeOpacity
  } = props;
  return (
    <View style={[styles.flexView, containerFlexStyle]}>
      {buttons.map((item, index) => {
        if (index === selectedIndex) {
          return (
            <TouchableOpacity
              key={"btn_grp_" + index}
              onPress={() => onPress(index)}
              style={[
                styles.itemContainerStyle,
                styles.itemSelectedStyle,
                itemContainerStyle,
                itemSelectedStyle
              ]}
              activeOpacity={activeOpacity || 0.5}
            >
              {item}
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              key={"btn_grp_" + index}
              onPress={() => onPress(index)}
              style={[styles.itemContainerStyle, itemContainerStyle]}
              activeOpacity={activeOpacity || 0.5}
            >
              {item}
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  flexView: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  itemSelectedStyle: {
    backgroundColor: "#ebebeb"
  },
  itemContainerStyle: {
    padding: 10
  }
});

export default withTheme(ButtonGroupFlex);
