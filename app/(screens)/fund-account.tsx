import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import TransferHeader from "@/components/TransferHeader";
import * as Clipboard from "expo-clipboard";
import { showToast } from "@/components/toastConfig";

const FundAccount = () => {
  const [isBusiness, setIsBusiness] = useState(false);

  const toggleSwitch = () => setIsBusiness((prevState) => !prevState);

  const accountNumber = "0235676005";

  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(accountNumber);
    showToast('info', "Account number copied to clipboard.")
  };

  return (
    <SafeAreaView className="flex-1 white">
      
      <TransferHeader title="Fund Account"/>

      <View className="bg-primary-300 rounded-t-[20px] px-3 flex-1 -mt-12">
        <Text className="text-[20px] text-white font-gilroyBold mt-6 mb-5 ">
          My Account Number
        </Text>
        <View className="px-3 mb-6 flex flex-row items-center justify-between h-[90px] bg-primary-200 rounded-[20px]  ">
          <View className="flex gap-2">
            <Text className="text-[12px] text-[#7E95B7] ">Account Number</Text>
            <View className="flex flex-row items-center">
              <Text className="text-[25px] font-gilroyExtraBold text-white">
                {accountNumber}
              </Text>
              <TouchableOpacity onPress={handleCopyToClipboard}>
                <Image source={icons.copy} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-[94.86px] h-[40px] items-center justify-center bg-white rounded-[25px]">
            <Image source={icons.sterling} />
          </View>
        </View>

        <ImageBackground
          source={images.balanceBg}
          className="-mx-3 px-3 h-[91px] justify-center items-start"
        >
          <View className="flex gap-2 ">
            <Text className="text-[12px] text-secondary-600">Account Name</Text>
            <Text className="text-[25px] font-gilroyBold text-white">
              Ajiboye Muyideen
            </Text>
          </View>
        </ImageBackground>

        <View className="flex flex-row items-center justify-start pl-2 h-[60px] bg-white rounded-[50px] my-10">
          <TouchableOpacity className="mr-6 ">
            <View className="bg-primary-200 w-[41.67px] h-[41.67px] items-center justify-center rounded-full">
              <Image source={icons.share} resizeMode="contain" />
            </View>
          </TouchableOpacity>

          <Text className="text-[16px] font-gilroySemiBold">
            Share Account Information
          </Text>
        </View>

        <View className=" px-5 flex flex-row items-center justify-start bg-secondary-500 rounded-[20px] h-[80px] ">
          <View className="flex flex-row items-center  gap-2">
            <TouchableOpacity>
              <Image source={icons.setting} />
            </TouchableOpacity>
            <Text className="text-[12px] font-interItalic text-secondary-100 w-[288px]">
              When you deposit directly into this account, it reflects on your
              Naira account balance.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FundAccount;
