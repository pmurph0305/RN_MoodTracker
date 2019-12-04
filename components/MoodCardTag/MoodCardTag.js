import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default class MoodCardTag extends React.Component {
  getIconForTag = (tag, color) => {
    switch (tag.iconType) {
      case "FontAwesome":
        return (
          <FontAwesome
            style={styles.icon}
            size={16}
            name={tag.iconName}
            color={color}
          />
        );
      case "Feather":
        return (
          <Feather
            style={styles.icon}
            size={16}
            name={tag.iconName}
            color={color}
          />
        );
      case "MaterialIcons":
        return (
          <MaterialIcons
            style={styles.icon}
            size={16}
            name={tag.iconName}
            color={color}
          />
        );
    }
  };

  render() {
    let { tag, color } = this.props;
    return (
      <View style={styles.container}>
        {this.getIconForTag(tag, color)}
        <Text>{tag.displayName}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 5
  },
  icon: { paddingRight: 5 }
});
