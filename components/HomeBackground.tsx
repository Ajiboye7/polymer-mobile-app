import React, { Children, useRef, useState, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  ImageBackground,
  Modal,
  Alert,
} from "react-native";
import { icons, images } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import Button from "./Button";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import Constants from "expo-constants";
import { RootState, AppDispatch } from "@/redux/store";
import { useDispatch, UseDispatch, useSelector } from "react-redux";

import { uploadProfilePicture } from "@/redux/slices/userSlice";
import { showToast } from "./toastConfig";
import { fetchBalance } from "@/redux/slices/balanceSlice";

const HomeBackground = () => {
  const router = useRouter();

  const bottomSheetRef = useRef<BottomSheet>(null);

  const [isBusiness, setIsBusiness] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleSwitch = () => {
    setIsBusiness((prev) => !prev);
    if (!isBusiness) {
      setModalVisible(true);
    }
  };

  const handleCancel = () => {
    setIsBusiness(false);
    setModalVisible(false);
  };

  const user = useSelector((state: RootState) => state.auth.user);

  const userName = user?.name?.split(" ")[0] || "Guest";
  const balance = useSelector((state: RootState) => state.balance.amount);

  const dispatch = useDispatch<AppDispatch>();
  const profilePicture = useSelector(
    (state: RootState) => state.user.userProfile?.profilePicture
  );

  const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.2:5000";

  const handleUpload = async () => {
    try {
      await dispatch(uploadProfilePicture()).unwrap();
      showToast('success', 'profile upload', 'profile uploaded successfully')
    } catch (error: any) {
      showToast("error", error || "profile picture upload Failed");
    }
  };

  const imageUri = profilePicture
    ? `${Host}${
        profilePicture.startsWith("/") ? "" : "/"
      }${profilePicture}?${Date.now()}`
    : null;

  return (
    <SafeAreaView className="bg-primary-300">
      <View className="flex flex-row items-center justify-between px-3 mt-10">
        <View className="flex flex-row items-center justify-start gap-3">
          <TouchableOpacity onPress={handleUpload}>
            <Image
              source={
                profilePicture
                  ? {
                      uri: imageUri,
                      cache: "force-cache",
                    }
                  : icons.profile
              }
              className="w-[50px] h-[50px] rounded-full"
              resizeMode="cover"
            />
          </TouchableOpacity>

          <Text className="text-[16px] font-gilroyBold text-white">
            Hi, {userName || "Guest"} 👋
          </Text>
        </View>

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

      <Text className="text-[25px] font-gilroyBold text-white my-3 ml-3">
        My Balance
      </Text>

      <ImageBackground
        source={images.balanceBg}
        className=" w-full h-[91px] justify-center"
      >
        <View className="ml-3">
          <View className="flex flex-row items-center gap-2 mb-2">
            <Image source={icons.nigeria} resizeMode="contain" />
            <Text className="text-[#7E95B7] ">Nigerian Naira</Text>
          </View>
          <Text className="text-[25px] font-gilroyBold text-white">
            {`₦ ${balance?.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          </Text>
        </View>
      </ImageBackground>

      <View className="flex flex-row items-center justify-around mt-5">
        <TouchableOpacity
          onPress={() => {
            router.push(ROUTES.FUND_ACCOUNT);
          }}
        >
          <View className="space-y-2">
            <Image source={icons.add} resizeMode="contain" />
            <Text className="text-[12px] text-secondary-600">Fund</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className="space-y-2">
            <Image source={icons.send2} resizeMode="contain" />
            <Text className="text-[12px] text-secondary-600">Send</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View className="space-y-2">
            <Image source={icons.rates} resizeMode="contain" />
            <Text className="text-[12px] text-secondary-600">Rates</Text>
          </View>
        </TouchableOpacity>
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
          <View className="w-[358px] h-[330px] bg-white rounded-lg px-4 py-5  mb-5">
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
              buttonStyle=" h-[49.77px] w-full my-3 bg-primary-200"
              handleClick={() => {
                setModalVisible(false);
                router.push(ROUTES.BUSINESS_PROFILE_SCREEN);
              }}
            />

            <TouchableOpacity onPress={handleCancel} className="mt-4">
              <Text className="text-[16px] text-primary-200 font-gilroyBold text-center ">
                Not Now
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeBackground;
