import { StatusBar } from "expo-status-bar";
import {
  useFonts,
  Archivo_400Regular,
  ArchivoNarrow_500Medium,
  ArchivoNarrow_600SemiBold,
  ArchivoNarrow_700Bold,
  Raleway_700Bold,
} from "@expo-google-fonts/dev";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider, useSelector } from "react-redux";
import { useEffect } from "react";
import _ from "lodash";

import { store } from "./slices/store";
import StackNavigator from "./navigation";
import FullLoading from "./shared/components/FullLoading";
import { register } from "./services/ServiceFactory";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import ShareReceiptAs from "./shared/components/ShareReceiptAs";

const registerServices = _.once(register);
registerServices();

if (__DEV__) {
  import("./ReactotronConfig").then((info) => {
    console.log("Reactotron Configured");
  });
}

export default function App() {
  const [fontsLoaded] = useFonts({
    "archivo-regular": Archivo_400Regular,
    "archivo-regular500": ArchivoNarrow_500Medium,
    "archivo-regular600": ArchivoNarrow_600SemiBold,
    "archivo-regular700": ArchivoNarrow_700Bold,
    "raleway-regular700": Raleway_700Bold,
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
      <GestureHandlerRootView style={{flex: 1}}>
        <StoreProvider store={store}>
          <PaperProvider>
            <NavigationContainer>
              <StackNavigator />
              <FullLoading />
              {/* <ShareReceiptAs /> */}
            </NavigationContainer>
          </PaperProvider>
        </StoreProvider>
      </GestureHandlerRootView>
    </>
  );
}
