import React from "react";
import { ThemeConsumer, withTheme } from "react-native-elements";
import { BottomTabBar } from "react-navigation-tabs";

class ThemedBottomBar extends React.Component {
  render() {
    let { theme } = this.props;
    return (
      <ThemeConsumer>
        {({ theme }) => (
          <BottomTabBar
            {...this.props}
            activeTintColor={theme.colors.activeTint}
            inactiveTintColor={theme.colors.inactiveTint}
            activeBackgroundColor={theme.colors.primaryLight}
            inactiveBackgroundColor={theme.colors.primary}
            labelStyle={theme.tabStyle.labelStyle}
          />
        )}
      </ThemeConsumer>
    );
  }
}

export default ThemedBottomBar;
