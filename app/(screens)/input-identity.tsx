import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import Button from "@/components/Button";
import { router } from "expo-router";
import { ROUTES } from "@/constants/routes";
import {  useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { identityNumber as identityFigure } from "@/redux/slices/authSlice";
import { showToast } from "@/components/toastConfig";

const InputIdentity = () => {
  const [identityNumber, setIdentityNumber] = useState("");
  const dispatch = useDispatch<AppDispatch>();


  const handleContinue = async() =>{
    if (!identityNumber) return Alert.alert('Error', 'Please input your Identity Number');
    try{

      dispatch(identityFigure({  identityNumber: identityNumber })).unwrap()
      router.push(ROUTES.CREATE_FOUR_DIGIT_PIN)
    }catch(error : any){
     showToast('error',   error?.message || error || "Failed to add identity number")
     console.log("Error adding identity number")
    }
  }
  return (
    <SafeAreaView className="mx-3 pt-5">
      <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <Image source={icons.arrowLeft} />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="text-[32px] text-primary-300 font-gilroyBold mt-5 mb-3 ">
          Input Identity Number
        </Text>
        <Text className="text-[14px] text-secondary-600 leading-[20px] w-[358px] mb-5">
          Let’s get you verified and get your payments {"\n"}
          international.
        </Text>
      </View>
      <InputField
        title="Identity Number"
        placeholder="Enter your BVN"
        value={identityNumber}
        handleChangeText={(value) => setIdentityNumber(value)}
        keyboardType="numeric"
        textContentType="none"
      />

      <Button
        title="Continue"
        buttonStyle="w-full h-[49.77px] mt-8"
        handleClick={handleContinue}
      />
    </SafeAreaView>
  );
};

export default InputIdentity;
