import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import Button from "@/components/Button";
import {  useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { useLocalSearchParams } from "expo-router";
import { TransactionParamsProps } from "@/types/types";

const TransferSuccessful = () => {

  const params = useLocalSearchParams<TransactionParamsProps>();

  const router = useRouter()


  const goHome = ()=>{
    router.replace(ROUTES.HOME)
  }
  return (
    <SafeAreaView className="pt-20 px-3 bg-white h-full">
      <View className="items-center ">
        <Image source={images.transferSuccesful} className="" />
      </View>

      <Text className="text-[20px] font-gilroyBold text-center text-primary-300 my-6">
        Transfer Succesful
      </Text>
      <Text className="text-center mb-12 leading-[22px] text-secondary-600">
        Your transfer is on it’s way and it {"\n"}
        would be delivered shortly.
      </Text>

      <Button
        title="View Receipt"
        buttonStyle="w-full h-[49.77px] bg-primary-300"
        handleClick={()=>{
          router.replace({
            pathname: ROUTES.TRANSACTION_DETAILS,
            params: params
          });

         
        }}
      />

       <TouchableOpacity onPress={goHome}>
       <Text className="text-[16px] text-primary-200 font-gilroyBold text-center mt-7">
        Back to Home
      </Text>
       </TouchableOpacity>
      

      
    </SafeAreaView>
  );
};

export default TransferSuccessful;
