import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import * as Clipboard from "expo-clipboard";
import ScreenWrapper from "@/components/ScreenWrapper";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";


const Payment = () => {

  const user = useSelector((state : RootState)=> state.auth.user)
  const userName = user?.name?.split(" ")[0] || "Guest";
  const router = useRouter()
  return (
    <ScreenWrapper>
      <View className="h-[25%]">
        <ImageBackground
          source={images.BgBoxes}
          className=" h-[91px] justify-center"
        >
          <View className="px-4">
            <Text className="text-[#7E95B7] text-[16px] font-gilroyBold leading-[20px] my-4">
            Hi, {userName || "Guest"} 
            </Text>
            <Text className="text-white text-[18px] font-gilroyBold leading-[25px]">
              What kind of payments would you like to make today?
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View className=" space-y-10 rounded-t-[30px] px-3 py-5 pt-6 -mt-12 bg-white pb-20 h-full" >
        <TouchableOpacity onPress={()=>{
          router.push(ROUTES.INTERNATIONAL_TRANSFER)
        }}>
          <Image
            source={images.internationalTransfer}
            className="h-[240px] w-full "
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>{
          router.push(ROUTES.LOCAL_TRANSFER)
        }}>
          <Image
            source={images.localTransfer}
            className="h-[240px] w-full"
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

export default Payment;
