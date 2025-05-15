import { View, ActivityIndicator } from "react-native";

export function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#0B274F" }}>
      <ActivityIndicator size="large" color="#ffffff" />
    </View>
  );
}
