import React, { Fragment, useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Alert, BackHandler } from "react-native";
import { useNavigation } from "@react-navigation/native";
import GetStartedScreen from "../screens/GetStartedScreen";
import { theme } from "../constants";
import SignupScreen from "../screens/SignupScreen";
import LoginScreen from "../screens/LoginScreen";
import DashboardLandingScreen from "../screens/DashboardLandingScreen";
import CustomNavigationBar from "../shared/components/CustomNavigationBar";

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  const navigation = useNavigation();

  const handleBackAction = () => {
    const appCanGoback = navigation.canGoBack();

    if (!appCanGoback) {
      Alert.alert("Please confirm", "Are you sure you want to exit app?", [
        { text: "Cancel" },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
    }
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackAction
    );
    return () => backHandler.remove();
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="GetStarted"
      id="rootStack"
      screenOptions={{
        contentStyle: { backgroundColor: theme.color.secondary },
      }}
    >
      <Stack.Screen
        name="GetStarted"
        component={GetStartedScreen}
        options={{ headerBackVisible: false, headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerBackVisible: false, headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerBackVisible: false, headerShown: false }}
      />
      <Stack.Screen
        name="DashboardLanding"
        component={DashboardLandingScreen}
        options={{
          header: (props) => <CustomNavigationBar {...props} />,
          headerShown: true,
          headerBackVisible: false,
          headerStyle: {
            backgroundColor: theme.color.secondary,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
