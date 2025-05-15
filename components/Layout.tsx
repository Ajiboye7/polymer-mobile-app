/*import { View, Text } from "react-native";
import React, { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeBack from "@/components/HomeBack";

import BottomSheet, {
    BottomSheetScrollView,
    BottomSheetView,
  } from "@gorhom/bottom-sheet";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView>
      <View className="flex-1">
      <HomeBack/>
      

        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={["47%", "83%"]}
          index={0}
        >
            <BottomSheetScrollView>
                {children}
            </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default HomeLayout;*/

import React, { useRef } from "react";
import { View, useWindowDimensions } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { LayoutProps } from "@/types/types";

const Layout = ({ children, backgroundComponent, snapPoints }: LayoutProps) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { height } = useWindowDimensions(); // Get the screen height

  // If snapPoints are not provided, use default dynamic snapPoints
  const dynamicSnapPoints = snapPoints || [`${height * 0.4}%`, `${height * 0.8}%`];

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="flex-1">
        {backgroundComponent}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={dynamicSnapPoints} // Use dynamic snapPoints
          index={1}
        >
          <BottomSheetScrollView>{children}</BottomSheetScrollView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default Layout;



