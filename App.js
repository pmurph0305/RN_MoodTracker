import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";

import StatsScreen from "./screens/StatsScreen";
import HomeScreen from "./screens/HomeScreen";
import TagScreen from "./screens/TagScreen";
import RatingScreen from "./screens/RatingScreen";
import NewTagScreen from "./screens/NewTagScreen";

import { FontAwesome } from "@expo/vector-icons";
import { Rating } from "react-native-ratings";

const NewEntryStack = createStackNavigator(
  {
    NewEntry: RatingScreen,
    NewTag: NewTagScreen,
    Tags: TagScreen
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
      headershown: false
    }
  }
);

const routeConfig = {
  Entries: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Entries"
    })
  },
  NewEntry: {
    screen: NewEntryStack,
    navigationOptions: ({ navigation }) => ({
      title: "New Entry"
    })
  },
  Stats: StatsScreen
};

// pie-chart for stats
// + for new entry.
// plus-circle
const NavigatorConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName = "book";
      if (routeName === "Entries") {
        iconName = "book";
      } else if (routeName === "Stats") {
        iconName = "pie-chart";
      } else if (routeName === "NewEntry") {
        iconName = "plus-circle";
      } else if (routeName === "Tags") {
        iconName = "bookmark"; // temporary, should only be accessed through new entries.
      }
      return <FontAwesome name={iconName} size={24} color={tintColor} />;
    }
  }),

  initialRouteName: "Entries",
  tabBarOptions: {
    activeBackgroundColor: "#799CF4",
    inactiveBackgroundColor: "#5e8cff",
    activeTintColor: "#ffffff",
    inactiveTintColor: "#f5f5f5",
    labelStyle: { fontSize: 12 }
  },
  headerHideBackButton: true,
  headerMode: "none",
  navigationOptions: {
    headerVisible: false
  }
};
// const AppNavigator = createStackNavigator(routeConfig, NavigatorConfig);

const AppNavigator = createBottomTabNavigator(routeConfig, NavigatorConfig);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
