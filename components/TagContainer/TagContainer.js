import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { Feather, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default class TagContainer extends React.Component {
  getIconForTag = tag => {
    let color = this.props.isSelected ? "white" : "black";
    switch (tag.IconType) {
      case "FontAwesome":
        return (
          <FontAwesome
            style={styles.icon}
            size={24}
            name={tag.IconName}
            color={color}
          />
        );
      case "Feather":
        return (
          <Feather
            style={styles.icon}
            size={24}
            name={tag.IconName}
            color={color}
          />
        );
      case "MaterialIcons":
        return (
          <MaterialIcons
            style={styles.icon}
            size={24}
            name={tag.IconName}
            color={color}
          />
        );
    }
  };

  getFillColor = isSelected => {
    return { backgroundColor: isSelected ? "black" : "white" };
  };

  render() {
    let { tag, onIconPress, isSelected } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => onIconPress(tag.id)}>
        <View style={styles.container}>
          <View style={[styles.iconContainer, this.getFillColor(isSelected)]}>
            {this.getIconForTag(tag)}
          </View>
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
    width: 50,
    height: 50,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5000,
    borderWidth: 1
  },
  iconStyle: { margin: 150, backgroundColor: "blue" }
});
