import React from "react";
import { StyleSheet, View } from "react-native";
import { Card } from "react-native-elements";

import TagContainer from "../TagContainer/TagContainer";

export default class TagList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { tags, selectedTags } = this.props;
    return (
      <View style={styles.container}>
        {tags.map((tag, index) => {
          return (
            <TagContainer
              key={"tag_" + tag.id}
              tag={tag}
              isSelected={selectedTags.includes(tag.id)}
              onIconPress={id => this.props.onIconPress(id)}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "center"
  }
});
