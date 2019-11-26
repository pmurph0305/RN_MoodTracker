import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import StatsScreen from "./screens/StatsScreen";
import HomeScreen from "./screens/HomeScreen";

const routeConfig = {
  Entries: HomeScreen,
  Stats: StatsScreen
};

const NavigatorConfig = {
  initialRouteName: "Entries"
};
// const AppNavigator = createStackNavigator(routeConfig, NavigatorConfig);

const AppNavigator = createBottomTabNavigator(routeConfig, NavigatorConfig);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
