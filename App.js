import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { FontAwesome } from "@expo/vector-icons";
import { ThemeProvider } from "react-native-elements";
import { useScreens } from "react-native-screens";

import ThemeLoader from "./ThemeLoader";
import StatsScreen from "./screens/StatsScreen";
import HomeScreen from "./screens/HomeScreen";
import TagScreen from "./screens/TagScreen";
import RatingScreen from "./screens/RatingScreen";
import NewTagScreen from "./screens/NewTagScreen";
import SettingsScreen from "./screens/SettingsScreen";
import CustomThemeScreen from "./screens/CustomThemeScreen";

import ThemedBottomBar from "./navigationComponents/ThemedBottomBar";
import DrawerMenu from "./navigationComponents/DrawerMenu";

import { theme, getTheme, themeColors } from "./themes/themes";

useScreens();

// Stack navigator for creating a new entry. Rating Screen -> TagScreen -> (optional new tag screen to add tags while rating).
const NewEntryStack = createStackNavigator(
  {
    NewEntry: RatingScreen,
    NewTag: NewTagScreen,
    Tags: TagScreen
  },
  {
    // we don't want to display a header.
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
      headershown: false
    }
  }
);

// Configuration settings for all the routes (tabs) on the tab bar.
const routeConfig = {
  // Will also eventually need a stack navigator, to navigate to editing an entry.
  Entries: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      title: "Entries"
    })
  },
  // New entry uses the above stack navigator, as it flows through several different screens.
  NewEntry: {
    screen: NewEntryStack,
    navigationOptions: ({ navigation }) => ({
      title: "New Entry"
    })
  },
  // Will also need a stack navigator eventually to navigate between different stats pages.
  Stats: StatsScreen,
  // Although we haven't created the drawer yet, pressing this tab will open the we add after creating the tab navigator.
  More: {
    screen: HomeScreen, // Screen doesn't matter, this option opens a drawer.
    navigationOptions: ({ navigation }) => ({
      title: "More",
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
      } else if (routeName === "More") {
        iconName = "wrench";
      }
      return <FontAwesome name={iconName} size={24} color={tintColor} />;
    }
  }),
  // Our custom themed bar.
  tabBarComponent: ThemedBottomBar,
  // Initial route is the homescreen, entries.
  initialRouteName: "Entries"
};

// Create a bottom tab navigator from the above routes & configuration settings.
const BottomTabNavigator = createBottomTabNavigator(
  routeConfig,
  NavigatorConfig
);

// Create a drawer navigator that contains the bottom tab navigator, and our component to render the drawer navigator (that opens when the "More" tab is pressed).
const DrawerNavigator = createDrawerNavigator(
  {
    BottomTabNavigator,
    Settings: SettingsScreen,
    CustomTheme: CustomThemeScreen
  },
  {
    drawerPosition: "right",
    contentComponent: props => <DrawerMenu {...props} />
  }
);

// Combine them through the magic of create app container.
const AppContainer = createAppContainer(DrawerNavigator);

// Wrap our app container in the theme provider to provide the theme.
class App extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppContainer />
        <ThemeLoader />
      </ThemeProvider>
    );
  }
}

export default App;
