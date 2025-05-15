import { View, Text, Image, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomView from "@/components/CustomView";
import TransferHeader from "@/components/TransferHeader";
import { icons } from "@/constants";
import { images } from "@/constants";
import Button from "@/components/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { TransactionParamsProps } from "@/types/types";
import { ROUTES } from "@/constants/routes";

const TransactionDetails = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const params = useLocalSearchParams<TransactionParamsProps>();

  const router = useRouter()

   const goHome = ()=>{
      router.replace(ROUTES.HOME)
    }

    const {
      amount = "0",
      bankName = "",
      accountNumber = "",
      accountHolder = "",
      date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      transactionType = "Local Transfer",
      referenceNumber = "",
      accountType = "Savings",
      paymentMethod = "bank transfer",
    } = params;
    
     
  return (
    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
      <SafeAreaView className=" ">
        <TransferHeader title="Transaction Details" />
        <CustomView viewStyle="bg-primary-200 pt-4 pb-10 -mt-28">
          <View className="flex flex-row justify-between items-center">
            <View className="w-[50px] h-[50px] bg-primary-300 items-center justify-center rounded-md">
              <Image source={icons.pee} />
            </View>

            <Image source={icons.qrCode} />
          </View>

          <Text className="text-[16px] text-secondary-300 font-gilroyBold text-center">
            {date}
          </Text>

          <ImageBackground
            source={images.balanceBg}
            className="h-[91px] -mx-3 my-5 items-center justify-center"
          >
            <Text className="text-[30px] text-secondary-300 font-gilroyBold">
              ₦ {amount}
            </Text>
          </ImageBackground>

          <View className="flex space-y-4 mb-4 ">
            <View className="flex flex-row items-center justify-between ">
              <Text className="text-[14px]  text-secondary-600 font-gilroyBold">
                Transaction Type
              </Text>
              <Text className="text-[14px] text-secondary-300 font-gilroyBold">
                {transactionType}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between">
              <Text className="text-[14px] text-secondary-600 font-gilroyBold">
                Reference Number
              </Text>
              <Text className="text-[14px] text-secondary-300 font-gilroyBold">
                {referenceNumber}
              </Text>
            </View>
          </View>

          <ImageBackground
            source={images.balanceBg}
            className="h-[50px] -mx-3 my-5 pl-3 items-start justify-center"
          >
            <Text className="text-[16px] text-secondary-300 font-gilroyBold">
              Beneficiary Details
            </Text>
          </ImageBackground>

          <View className="flex space-y-5 mb-4 ">
            <View className="flex flex-row items-center justify-between ">
              <Text className="text-[14px]  text-secondary-600 font-gilroyBold">
                Recipient’s Name
              </Text>
              <Text className="text-[14px] text-secondary-300 font-gilroyBold">
                {accountHolder}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between">
              <Text className="text-[14px] text-secondary-600 font-gilroyBold">
                Recipient’s Bank
              </Text>
              <Text className="text-[14px] text-secondary-300 font-gilroyBold">
                {bankName}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between">
              <Text className="text-[14px] text-secondary-600 font-gilroyBold">
                Account Number
              </Text>
              <Text className="text-[14px] text-secondary-300 font-gilroyBold">
                {accountNumber}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between">
              <Text className="text-[14px] text-secondary-600 font-gilroyBold">
                Account Type
              </Text>
              <Text className="text-[14px] text-secondary-300 font-gilroyBold">
                {accountType}
              </Text>
            </View>
          </View>

          <ImageBackground
            source={images.balanceBg}
            className="h-[50px] -mx-3 my-5 pl-3 items-start justify-center"
          >
            <Text className="text-[16px] text-secondary-300 font-gilroyBold">
              Sender’s Details
            </Text>
          </ImageBackground>

          <View className="flex space-y-4 mb-4 ">
            <View className="flex flex-row items-center justify-between ">
              <Text className="text-[14px]  text-secondary-600 font-gilroyBold">
                Account Name
              </Text>
              <Text className="text-[14px] text-secondary-300 font-gilroyBold">
                {user?.name}
              </Text>
            </View>

            <View className="flex flex-row items-center justify-between">
              <Text className="text-[14px] text-secondary-600 font-gilroyBold">
                Payment Method
              </Text>
              <Text className="text-[14px] text-secondary-300 font-gilroyBold">
                {paymentMethod}
              </Text>
            </View>
          </View>
        </CustomView>

        <View className="relative">
          <View className="absolute top-[2px] flex flex-row justify-center items-center px-[10px] space-x-[6.3px] bottom-8 ">
            {/* Circle elements with space between */}
            {Array(14)
              .fill(0)
              .map((_, index) => (
                <View
                  key={index}
                  className="bg-white w-[19.6px] h-[19.6px] rounded-full"
                />
              ))}
          </View>
        </View>

        <View className="mx-3 mt-10 mb-28">
          <Button
            title="Download Receipt"
            buttonStyle="w-full h-[49.77px] bg-primary-300"
          />

          <TouchableOpacity onPress={goHome}>
          <Text className="text-[16px] text-primary-200 font-gilroyBold text-center mt-7">
            Back to Home
          </Text>
          </TouchableOpacity>
         
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default TransactionDetails;
