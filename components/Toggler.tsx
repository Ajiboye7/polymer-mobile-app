import React, { useState } from "react";
import { View, TouchableOpacity, Image, Modal, Text } from "react-native";
import { BlurView } from "expo-blur";
import Button from "./Button";
import { icons } from "@/constants";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";

interface BusinessToggleProps {
  onToggle?: (isBusiness: boolean) => void; 
}

const BusinessToggle = ({ onToggle }: BusinessToggleProps) => {
  const [isBusiness, setIsBusiness] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => {
    const newValue = !isBusiness;
    setIsBusiness(newValue);

    if (newValue) {
      setModalVisible(true); // Show modal when switching to business mode
    }

    if (onToggle) {
      onToggle(newValue); // Call callback function (if provided)
    }
  };

  const handleCancel = () => {
    setIsBusiness(false);
    setModalVisible(false);
  };

  const router = useRouter()
  
  const handleSetUp = () =>{
    router.push(ROUTES.BUSINESS_PROFILE_SCREEN)
    setIsBusiness(false)
  }

  return (
    <>
      
      <View className="w-[46.25px] h-[25px] bg-white rounded-full flex-row justify-between items-center px-[4px] relative">
        <Image
          source={icons.regularUser}
          className={`w-[14px] h-[14px] ${
            isBusiness ? "opacity-50" : "opacity-100"
          }`}
          resizeMode="contain"
        />
        <Image
          source={icons.businessOwner}
          className={`w-[14px] h-[14px] ${
            isBusiness ? "opacity-100" : "opacity-50"
          }`}
          resizeMode="contain"
        />

        <TouchableOpacity
          onPress={toggleSwitch}
          className={`w-[18px] h-[18px] bg-[#5BBE8A] rounded-full absolute ${
            isBusiness ? "right-[2px]" : "left-[2px]"
          } shadow-md`}
        />
      </View>

      
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView
          intensity={30}
          tint="dark"
          className="flex-1 justify-end items-center"
        >
          <View className="w-[358px] h-[330px] bg-white rounded-lg px-4 py-5 mb-5">
            <Image source={icons.modalBusinessImage} className="w-16 h-16 mb-4 mx-auto"/>
            <Text className="text-[20px] text-center font-bold text-gray-900">
              Set Up Your Business Profile
            </Text>
            <Text className="text-[12px] text-center text-secondary-500 mt-2 mb-4 leading-[25px] font-semibold">
              Hey there! We noticed you haven’t set up your business {'\n'} profile.
              Set it up now to start making payments in the {'\n'} name of your
              business.
            </Text>

            <Button title="Set up now"
              buttonStyle="h-[49.77px] w-full my-3 bg-primary-200"
              handleClick={handleSetUp}
            />

            <TouchableOpacity onPress={handleCancel} className="mt-4">
              <Text className="text-[16px] text-primary-200 font-gilroyBold text-center">Not Now</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </>
  );
};

export default BusinessToggle;
