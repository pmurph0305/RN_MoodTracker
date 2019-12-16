import React from "react";

import { View, Text, StyleSheet } from "react-native";
import { Button, Overlay, withTheme } from "react-native-elements";
import {
  ColorPicker,
  TriangleColorPicker,
  fromHsv,
  toHsv
} from "react-native-color-picker";
import { TouchableOpacity } from "react-native-gesture-handler";

class CustomThemeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: ["#deb618", "#2ecc71", "#27ae9c", "#2781ae", "#2742ae"],
      isColorPickerOpen: false,
      colorPickerIndex: 0,
      colorPickerColor: ""
    };
  }

  onColorChange = color => {
    this.setState({ colorPickerColor: color });
  };

  onOpenColorPicker = index => {
    this.setState({
      isColorPickerOpen: true,
      colorPickerIndex: index,
      colorPickerColor: toHsv(this.state.colors[index])
    });
  };

  onCancelPressed = () => {
    this.setState({ isColorPickerOpen: false });
  };

  onSubmitPressed = () => {
    let colors = [...this.state.colors];
    colors[this.state.colorPickerIndex] = fromHsv(this.state.colorPickerColor);
    this.setState({ isColorPickerOpen: false, colors: colors });
  };

  render() {
    return (
      <View style={{ flex: 1, padding: 45, backgroundColor: "#ffffff" }}>
        <Text style={{ color: "white" }}>
          React Native Color Picker - Controlled
        </Text>
        <TouchableOpacity
          style={styles.colorItem}
          onPress={() => this.onOpenColorPicker(0)}
        >
          <View
            style={[
              styles.colorItemPreview,
              { backgroundColor: this.state.colors[0] }
            ]}
          />
          <Text style={styles.colorItemLabel}>Primary Color</Text>
        </TouchableOpacity>
        <Overlay isVisible={this.state.isColorPickerOpen}>
          <View style={{ flex: 1, padding: 45 }}>
            <ColorPicker
              color={this.state.colorPickerColor}
              onColorChange={this.onColorChange}
              style={{ flex: 1 }}
            />
            <Button title="Submit" onPress={this.onSubmitPressed} />
            <Button title="Cancel" onPress={this.onCancelPressed} />
          </View>
        </Overlay>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    paddingTop: 30,
    fontSize: 30
  },

  colorItem: {
    flexDirection: "row",
    alignItems: "center"
  },
  colorItemPreview: {
    borderWidth: 1,
    width: 25,
    height: 25
  },
  colorItemLabel: {
    fontSize: 20,
    paddingLeft: 20
  }
});

export default withTheme(CustomThemeScreen);
