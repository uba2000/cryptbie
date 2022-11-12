import { StatusBar } from "expo-status-bar";
import { useFonts, Archivo_400Regular } from "@expo-google-fonts/dev";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import StackNavigator from "./navigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    "archivo-regular": Archivo_400Regular,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  useEffect(() => {
    async function hide() {
      if (fontsLoaded) {
        await SplashScreen.hideAsync();
      }
    }

    hide();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </>
  );
}
