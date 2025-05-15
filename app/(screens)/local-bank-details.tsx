import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants";
import { images } from "@/constants";
import TransferHeader from "@/components/TransferHeader";
import CustomView from "@/components/CustomView";
import InputField from "@/components/InputField";
import CustomSwipeButton from "@/components/CustomSwipeButton";
import PinInputModal from "@/components/PinInputModal";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { confirmPin as verifyPin } from "@/redux/slices/authSlice";
import { deductBalance } from "@/redux/slices/balanceSlice";
import { showToast } from "@/components/toastConfig";
import { TransactionParamsProps } from "@/types/types";

const LocalBankDetails = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const {
    bankName = "GTB",
    accountNumber = "0325642061",
    accountHolder = "Ajiboye Muyideen Olanrewaju",
    bankIcon = icons.gtBank,
  } = params;

  

  


  const getBankAcronym = (name: string) => {
    return name.slice(0, 4).toUpperCase();
  };

  const [isPinInputVisible, setPinInputVisible] = useState(false);
  const [details, setDetails] = useState({
    remark: "",
    amount: "",
  });


  const transactionDetails = {
    amount: details.amount,
    bankName: bankName.toString(),
    accountNumber: accountNumber.toString(),
    accountHolder: accountHolder.toString(),
    date: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    transactionType: "Local Transfer",
    referenceNumber: `REF${Math.floor(Math.random() * 10000000000)}`,
    accountType: "Savings",
    paymentMethod: "Mobile Money",
    remark: details.remark,
    bankIcon: bankIcon.toString()
  };
  

  const handleSwipeSuccess = () => {
    setPinInputVisible(true);
  };

  const dispatch = useDispatch<AppDispatch>();
  const balance = useSelector((state: RootState) => state.balance.amount);

  const handlePinVerified = async (pin: string) => {
  try {
    const amount = parseFloat(details.amount) || 0;

    await dispatch(verifyPin({ pin })).unwrap();
    await dispatch(deductBalance(amount)).unwrap();

    
    router.replace({
      pathname: ROUTES.LOADING_SCREEN,
      params: {
        ...transactionDetails,
      }as TransactionParamsProps
    });

   
  } catch (error: any) {
    showToast('error', error || 'Transaction failed');
    console.log(error);
  }
};

  return (
    <ScrollView>
      <SafeAreaView className="flex-1">
        <TransferHeader title="Bank Details" headerStyle="-mb-4" />
        <CustomView className="pb-8">
          <Text className="text-white text-[20px] font-gilroyBold mt-6">
            Transfer from
          </Text>
          <ImageBackground
            source={images.balanceBg}
            className="h-[91px] -mx-3 my-5 pl-3 justify-center"
          >
            <View className="space-y-2 ">
              <View className="flex flex-row items-center space-x-2">
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

          <Text className="text-white text-[20px] font-gilroyBold mb-4">
            Transfer to
          </Text>

          <View className="bg-primary-200 h-[120px] justify-center p-5 rounded-[20px]">
            <Text className="text-[12px] text-[#7E95B7]">Account Number</Text>
            <View className="flex flex-row items-center justify-between">
              <Text className="text-white text-[25px] font-gilroyBold">
                {accountNumber}
              </Text>
              <View className="flex flex-row items-center justify-center rounded-full space-x-2 w-[85px] h-[40px] bg-white">
                <Image source={bankIcon} resizeMode="contain" />
                <Text className="">{getBankAcronym(bankName.toString())}</Text>
              </View>
            </View>

            <View className="flex flex-row items-center space-x-1">
              <Image source={icons.success} resizeMode="contain" />
              <Text className="text-white text-[16px] font-gilroyBold">
                {accountHolder}
              </Text>
            </View>
          </View>

          <View className="mb-16">
            <InputField
              title="Amount"
              placeholder="₦ 0.00"
              value={details.amount}
              handleChangeText={(value) => {
                setDetails({ ...details, amount: value });
              }}
              keyboardType="numeric"
              textContentType="none"
            />

            <InputField
              title="Remarks(optional)"
              placeholder="Enter note (Within 50 Characters)"
              value={details.remark}
              handleChangeText={(value) =>
                setDetails({ ...details, remark: value })
              }
              keyboardType="default"
              textContentType="none"
            />
          </View>
          <View className="mb-10">
            <CustomSwipeButton
              title="Proceed to pay"
              onSwipeSuccess={handleSwipeSuccess}
            />
          </View>
        </CustomView>

        <PinInputModal
          isVisible={isPinInputVisible}
          onClose={() => setPinInputVisible(false)}
          onPinEntered={(pin) => handlePinVerified(pin,)}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default LocalBankDetails;
