import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Feather, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default class IconContainer extends React.Component {
  getIconForTag = tag => {
    switch (tag.IconType) {
      case "FontAwesome":
        return (
          <FontAwesome
            style={styles.icon}
            size={24}
            name={tag.IconName}
            onPress={() => {
              console.log("press; fa_" + index);
              this.props.onIconPress("fa_" + index);
            }}
          />
        );
      case "Feather":
        return (
          <Feather
            style={styles.icon}
            size={24}
            name={tag.IconName}
            onPress={() => {
              console.log("press; fa_" + index);
              this.props.onIconPress("fa_" + index);
            }}
          />
        );
      case "MaterialIcons":
        return (
          <MaterialIcons
            style={styles.icon}
            size={24}
            name={tag.IconName}
            onPress={() => {
              console.log("press; fa_" + index);
              this.props.onIconPress("fa_" + index);
            }}
          />
        );
    }
  };

  render() {
    let { tag } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>{this.getIconForTag(tag)}</View>
        <Text>{tag.DisplayName}</Text>
      </View>
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
