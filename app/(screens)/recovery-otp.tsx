import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import Button from "@/components/Button";

const RecoveryOtp = () => {
  return (
    <SafeAreaView className="mx-4">
      <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
        <TouchableOpacity>
          <Image source={icons.arrowLeft} />
        </TouchableOpacity>
      </View>
      <View>
        <Text className="text-[32px] text-primary-300 font-gilroyBold mt-5 mb-3 ">
          Password Recovery
        </Text>
        <Text className="text-[14px] text-secondary-600 leading-[20px] w-[358px] mb-5">
        A reset otp has been sent to your registered email.
        </Text>
      </View>

      <InputField
        title="Bank Verification Number"
        placeholder="name@example.com"
        keyboardType="email-address"
        textContentType="emailAddress"
      />

      <Button title="Verify" buttonStyle="w-full h-[49.77px] mt-8" />
    </SafeAreaView>
  );
};

export default RecoveryOtp;