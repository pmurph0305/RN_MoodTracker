import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, BottomTabBar } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";

import StatsScreen from "./screens/StatsScreen";
import HomeScreen from "./screens/HomeScreen";
import TagScreen from "./screens/TagScreen";
import RatingScreen from "./screens/RatingScreen";
import NewTagScreen from "./screens/NewTagScreen";

import { FontAwesome } from "@expo/vector-icons";

import { ThemeProvider, ThemeConsumer } from "react-native-elements";
import { useScreens } from "react-native-screens";
import { theme } from "./themes/themes";
useScreens();

// Themed bottom tab bar.
class ThemedBottomBar extends React.Component {
  render() {
    let { theme } = this.props;
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <BottomTabBar
            {...this.props}
            activeTintColor={theme.colors.primaryDark}
            inactiveTintColor={theme.colors.primaryDark}
            activeBackgroundColor={theme.colors.primaryLight}
            inactiveBackgroundColor={theme.colors.primary}
          />
        )}
      </ThemeConsumer>
    );
  }
}

// Drawer navigator for extra settings/more screen.
const DrawerNavigator = createDrawerNavigator({
  NewTag: {
    screen: NewTagScreen
  }
});

// Stack navigator for creating a new entry.
const NewEntryStack = createStackNavigator(
  {
    NewEntry: RatingScreen,
    NewTag: NewTagScreen,
    Tags: TagScreen,
    More: DrawerNavigator
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
      headershown: false
    }
  }
);

// Configuration settings for all the routes (tabs) on the tab bar.
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
  Stats: StatsScreen,
  More: {
    screen: StatsScreen,
    navigationOptions: ({ navigation }) => ({
      title: "More...",
      tabBarOnPress: () => {
        // Pressing this opens on the tab bar, opens the drawer.
        navigation.openDrawer();
      }
    })
  }
};

// Configuration for the navigation bar.
const NavigatorConfig = {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      // Displays a different FA Icon based on the route name.
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
  // Our custom themed bar.
  tabBarComponent: ThemedBottomBar,
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

// Create a bottom tab navigator from the above routes & configuration settings.
const AppNavigator = createBottomTabNavigator(routeConfig, NavigatorConfig);

// TODO: get the drawer working correctly.
const Drawer = createDrawerNavigator(
  {
    Main: AppNavigator
  },
  {
    drawerPosition: "right"
  }
);

const AppContainer = createAppContainer(Drawer);

export default class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer />
      </ThemeProvider>
    );
  }
}
