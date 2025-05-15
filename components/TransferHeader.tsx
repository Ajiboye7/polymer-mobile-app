import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Modal,
} from "react-native";
import { images, icons } from "@/constants";
import { BlurView } from "expo-blur";
import Button from "./Button";
import { Link, useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
interface TransferHeaderProps {
  title?: string;
  headerStyle?: string;
  onToggle?: (isBusiness: boolean) => void;
}

const TransferHeader: React.FC<TransferHeaderProps> = ({
  title,
  headerStyle,
  onToggle,
}) => {
  const [isBusiness, setIsBusiness] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => {
    const newIsBusiness = !isBusiness;
    setIsBusiness(newIsBusiness);

    // Show modal if switching to business mode
    if (newIsBusiness) {
      setModalVisible(true);
    }

    // Notify parent component about the toggle
    if (onToggle) {
      onToggle(newIsBusiness);
    }
  };

  const handleCancel = () => {
    setIsBusiness(false); // Switch back to regular user mode
    setModalVisible(false); // Hide the modal
  };

  const router = useRouter();

  return (
    <View className={`h-[20%] px-3 ${headerStyle}`}>
      <ImageBackground
        source={images.BgBoxes}
        className="w-full h-[91px] justify-center"
      >
        <View className="flex flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => {
              router.back();
            }}
          >
            <Image source={icons.arrowLeft} resizeMode="contain" />
          </TouchableOpacity>

          <Text className="text-[20px] font-gilroyBold text-primary-300">
            {title}
          </Text>

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
        </View>
      </ImageBackground>

      {/* Modal for Business Setup */}
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
            <Image
              source={icons.modalBusinessImage}
              className="w-16 h-16 mb-4 mx-auto"
            />
            <Text className="text-[20px] text-center font-bold text-gray-900">
              Set Up Your Business Profile
            </Text>
            <Text className="text-[12px] text-center text-secondary-500 mt-2 mb-4 leading-[25px] font-semibold">
              Hey there! We noticed you haven’t set up your business {"\n"}{" "}
              profile. Set it up now to start making payments in the {"\n"} name
              of your business.
            </Text>

            <Button
              title="Set up now"
              buttonStyle="h-[49.77px] w-full my-3 bg-primary-200"
              handleClick={() => {
                setModalVisible(false); 
                router.push(ROUTES.BUSINESS_PROFILE_SCREEN); 
              }}
            />

            <TouchableOpacity onPress={handleCancel} className="mt-4">
              <Text className="text-[16px] text-primary-200 font-gilroyBold text-center">
                Not Now
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </View>
  );
};

export default TransferHeader;
