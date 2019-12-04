import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export default class DrawerMenu extends React.Component {
  jumpToSection = section => {
    this.props.navigation.navigate(section);
    this.props.navigation.closeDrawer();
  };
  render() {
    return (
      <View style={styles.containerStyle}>
        <RectButton
          style={styles.rectButton}
          onPress={() => this.jumpToSection("NewTag")}
        >
          <Text style={styles.textStyle}>New Tag</Text>
        </RectButton>
        <RectButton onPress={() => this.jumpToSection("Stats")}>
          <Text style={styles.textStyle}>Stats</Text>
        </RectButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    paddingTop: 40,
    paddingLeft: 5
  },
  rectButton: {
    paddingBottom: 10
  },
  textStyle: {
    fontSize: 16
  }
});
