import { View, Text, Image, ScrollView, StatusBar} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import Button from "@/components/Button";

const PhotoCapture = () => {
  return (
    <SafeAreaView className="px-5 mt-6">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="items-center">
          <View className="relative mb-3">
            <Image source={images.faceScan} />
            <Image
              source={images.warning}
              className="absolute top-[72px] left-16"
            />
          </View>

          <Image source={images.oops} />

          <Text className="w-[300px] text-[14px] text-secondary-600 font-semibold text-center my-5 ">
            We couldn’t verify you, you can try this 2 more times. Make sure to
            follow these guidelines.
          </Text>
        </View>

        <View className="w-full h-[270px] border-[1px] border-dashed border-primary-200 rounded-[25px] px-4 py-6">
          <View className="">
            <Text className="text-[16px] text-secondary-800 font-bold mb-4">
              We recommend that:
            </Text>

            <View className="flex-row items-center mb-4">
              <Image
                source={icons.light}
                className="w-[24px] h-[24px] mr-3"
                resizeMode="contain"
              />
              <Text className="text-[14px] text-secondary-600 leading-[20px] font-semibold">
                Your environment has proper lighting
              </Text>
            </View>

            <View className="flex-row items-center mb-4">
              <Image
                source={icons.quote}
                className="w-[24px] h-[24px] mr-3"
                resizeMode="contain"
              />
              <Text className="text-[14px] text-secondary-600 leading-[20px] flex-shrink font-semibold">
                You remove glasses, hats, hijabs, face masks, or any face
                coverings.
              </Text>
            </View>

            <View className="flex-row items-center mb-4 ">
              <Image
                source={icons.caution}
                className="w-[24px] h-[24px] mr-3"
                resizeMode="contain"
              />
              <Text className="text-[14px] text-secondary-600 leading-[20px] flex-shrink font-semibold">
                Remain neutral - don’t smile just yet, keep your mouth closed.
              </Text>
            </View>

            <Text className="text-[14px] text-primary-300 mt-4 leading-[18px] ">
              <Text className="text-primary-300 font-bold">Note</Text>: This is
              not a profile picture and would not be saved.
            </Text>
          </View>
        </View>
        <Button title="Retake" buttonStyle="my-10 h-[49.77px] w-full" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PhotoCapture;
