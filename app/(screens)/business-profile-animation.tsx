import React, { useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import {ROUTES} from "@/constants/routes"

const BusinessProfileAnimation = () => {
  const router = useRouter();
  const imagePosition = useRef(new Animated.Value(0)).current;
  const textPosition = useRef(new Animated.Value(-100)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const borderPosition = useRef(new Animated.Value(-400)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(imagePosition, {
        toValue: -50,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(textPosition, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(borderPosition, {
        toValue: 0, 
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        router.replace(ROUTES.HOME); 
      }, 9000);
    });
  }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-primary-300">
      <Animated.Image
        source={images.splash}
        style={{
          width: 60,
          height: 72,
          transform: [{ translateX: imagePosition }, { translateY: 50 }],
        }}
      />

      <Animated.Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          opacity: textOpacity.interpolate({
            inputRange: [0, 0.8, 1],
            outputRange: [0, 0, 1],
          }),
          transform: [{ translateY: 30 }, { translateX: 30 }],
        }}
      >
        <Text className="text-white text-[37px] font-gilroyExtraBold">
          Polymer
        </Text>
      </Animated.Text>

      
      <Animated.View
        style={{
          position: "absolute",
          bottom: 50,
          right: 0,
          left: 0,
          backgroundColor: "white",
          borderWidth: 2,
          paddingHorizontal: 20,
          paddingVertical: 10,
          width: "100%",
          transform: [{ translateX: borderPosition }, { translateY: -130 }],
        }}
      >
        <View className="flex items-end px-3 mr-5">
          <Text className="text-[28px] font-gilroySemiBold text-primary-300">
            <Text className="text-[18px] font-gilroyLight">for</Text> {"\n"}
            Businesses
          </Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default BusinessProfileAnimation;
