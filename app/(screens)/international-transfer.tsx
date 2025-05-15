import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import * as Clipboard from "expo-clipboard";
import CustomSwipeButton from "@/components/CustomSwipeButton";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import TransferHeader from "@/components/TransferHeader";
import CustomView from "@/components/CustomView";

const InternationalTransfer = () => {
  const router = useRouter();
  

  const accountNumber = "0235676005";

  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(accountNumber);
    Alert.alert("Copied!", "Account number copied to clipboard.");
  };

  const [isPinInputVisible, setPinInputVisible] = useState(false);
  const [pin, setPin] = useState("");

  const handleSwipeSuccess = () => {
    //setPinInputVisible(true);
    router.push(ROUTES.INTERNATIONAL_BANK_DETAILS);
    //console.log("Swipe successful!");
  };

  const handlePinChange = (value: string) => {
    setPin(value);
    if (value.length === 4) {
      console.log("PIN Entered:", value);
      setPinInputVisible(false);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 white">
        <TransferHeader title="International Transfer"/>

        <CustomView viewStyle="-mt-20">
          <Text className="text-[20px] text-white font-gilroyBold mt-6 mb-5 ">
            My Balance
          </Text>

          <ImageBackground
            source={images.balanceBg}
            className="-mx-3 px-3 h-[91px] justify-center items-start"
          >
            <View className="flex space-y-2">
              <Text className="text-[12px] text-secondary-600">
                Account Name
              </Text>
              <Text className="text-[25px] font-gilroyBold text-white">
                ₦ 113,000.00
              </Text>
            </View>
          </ImageBackground>

          <View className="px-3 flex flex-row items-center justify-between h-[90px] bg-primary-200 rounded-[20px]  ">
            <View className="flex space-y-3">
              <Text className="text-[12px] text-[#7E95B7] ">You send</Text>
              <View className="flex flex-row items-center">
                <Text className="text-[25px] font-gilroyExtraBold text-white">
                  ₦1,387 .00
                </Text>
              </View>
            </View>
            <View className="w-[94.86px] h-[40px] items-center justify-center bg-white rounded-[25px]">
              <View className="w-[94.86px] h-[40px] items-center justify-center bg-white rounded-[25px]">
                <View className="flex flex-row items-center space-x-2">
                  <Image source={icons.nigeria} />
                  <Text>NGN</Text>
                  <TouchableOpacity></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View className="relative px-3 mb-3">
            <View className="space-y-4">
              <View className="absolute left-[14px]">
                <Image source={icons.pole} />
              </View>
              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center space-x-2">
                  <Image source={icons.fee} />
                  <Text className="text-[#7E95B7]">Fee</Text>
                </View>
                <Text className="text-green-600 font-gilroyExtraBold">
                  FREE
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center space-x-2">
                  <Image source={icons.totalToPay} />
                  <Text className="text-[#7E95B7]">Total to pay</Text>
                </View>
                <Text className="text-white font-gilroyExtraBold">
                  ₦1,387 .00
                </Text>
              </View>

              <View className="flex flex-row items-center justify-between">
                <View className="flex flex-row items-center space-x-2">
                  <Image source={icons.ratePlusBonus} />
                  <Text className="text-[#7E95B7]">Rate + Bonus</Text>
                </View>
                <Text className="text-[#7E95B7]">1 $ = ₦ 1,387 .00</Text>
              </View>
            </View>
          </View>

          <View className="px-3 flex flex-row items-center justify-between h-[90px] bg-primary-200 rounded-[20px]  ">
            <View className="flex space-y-3">
              <Text className="text-[12px] text-[#7E95B7] ">Receiver Gets</Text>
              <View className="flex flex-row items-center">
                <Text className="text-[25px] font-gilroyExtraBold text-white">
                  $1 .00
                </Text>
              </View>
            </View>

            <View className="w-[94.86px] h-[40px] items-center justify-center bg-white rounded-[25px]">
              <View className="flex flex-row items-center space-x-2">
                <Image source={icons.america} />
                <Text>USD</Text>
                <TouchableOpacity>
                  <Image source={icons.dropDown} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className=" flex flex-row items-center justify-start bg-secondary-500 px-5 mt-4 mb-5 rounded-[20px] h-[80px] ">
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
          <View className="mb-20">
            <CustomSwipeButton
              title="Proceed to bank details"
              onSwipeSuccess={handleSwipeSuccess}
              containerStyles={{ width: "100%", alignSelf: "center", }}
            />
          </View>
        </CustomView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default InternationalTransfer;
