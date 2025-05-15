import { View } from "react-native";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import useCheckTokenExpiration from "@/lib/checkTokenExpiration";
import { toastConfig } from "@/components/toastConfig";

const MainContent = () => {
  useCheckTokenExpiration();

  return (
    <View style={{ flex: 1, backgroundColor: "#0B274F" }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(screens)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <Toast config={toastConfig} />
    </View>
  );
};

export default MainContent; 