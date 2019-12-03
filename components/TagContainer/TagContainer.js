import React from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { Feather, MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default class TagContainer extends React.Component {
  getIconForTag = (tag, size = 24) => {
    let color = this.props.isSelected ? "white" : "white";
    switch (tag.iconType) {
      case "FontAwesome":
        return (
          <FontAwesome
            style={styles.icon}
            size={size}
            name={tag.iconName}
            color={color}
          />
        );
      case "Feather":
        return (
          <Feather
            style={styles.icon}
            size={size}
            name={tag.iconName}
            color={color}
          />
        );
      case "MaterialIcons":
        return (
          <MaterialIcons
            style={styles.icon}
            size={size}
            name={tag.iconName}
            color={color}
          />
        );
    }
  };

  getFillColor = isSelected => {
    return { backgroundColor: isSelected ? "#425390" : "#799CF4" };
  };

  render() {
    let {
      tag,
      onIconPress,
      isSelected,
      size,
      iconContainerStyle,
      containerStyle
    } = this.props;
    return (
      <TouchableWithoutFeedback onPress={() => onIconPress(tag.id)}>
        <View style={[styles.container, containerStyle]}>
          <View
            style={[
              styles.iconContainer,
              this.getFillColor(isSelected),
              iconContainerStyle
            ]}
          >
            {this.getIconForTag(tag, size)}
          </View>
          <Text>{tag.displayName}</Text>
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
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    padding: 10
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5000
    // borderWidth: 1
  },
  iconStyle: { margin: 150 }
});
