import { View, ActivityIndicator, Text } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { ROUTES } from "../../constants/routes";
import { useLocalSearchParams } from "expo-router";
const loadingScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace({
        pathname: ROUTES.TRANSFER_SUCCESSFUL,
        params: params
      });
    }, 5000);


    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <ActivityIndicator size="large" color="#0b274f" />
      <Text className="mt-4 text-lg">Processing your transaction...</Text>
    </View>
  );
};

export default loadingScreen;
