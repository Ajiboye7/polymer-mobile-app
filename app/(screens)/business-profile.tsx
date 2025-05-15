import { View, Text, Image, StatusBar } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import Button from "@/components/Button";
import { Link, useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";

const BusinessProfile = () => {
  const [form, setForm] = useState({
    name: "",
  });

  const router = useRouter()

  return (
    <SafeAreaView className="mt-5">
      <View className="px-2">
        <StatusBar hidden />
        <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
          <Image source={icons.arrowLeft} />
        </View>
        <View>
          <Text className="text-[32px] text-primary-300 font-gilroyBold mt-5 mb-3 ">
            Let's get started
          </Text>
          <Text className="text-[14px] text-secondary-600 leading-[20px] w-[358px] ">
            Let’s take your business global. Start making {"\n"}international
            payments in the name of your business.
          </Text>
        </View>
        <View>
          <InputField
            title="Business Name"
            placeholder="Enter your business name"
            value={form.name}
            handleChangeText={(value) => setForm({ ...form, name: value })}
            keyboardType="default"
            textContentType="name"
          />
        </View>

        <Button
          title="Create a profile"
          buttonStyle="w-[358px] h-[49.77px] mt-14"
          handleClick={()=>{
            console.log("profile", form.name)
            router.replace(ROUTES.BUSINESS_PROFILE_ANIMATION_SCREEN)
          }}

        />
      </View>
    </SafeAreaView>
  );
};

export default BusinessProfile;
