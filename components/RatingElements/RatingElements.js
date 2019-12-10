import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Slider, withTheme } from "react-native-elements";

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

const styles = StyleSheet.create({
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
  SliderHiddenNumber: withTheme(SliderHiddenNumber)
};
