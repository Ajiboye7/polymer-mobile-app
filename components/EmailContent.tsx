import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { EmailContentProps } from "@/types/types";

const EmailContent = ({
  containerStyle,
  headerText,
  message,
  showFooterText,
  messageStyle,
  link,
  icon,
  iconName,
}: EmailContentProps) => {
  return (
    <View className="mt-10 mb-5">
      <View className={`space-y-4  ${containerStyle}`}>
        <View className="flex flex-row items-center space-x-2">
          <Text className="text-[14px] font-bold">{headerText}</Text>
          {icon && <Image source={icon} className="w-[24px] h-[24px]" resizeMode="contain" />}
        </View>

        <Text
          className={`text-[12px] leading-[17.4px] font-gilroyMedium ${messageStyle}`}
        >
          {message}
        </Text>
        <Text className="text-[12px] text-primary-200">{link}</Text>
        {showFooterText && (
          <Text className="text-[12px] font-bold">
            Thank you for choosing Polymer.
          </Text>
        )}
      </View>
    </View>
  );
};

export default EmailContent;
