import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import StatsScreen from "./screens/StatsScreen";
import HomeScreen from "./screens/HomeScreen";
import TagScreen from "./screens/TagScreen";
import RatingScreen from "./screens/RatingScreen";
const routeConfig = {
  Entries: HomeScreen,
  Stats: StatsScreen,
  Tags: TagScreen,
  NewEntry: RatingScreen
};

const NavigatorConfig = {
  initialRouteName: "NewEntry"
};
// const AppNavigator = createStackNavigator(routeConfig, NavigatorConfig);

const AppNavigator = createBottomTabNavigator(routeConfig, NavigatorConfig);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
