import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { Feather, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default class TagContainer extends React.Component {
  getIconForTag = tag => {
    switch (tag.IconType) {
      case "FontAwesome":
        return (
          <FontAwesome style={styles.icon} size={24} name={tag.IconName} />
        );
      case "Feather":
        return <Feather style={styles.icon} size={24} name={tag.IconName} />;
      case "MaterialIcons":
        return (
          <MaterialIcons style={styles.icon} size={24} name={tag.IconName} />
        );
    }
  };

  render() {
    let { tag, onIconPress } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => onIconPress(tag.id)}>
        <View style={styles.container}>
          <View style={styles.iconContainer}>{this.getIconForTag(tag)}</View>
          <Text>{tag.DisplayName}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    padding: 5
  },
  container: {
    flex: 0,
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    padding: 10
  },
  iconContainer: {
    width: 60,
    height: 60,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5000,
    borderWidth: 1
  },
  iconStyle: { margin: 150, backgroundColor: "blue" }
});
