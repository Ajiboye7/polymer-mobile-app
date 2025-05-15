import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { useEffect } from "react";
import { View } from "react-native";
import "react-native-reanimated";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { toastConfig } from "@/components/toastConfig";

import Toast from "react-native-toast-message";
import MainContent from "./mainContent";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Gilroy-Bold": require("../assets/fonts/gilroy/Gilroy-Bold.ttf"),
    "Gilroy-Black": require("../assets/fonts/gilroy/Gilroy-Black.ttf"),
    "Gilroy-ExtraBold": require("../assets/fonts/gilroy/Gilroy-ExtraBold.ttf"),
    "Gilroy-Heavy": require("../assets/fonts/gilroy/Gilroy-Heavy.ttf"),
    "Gilroy-Light": require("../assets/fonts/gilroy/Gilroy-Light.ttf"),
    "Gilroy-Medium": require("../assets/fonts/gilroy/Gilroy-Medium.ttf"),
    "Gilroy-Regular": require("../assets/fonts/gilroy/Gilroy-Regular.ttf"),
    "Gilroy-SemiBold": require("../assets/fonts/gilroy/Gilroy-SemiBold.ttf"),
    "Gilroy-Thin": require("../assets/fonts/gilroy/Gilroy-Thin.ttf"),
    "Gilroy-UltraLight": require("../assets/fonts/gilroy/Gilroy-UltraLight.ttf"),

    "Inter-Variable": require("../assets/fonts/inter/Inter-Italic-VariableFont_opsz,wght.ttf"),
    "Inter-Italic": require("../assets/fonts/inter/Inter-VariableFont_opsz,wght.ttf"),

    "SF-Pro-Rounded-Black": require("../assets/fonts/sf/SF-Pro-Rounded-Black.otf"),
    "SF-Pro-Rounded-Bold": require("../assets/fonts/sf/SF-Pro-Rounded-Bold.otf"),
    "SF-Pro-Rounded-Heavy": require("../assets/fonts/sf/SF-Pro-Rounded-Heavy.otf"),
    "SF-Pro-Rounded-Light": require("../assets/fonts/sf/SF-Pro-Rounded-Light.otf"),
    "SF-Pro-Rounded-Medium": require("../assets/fonts/sf/SF-Pro-Rounded-Medium.otf"),
    "SF-Pro-Rounded-Regular": require("../assets/fonts/sf/SF-Pro-Rounded-Regular.otf"),
    "SF-Pro-Rounded-Semibold": require("../assets/fonts/sf/SF-Pro-Rounded-Semibold.otf"),
    "SF-Pro-Rounded-Thin": require("../assets/fonts/sf/SF-Pro-Rounded-Thin.otf"),
    "SF-Pro-Rounded-Ultralight": require("../assets/fonts/sf/SF-Pro-Rounded-Ultralight.otf"),
    "SF-Pro": require("../assets/fonts/sf/SF-Pro.ttf"),
    "SF-Pro-Italic": require("../assets/fonts/sf/SF-Pro-Italic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {/*<PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <View style={{ flex: 1, backgroundColor: "#0B274F" }}>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(screens)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>

          <Toast config={toastConfig}/>
        </View>*/}
        <MainContent />
      </PersistGate>
    </Provider>
  );
}
