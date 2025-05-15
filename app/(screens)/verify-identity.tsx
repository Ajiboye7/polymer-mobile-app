import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { icons } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "@/components/Button";
import { ROUTES } from "@/constants/routes";
import { useRouter } from "expo-router";
import {  useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { IdentityType } from "@/redux/slices/authSlice";
import { showToast } from "@/components/toastConfig";

const VerificationScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedMode, setSelectedMode] = useState<"bvn" | "nin" | null>(null);

  const handleContinue = async() => {
    if (!selectedMode) return Alert.alert('Error', 'Please select an identity type');
    try{

      await dispatch(IdentityType({identityType: selectedMode})).unwrap()
      router.push(ROUTES.INPUT_IDENTITY)
    }catch(error : any){
      showToast('error', error?.message || error || 'Failed to add identity type')
      console.log('Error adding identity type', error)
    }
  }

  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-3 pt-5">
      <View>
        <View>
          <Text className="text-[32px] text-primary-300 font-gilroyBold mt-5 mb-3">
            Verify Identity
          </Text>
          <Text className="text-[14px] text-secondary-600 leading-[20px] w-[358px] mb-5">
            Let’s get you verified and get your payments {"\n"}
            international.
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => {
            console.log("Selected BVN");
            setSelectedMode("bvn");
          }}
          className={`flex-row items-center bg-primary-200 rounded-lg border ${
            selectedMode === "bvn" ? "border-green-500" : "border-gray-300"
          } px-4 w-full h-[80px] mb-4`}
        >
          <Image source={icons.bvn} className="w-[24px] h-[24px]" />
          <Text className="flex-1 text-lg font-medium text-secondary-100 ml-4">
            Bank Verification Number (BVN)
          </Text>
          <View
            className={`w-[20px] h-[20px] rounded-full border ${
              selectedMode === "bvn"
                ? " border-secondary-100"
                : "border-gray-400 bg-white"
            } flex items-center justify-center`}
          >
            {selectedMode === "bvn" && (
              <View className=" bg-primary-300 rounded-full p-[2px]">
                <Image source={icons.check} className="w-[10px] h-[10px]" />
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            console.log("Selected NIN");
            setSelectedMode("nin");
          }}
          className={`flex-row items-center bg-primary-200 rounded-lg border ${
            selectedMode === "nin" ? "border-green-500" : "border-gray-300"
          } px-4 w-full h-[80px]`}
        >
          <Image source={icons.nin} className="w-[24px] h-[24px]" />
          <Text className="flex-1 text-lg font-medium text-secondary-100 ml-4">
            National Identity Number (NIN)
          </Text>
          <View
            className={`w-[20px] h-[20px] rounded-full border  ${
              selectedMode === "nin"
                ? " border-secondary-100"
                : "border-gray-400 bg-white"
            } flex items-center justify-center`}
          >
            {selectedMode === "nin" && (
              <View className=" bg-primary-300 rounded-full p-[2px]">
                <Image source={icons.check} className="w-[10px] h-[10px]" />
              </View>
            )}
          </View>
        </TouchableOpacity>

        <Button
          disabled={!selectedMode}
          title="Continue"
          buttonStyle={`w-full h-[49.77px] mt-10 ${
            selectedMode ? "bg-primary-300" : "bg-secondary-600"
          }`}
          handleClick={handleContinue}
        />
      </View>
    </SafeAreaView>
  );
};

export default VerificationScreen;
