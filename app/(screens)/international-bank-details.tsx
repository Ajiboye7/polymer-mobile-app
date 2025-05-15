import {
  View,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import * as Clipboard from "expo-clipboard";
import InputField from "@/components/InputField";
import CustomSwipeButton from "@/components/CustomSwipeButton";
import { useRouter } from "expo-router";
import PinInputModal from "@/components/PinInputModal";
import TransferHeader from "@/components/TransferHeader";
import CustomView from "@/components/CustomView";
import { ROUTES } from "@/constants/routes";
import { showToast } from "@/components/toastConfig";

const InternationalBankDetails = () => {
  const [form, setForm] = useState({
    bankName: "",
    recipientName: "",
    accountNumber: "",
    branchCode: "",
    remark: "",
  });

  const [isBusiness, setIsBusiness] = useState(false);

  const toggleSwitch = () => setIsBusiness((prevState) => !prevState);

  const accountNumber = "0235676005";

  const handleCopyToClipboard = async () => {
    await Clipboard.setStringAsync(accountNumber);
    showToast('info', "Account number copied to clipboard.")
  };
  const [isPinInputVisible, setPinInputVisible] = useState(false);
  const router = useRouter();

  const handleSwipeSuccess = () => {
    setPinInputVisible(true);
  };

  const handlePinVerified = (pin: string) => {
    alert(`PIN Verified: ${pin}! Proceeding to payment...`);
    router.push(ROUTES.TRANSFER_SUCCESSFUL);
  };

  return (
    <ScrollView>
      <SafeAreaView className="flex-1 white">
        <TransferHeader title="Bank details" />

        <CustomView>
          <View>
            <InputField
              title="Bank Name"
              placeholder="Select your bank name"
              value={form.bankName}
              handleChangeText={(value) =>
                setForm({ ...form, bankName: value })
              }
              keyboardType="default"
              textContentType="name"
            />

            <InputField
              title="Receipt Name"
              placeholder="John Doe"
              value={form.recipientName}
              handleChangeText={(value) =>
                setForm({ ...form, recipientName: value })
              }
              keyboardType="default"
              textContentType="name"
            />

            <InputField
              title="Account Number"
              placeholder="1234567890"
              value={form.accountNumber}
              handleChangeText={(value) =>
                setForm({ ...form, accountNumber: value })
              }
              keyboardType="numeric"
              textContentType="none"
              icon={icons.copy}
            />

            <InputField
              title="Branch Code"
              placeholder="35699"
              value={form.branchCode}
              handleChangeText={(value) =>
                setForm({ ...form, branchCode: value })
              }
              secureTextEntry={true}
              keyboardType="numeric"
              textContentType="none"
            />

            <InputField
              title="Remarks (Optional)"
              placeholder="Enter note (within 200 characters)"
              value={form.remark}
              handleChangeText={(value) => setForm({ ...form, remark: value })}
              secureTextEntry={true}
              keyboardType="default"
              textContentType="name"
            />
          </View>

          <View className="mt-16 mb-10">
            <CustomSwipeButton
              title="Swipe to make payment"
              onSwipeSuccess={handleSwipeSuccess}
              containerStyles={{ width: "100%", alignSelf: "center" }}
            />
          </View>
        </CustomView>

        <PinInputModal
          isVisible={isPinInputVisible}
          onClose={() => setPinInputVisible(false)}
          onPinEntered={handlePinVerified}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

export default InternationalBankDetails;
