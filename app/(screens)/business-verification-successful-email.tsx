import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmailHeader from "@/components/EmailHeader";
import EmailContent from "@/components/EmailContent";
import Button from "@/components/Button";
import { icons } from "@/constants";

const BusinessVerificationSuccessfulEmail = () => {
  return (
    <SafeAreaView className=" px-4 pt-3 ">
      <EmailHeader text="Polymer business" />
      <EmailContent
        headerText="Business Verification"
        message={`Your Polymer business account email has been verified, you now have total access to all our business features.\n\nClick the button below to return back to the app`}
        icon={icons.verificationSuccessful}
      />

      <Button
        title="Back to the app"
        buttonStyle="h-[49.77px] bg-primary-200"
      />
    </SafeAreaView>
  );
};

export default BusinessVerificationSuccessfulEmail;
