import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";
import { icons, images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { TransactionTypeProps } from "@/types/types";

const EmailReceipt = ({transactionType }: TransactionTypeProps) => {
  return (
    <SafeAreaView>
      <>
        <View className="bg-primary-200 p-5 h-[248.11px] rounded-t-[20.71]">
          <View className="flex flex-row items-center justify-between">
            <View className="h-[41.41px] w-[41.41px] bg-white rounded-[6.9px] "></View>
            <Image source={icons.scan} />
          </View>

          <Text className="text-white text-[13.25px] font-gilroyBold my-5 text-center ">27th February, 2025</Text>

          <ImageBackground
            source={images.balanceBg}
            className="h-[75.37px] justify-center items-center -mx-5"
          >
            <Text className="text-white text-[24.85px] font-gilroyBold">
              - $25 .00
            </Text>
          </ImageBackground>

          <View className="flex flex-row items-center justify-between my-5">
            <Text className="text-[11.59px] text-secondary-600 font-gilroyBold">Transaction Type</Text>
            <Text className="text-white text-[11.59px]">{transactionType}</Text>
          </View>
        </View>

        <Button
        title="Download Receipt"
        buttonStyle="h-[49.77px] bg-primary-200 my-8"
        
      />

      </>
     
    </SafeAreaView>
  );
};

export default EmailReceipt;
