import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TransferHeader from "@/components/TransferHeader";
import CustomView from "@/components/CustomView";
import { icons } from "@/constants";
import { useState } from "react";
import { images } from "@/constants";
import InputField from "@/components/InputField";
import CustomSwipeButton from "@/components/CustomSwipeButton";
import { useRouter } from "expo-router";
import { banks } from "@/constants";
import { BlurView } from "expo-blur";
import { ROUTES } from "@/constants/routes";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const NewTransfer = () => {
  const router = useRouter();

  const [details, setDetails] = useState({
    bankName: "",
    accountNumber: "",
  });
  

  const handleBankSelection = (bankName: string) => {
    setDetails({ ...details, bankName });
    setModalVisible(false);
  };

  const handleBeneficiary = () => {
    setSelectMode("beneficiary")
    router.replace("/(screens)/beneficiary");
  }

  const handleSwipeSuccess = () => {
   
    router.replace(ROUTES.LOCAL_BANK_DETAILS);
    //console.log("Swipe successful!");
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const [searchBank, setSearchBank] = useState("");

  const [selectedMode, setSelectMode] = useState<"newTransfer" | "beneficiary">(
    "newTransfer"
  );

  const balance = useSelector((state: RootState) => state.balance.amount);

  const ListHeader = () => {
    return (
      <>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <View className="flex flex-row justify-end">
            <Image
              source={icons.cancel}
              resizeMode="contain"
              className="w-[20px] h-[20px]"
            />
          </View>
        </TouchableOpacity>
        <Text className="text-[20px] text-primary-300 font-gilroyBold">
          Banks
        </Text>

        <InputField
          placeholder="Search Bank"
          icon={icons.search}
          value={searchBank}
          handleChangeText={setSearchBank}
          inputStyles="border border-primary-100 focus:border-primary-100"
          otherStyles="mb-5"
          iconStyle="w-[16px] h-[16px]"
        />
      </>
    );
  };

  return (
    <ScrollView className="">
      <SafeAreaView className="flex-1">
        <TransferHeader title="Local Transfers" headerStyle="-mb-8" />

        <CustomView className="pb-10">
          <View className="flex flex-row justify-between items-center h-[100px] bg-primary-200 px-2 my-5 rounded-[25px]">
            <TouchableOpacity onPress={() => setSelectMode("newTransfer")}>
              <View
                className={` w-[166.5px] h-[80px] items-center justify-center rounded-[20px]  space-y-3 ${
                  selectedMode === "newTransfer" ? "bg-primary-300" : "bg-none"
                }`}
              >
                <Image
                  source={
                    selectedMode === "newTransfer"
                      ? icons.activeBank
                      : icons.inActiveBank
                  }
                />
                <Text
                  className={`text-[12px] font-gilroyBold  ${
                    selectedMode === "newTransfer"
                      ? "text-white"
                      : "text-secondary-600"
                  } `}
                >
                  New Transfer
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleBeneficiary}>
              <View
                className={` w-[166.5px] h-[80px] items-center justify-center rounded-[20px] space-y-2 ${
                  selectedMode === "beneficiary" ? "bg-primary-300" : "bg-none"
                }`}
              >
                <Image
                  source={
                    selectedMode === "beneficiary"
                      ? icons.activeBeneficiary
                      : icons.inActiveBeneficiary
                  }
                />
                <Text
                  className={`text-[12px] font-gilroyBold  ${
                    selectedMode === "beneficiary"
                      ? "text-white"
                      : "text-secondary-600"
                  } `}
                >
                  Beneficiary
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <ImageBackground
            source={images.balanceBg}
            className="h-[91px] -mx-3 my-5 pl-3 justify-center"
          >
            <View className="space-y-2 ">
              <View className="flex flex-row items-center space-x-2 ">
                <Image source={icons.nigeria} resizeMode="contain" />
                <Text className="text-[12px] text-secondary-600">
                  Nigeria Naira
                </Text>
              </View>

              <Text className="text-[25px] font-gilroyBold text-white">
              {`₦ ${balance?.toLocaleString("en-NG", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
              </Text>
            </View>
          </ImageBackground>

          <InputField
            title="Bank Name"
            placeholder="Select your bank name"
            value={details.bankName}
            handleChangeText={(value) =>
              setDetails({ ...details, bankName: value })
            }
            keyboardType="default"
            textContentType="name"
            icon={icons.arrowSquareDown}
            iconStyle="w-[7.06px] h-[7.52px] top-1"
            onFocus={() => setModalVisible(true)}
          />
          <View>
            <InputField
              title="Account Number"
              placeholder="1234567890"
              value={details.accountNumber}
              handleChangeText={(value) =>
                setDetails({ ...details, accountNumber: value })
              }
              keyboardType="numeric"
              textContentType="none"
            />
          </View>

          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
          >
            <BlurView
              intensity={30}
              tint="dark"
              className="flex-1 justify-end items-center"
            >
              <View className="flex-1 justify-end bg-black/30 w-full">
                <View className="bg-[#FCFCFC] px-3 rounded-t-[25px] pt-8 h-[557px] w-full">
                  <FlatList
                    data={banks.filter((bank) =>
                      bank.name.toLowerCase().includes(searchBank.toLowerCase())
                    )}
                    ListHeaderComponent={ListHeader}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => handleBankSelection(item.name)}
                      >
                        <View className="flex flex-row  items-center rounded-[25px] h-[60px] bg-[#F0F0F0] my-1 px-5 space-x-4">
                          <View className="w-[40px] h-[40px] items-center justify-center rounded-full ">
                            <Image source={item.icon} />
                          </View>
                          <Text className="text-[16px] text-secondary-700 font-sfProRoundedHeavy">
                            {item.name}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </BlurView>
          </Modal>

          <View className="flex flex-row items-center space-x-1 mt-3 ">
            <Image source={icons.success} resizeMode="contain" />

            <Text className="text-white text-[16px] font-gilroyBold">
              Ajiboye Muyideen Olanrewaju
            </Text>
          </View>

          <View className=" flex flex-row items-center justify-start bg-secondary-500 px-5 mt-8 mb-5 rounded-[20px] h-[80px] ">
            <View className="flex flex-row items-center  gap-2">
              <TouchableOpacity>
                <Image source={icons.setting} />
              </TouchableOpacity>
              <Text className="text-[12px] font-interItalic text-secondary-100 w-[288px]">
                When you deposit directly into this account, it reflects on your
                Naira account balance.
              </Text>
            </View>
          </View>

          <CustomSwipeButton
            title="Proceed to pay"
            onSwipeSuccess={handleSwipeSuccess}
            containerStyles={{ width: "100%", alignSelf: "center" }}
          />
        </CustomView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default NewTransfer;
