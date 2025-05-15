import { View, ScrollView, RefreshControl } from "react-native";
import { ReactNode, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: ReactNode;
  scrollable?: boolean;
}

const ScreenWrapper = ({ children, scrollable = true }: ScreenWrapperProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000); 
  };

  const Wrapper = scrollable ? ScrollView : View;

  return (
    <View style={{ flex: 1, backgroundColor: "#0B274F" }}>
      <Wrapper
        style={{ flex: 1, backgroundColor: "#0B274F" }}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "#0B274F" }}
        {...(scrollable
          ? {
              refreshControl: (
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={["#ffffff"]}
                  tintColor="#ffffff"
                  progressBackgroundColor="#0B274F"
                />
              ),
              showsVerticalScrollIndicator: false,
              overScrollMode: "never", // Prevent Android overscroll glow
            }
          : {})}
      >
        <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>
      </Wrapper>
    </View>
  );
};

export default ScreenWrapper;
