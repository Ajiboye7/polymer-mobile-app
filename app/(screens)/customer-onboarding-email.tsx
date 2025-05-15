import EmailBanner from "@/components/EmailBanner";
import EmailContent from "@/components/EmailContent";
import EmailFooter from "@/components/EmailFooter";
import EmailHeader from "@/components/EmailHeader";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const CustomerOnboardingEmail = () => {
  return (
    <SafeAreaView className="px-4 pt-3">
      <EmailHeader text="Welcome to Polymer  " />
      <EmailBanner />
      <EmailContent
        headerText="Welcome Surname Name,"
        message="We  at polymer are happy to have you . Polymer app is the best for both international and local transfers , for creating an account for your business and analysis of your transactions ."
        showFooterText={true}
      />
      <EmailFooter />
    </SafeAreaView>
  );
};

export default CustomerOnboardingEmail;
