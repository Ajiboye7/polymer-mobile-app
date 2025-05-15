import React from "react";
import { Stack } from "expo-router";

const ScreensLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="otp"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="verify-identity"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="input-identity"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="confirm-new-password"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="password-recovery"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="reset-password"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="recovery-otp"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="photo-capture"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="number-of-tries"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="one-minute-verification"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="verification-network-error"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="verification-error"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="create-pin"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="confirm-pin"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="accounts-type"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="fund-account"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="personal-details"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="business-profile"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="loading-screen"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="business-profile-animation"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="international-transfer"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="international-bank-details"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="transfer-successful"
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="transaction-details"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="new-transfer"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="local-transfer"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="local-bank-details"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="beneficiary"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="email-otp"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="customer-onboarding-email"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="login-successful-email"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="business-account-email"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="international-transfer-sent-email"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="local-transfer-sent-email"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="international-transfer-received-email"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="local-transfer-received-email"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="business-verification-email"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="business-verification-successful-email"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="business-verification-error-email"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="business-verification-expired-email"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default ScreensLayout;
