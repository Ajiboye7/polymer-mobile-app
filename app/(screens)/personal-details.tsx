import { View, Text, Image, StatusBar, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "@/components/InputField";
import { icons } from "@/constants";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { createProfile } from "@/redux/slices/userSlice";
import { showToast } from "@/components/toastConfig";

const PersonalDetails = () => {
  const [form, setForm] = useState({
    phoneNumber: "",
    address: "",
    nextOfKin: "",
    nextOfKinRelationship: "",
  });

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleComplete = async () => {
    try {
      dispatch(createProfile(form)).unwrap();
      showToast("success", 'Profile Created', "Profile created successfully");
      router.replace(ROUTES.ACCOUNT);
    } catch (error: any) {
      showToast("error", error?.message || error || "Failed to create profile");
      console.log("Error creating profile", error);
    }
  };

  return (
    <SafeAreaView className="mt-5">
      <ScrollView>
        <View className="px-2">
          <StatusBar hidden />
          <View className="bg-gray-300 w-[29.77px] h-[29.77px] rounded-full">
            <Image source={icons.arrowLeft} />
          </View>
          <View>
            <Text className="text-[32px] text-primary-300 font-gilroySemiBold mt-5 mb-3 ">
              Add Personal Details
            </Text>
            <Text className="text-[14px] text-secondary-600 leading-[20px] w-[358px] ">
              Finish setting up your Polymer business account by {"\n"}with
              adding your business details
            </Text>
          </View>
          <View>
            <InputField
              title="Phone Number"
              placeholder="08172710973"
              value={form.phoneNumber}
              handleChangeText={(value) =>
                setForm({ ...form, phoneNumber: value })
              }
              keyboardType="numeric"
              textContentType="none"
            />

            <InputField
              title="Next of Kin Name"
              placeholder="John Doe"
              value={form.nextOfKin}
              handleChangeText={(value) =>
                setForm({ ...form, nextOfKin: value })
              }
              keyboardType="default"
              textContentType="name"
            />

            <InputField
              title="Next of Kin Relationship"
              placeholder="Father"
              value={form.nextOfKinRelationship}
              handleChangeText={(value) =>
                setForm({ ...form, nextOfKinRelationship: value })
              }
              keyboardType="email-address"
              textContentType="name"
            />

            <InputField
              title="address"
              placeholder=""
              value={form.address}
              handleChangeText={(value) => setForm({ ...form, address: value })}
              keyboardType="default"
              textContentType="none"
            />
          </View>

          <Button
            title="Complete Profile"
            buttonStyle="w-[358px] h-[49.77px] mt-14"
            handleClick={handleComplete}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PersonalDetails;
