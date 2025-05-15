import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmailBanner from "@/components/EmailBanner";
import EmailHeader from "@/components/EmailHeader";
import EmailContent from "@/components/EmailContent";
import EmailFooter from "@/components/EmailFooter";

const EmailOtp = () => {
  return (
    <SafeAreaView className="px-4 pt-3">
      <EmailHeader text="Polymer ( One time Password ) " />

      <EmailBanner
        parentContainer="items-center justify-center"
        childContainer="items-center justify-center"
      />


      <EmailContent
        headerText="Dear Customer, the OTP for your BVN verification is"
        message="1 2 3 4 5 6"
        messageStyle="text-[20px] text-primary-200 font-bold"
        containerStyle="items-center space-y-8"
        footerText="true"
        showFooterText ={true}
      />

      <EmailFooter />
    </SafeAreaView>
  );
};

export default EmailOtp;
