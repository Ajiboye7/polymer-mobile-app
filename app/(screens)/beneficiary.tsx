import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React, { memo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TransferHeader from "@/components/TransferHeader";
import CustomView from "@/components/CustomView";
import { icons} from "@/constants";
import InputField from "@/components/InputField";
import { beneficiaries } from "@/constants";
import { useRouter } from "expo-router";

const Beneficiary = () => {
  const router = useRouter();

  const handlenewTransfer = () => {
    setSelectMode("beneficiary");
    router.replace("/(screens)/new-transfer");
  };

  const [selectedMode, setSelectMode] = useState<"newTransfer" | "beneficiary">(
    "beneficiary"
  );
  const [searchBeneficiary, setSearchBeneficiary] = useState("");

  const ListHeader = React.memo(() => (
    <>
      <View className="flex flex-row justify-between items-center h-[100px] bg-primary-200 px-2 my-5 rounded-[25px]">
        <TouchableOpacity onPress={handlenewTransfer}>
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

        <TouchableOpacity onPress={() => setSelectMode("beneficiary")}>
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

      <InputField
        placeholder="Search for Beneficiary"
        icon={icons.search}
        value={searchBeneficiary}
        handleChangeText={setSearchBeneficiary}
        inputStyles="border border-primary-100 focus:border-primary-100"
        otherStyles="mb-5"
        iconStyle="w-[16px] h-[16px]"
        textContentType="name"
        keyboardType="default"
      />
    </>
  ));

  return (
    <SafeAreaView className="flex-1">
      <TransferHeader title="Local Transfer" />
      <CustomView>
        <FlatList
          data={beneficiaries.filter((beneficiary) => {
            const searchText = searchBeneficiary.toLocaleLowerCase();
            return (
              beneficiary.name.toLocaleLowerCase().includes(searchText) ||
              beneficiary.accountNumber.includes(searchText) ||
              beneficiary.bank.includes(searchText)
            );
          })}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
            keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <TouchableOpacity>
              <View className=" flex flex-row items-center justify-between bg-[#7E95B7] my-2 px-5 h-[60px] rounded-[25px]">
                <View className="flex flex-row items-center space-x-3">
                  <Image source={item.icon} resizeMode="contain" />

                  <View className="space-y-2">
                    <Text className="text-secondary-100 text-[16px] font-gilroyBold  ">
                      {item.name}
                    </Text>
                    <Text className="text-secondary-100 text-[12px] font-gilroyBold ">
                      {item.accountNumber}
                    </Text>
                  </View>
                </View>

                <Image source={icons.trash} />
              </View>
            </TouchableOpacity>
          )}
        />
      </CustomView>
    </SafeAreaView>
  );
};

export default Beneficiary;
