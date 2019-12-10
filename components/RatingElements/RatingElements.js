import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { ButtonGroup, Slider, withTheme } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SliderWithNumber = props => {
  const { onChangeRating, rating, theme } = props;
  return (
    <View style={styles.ratingContainer}>
      <Slider
        style={styles.slider}
        value={rating}
        minimumValue={0}
        maximumValue={100}
        step={0.1}
        onValueChange={value => onChangeRating(value)}
        thumbTintColor={theme.colors.primary}
      />
      <View style={styles.ratingTextContainer}>
        <Text>Bad</Text>
        <Text>{rating}</Text>
        <Text>Good</Text>
      </View>
    </View>
  );
};

const SliderHiddenNumber = props => {
  const { onChangeRating, rating, theme } = props;
  return (
    <View style={styles.ratingContainer}>
      <Slider
        style={styles.slider}
        value={rating}
        minimumValue={0}
        maximumValue={100}
        step={0.1}
        onValueChange={value => onChangeRating(value)}
        thumbTintColor={theme.colors.primary}
      />
      <View style={styles.ratingTextContainer}>
        <Text>Bad</Text>
        <Text>Good</Text>
      </View>
    </View>
  );
};

class DiscreteMoodFaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 2
    };
  }

  onSelectMood = index => {
    this.setState({ selectedIndex: index });
    this.props.onChangeRating(index * 25);
  };

  render() {
    const { theme } = this.props;
    const buttons = [
      <MaterialCommunityIcons
        size={50}
        name="emoticon-dead"
        color={theme.colors.quinary}
      />,
      <MaterialCommunityIcons
        size={50}
        name="emoticon-sad"
        color={theme.colors.quaternary}
      />,
      <MaterialCommunityIcons
        size={50}
        name="emoticon-neutral"
        color={theme.colors.tertiary}
      />,
      <MaterialCommunityIcons
        size={50}
        name="emoticon-happy"
        color={theme.colors.secondary}
      />,
      <MaterialCommunityIcons
        size={50}
        name="emoticon-excited"
        color={theme.colors.primary}
      />
    ];
    return (
      <View style={styles.ratingContainer}>
        <ButtonGroup
          selectedIndex={this.state.selectedIndex}
          onPress={this.onSelectMood}
          buttons={buttons}
          containerStyle={styles.buttonGroup}
          buttonStyle={styles.buttonStyle}
          innerBorderStyle={{ width: 0 }}
          selectedButtonStyle={{ backgroundColor: theme.colors.primaryLight }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: 300,
    height: 60,
    borderWidth: 0
  },
  buttonStyle: {
    borderWidth: 0,
    borderRadius: 50
  },
  slider: {
    width: 300
  },
  ratingTextContainer: {
    fontSize: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300,
    marginBottom: 50
  },
  ratingContainer: {
    marginBottom: 100
  }
});

module.exports = {
  SliderWithNumber: withTheme(SliderWithNumber),
  SliderHiddenNumber: withTheme(SliderHiddenNumber),
  DiscreteMoodFaces: withTheme(DiscreteMoodFaces)
};
