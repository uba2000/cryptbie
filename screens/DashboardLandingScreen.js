import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { View, StyleSheet } from "react-native";
import { BottomNavigation, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import HomeScene from "../scenes/HomeScene";
import { theme } from "../constants";
import { CommonText } from "../utilities/components/common";
import ProfileScene from "../scenes/ProfileScene";
import PaymentLogsScene from "../scenes/PaymentLogsScene";
import useUser from "../hooks/useUser";

const renderScene = ({ route, jumpTo }) => {
  switch (route.key) {
    case "home":
      return <HomeScene jumpTo={jumpTo} />;
    case "profile":
      return <ProfileScene jumpTo={jumpTo} />;
    case "logs":
      return <PaymentLogsScene jumpTo={jumpTo} />;
  }
};

const DashboardLandingScreen = () => {
  const { showTabs } = useSelector((state) => state.navigation);
  const {isStudent} = useUser()
  const insets = useSafeAreaInsets();
  const [index, setIndex] = React.useState(0);
  const navigation = useNavigation();

  const [routes] = React.useState(
    isStudent
      ? [
          {
            key: "home",
            title: <CommonText style={styles.bottomNavText}>Home</CommonText>,
            headerTitle: "Home",
            icon: "home",
        },
          {
            key: "courses",
            title: (
              <CommonText style={styles.bottomNavText}>Courses</CommonText>
            ),
            headerTitle: "Courses",
            icon: "book",
          },
          {
            key: "profile",
            title: (
              <CommonText style={styles.bottomNavText}>Profile</CommonText>
            ),
            headerTitle: "Profile",
            icon: "wallet",
          },
        ]
      : [
          {
            key: "home",
            title: <CommonText style={styles.bottomNavText}>Home</CommonText>,
            headerTitle: "Home",
            icon: "home",
          },
          {
            key: "profile",
            title: (
              <CommonText style={styles.bottomNavText}>Profile</CommonText>
            ),
            headerTitle: "Profile",
            icon: "wallet",
          },
          {
            key: "logs",
            title: <CommonText style={styles.bottomNavText}>Logs</CommonText>,
            headerTitle: "Logs",
            icon: "wallet",
          },
        ]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: routes[index].headerTitle,
      tabIndex: index,
    });
  }, [index]);

  if (showTabs) {
    return (
      <View style={styles.screen}>
        <BottomNavigation
          shifting={false}
          safeAreaInsets={{ bottom: insets.bottom }}
          navigationState={{ index, routes }}
          onIndexChange={setIndex}
          renderScene={renderScene}
          activeColor={theme.color.primary400}
          inactiveColor={theme.color.neutral500}
          barStyle={{
            backgroundColor: "white",
            borderTopColor: theme.color.neutral100,
            borderTopWidth: 1,
          }}
        />
      </View>
    );
  }

  const route = routes[index];
  const scene = renderScene({ route, jumpTo: null });
  return <View style={styles.screen}>{scene}</View>;
};

export default DashboardLandingScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.color.secondary,
  },
  bottomNavText: { textAlign: "center" },
});
