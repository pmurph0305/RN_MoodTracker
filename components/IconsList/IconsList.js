import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

import IconContainer from "../IconContainer/IconContainer";

const fontAwesomeIcons = [
  "glass",
  "music",
  "search",
  "heart",
  "star",
  "user",
  "film",
  "envelope-o",
  "home",
  "road",
  "cog",
  "tag",
  "bookmark",
  "camera",
  "print",
  "book",
  "gift",
  "leaf",
  "fire",
  "eye",
  "plane",
  "shopping-cart",
  "key",
  "trophy",
  "phone",
  "bell",
  "dashboard",
  "umbrella",
  "beer",
  "gamepad",
  "flag-o",
  "meh-o",
  "rocket",
  "soccer-ball-o",
  "bomb",
  "plug",
  "trash"
];

export default class IconList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("TAGS", this.props.tags);
    if (!this.props.tags || this.props.tags.length === 0) {
      return (
        <Card wrapperStyle={styles.wrapper}>
          {fontAwesomeIcons.map((iconName, index) => {
            return (
              <FontAwesome
                key={"fa_" + index}
                style={styles.icon}
                size={32}
                name={iconName}
                onPress={() => {
                  console.log("press; fa_" + index);
                  this.props.onIconPress("fa_" + index);
                }}
              />
            );
          })}
        </Card>
      );
    } else {
      return (
        <View style={styles.container}>
          {this.props.tags.map((tag, index) => {
            return <IconContainer key={"tag_" + tag.id} tag={tag} />;
          })}
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  },
  icon: { marginRight: 10, padding: 10 }
});
