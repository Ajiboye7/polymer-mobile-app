import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  Platform,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { InputFieldProps } from "@/types/types";
import { icons } from "@/constants";

const InputField = ({
  title,
  otherStyles,
  value,
  placeholder,
  handleChangeText,
  secureTextEntry,
  inputStyles,
  iconStyle,
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField =
    title === "Create Password" || title === "Retype Password" || title === "Password";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={`my-2 ${otherStyles}`}>
          <Text className="text-fontColor-gray text-[12px] mb-2 text-secondary-400 ">
            {title}
          </Text>
          <View
            className={`bg-[#F0F0F0] w-full h-[52px] rounded-[10px] border border-primary-200 focus:border-primary-300 justify-center  ${inputStyles}`}
            style={{ paddingHorizontal: 16 }} 
          >
            <TextInput
              value={value}
              placeholder={placeholder}
              placeholderTextColor="#58585880"
              className="text-[14px] font-600 w-full -mt-2 text-secondary-800"
              onChangeText={handleChangeText}
              secureTextEntry={isPasswordField && !showPassword}
              style={{ 
                height: "100%", // r
                paddingVertical: 0, 
                textAlignVertical: "center", 
              }}
              {...props}
            />
            {isPasswordField && (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{ 
                  position: "absolute", 
                  right: 16, 
                  top: "50%", 
                  transform: [{ translateY: -12 }], 
                  zIndex: 10,
                }}
              >
                <Image
                  source={showPassword ? icons.eyeHide : icons.eye}
                  className={`w-6 h-6 ${iconStyle}`}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;


{/*
  error handling

  const InputField = ({
  title,
  otherStyles,
  value,
  placeholder,
  handleChangeText,
  secureTextEntry,
  inputStyles,
  iconStyle,
  error, // Accept error message as a prop
  ...props
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField =
    title === "Create Password" || title === "Retype Password" || title === "Password";

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={`my-2 ${otherStyles}`}>
          <Text className="text-fontColor-gray text-[12px] mb-2 text-secondary-400">
            {title}
          </Text>

          <View
            className={`w-full h-[52px] rounded-[10px] border ${
              error ? "border-red-500" : "border-primary-200"
            } bg-[#F0F0F0] justify-center ${inputStyles}`}
            style={{ paddingHorizontal: 16 }}
          >
            <TextInput
              value={value}
              placeholder={placeholder}
              placeholderTextColor="#58585880"
              className="text-[14px] font-600 w-full -mt-2 text-secondary-800"
              onChangeText={handleChangeText}
              secureTextEntry={isPasswordField && !showPassword}
              style={{
                height: "100%",
                paddingVertical: 0,
                textAlignVertical: "center",
              }}
              {...props}
            />

            {isPasswordField && (
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 16,
                  top: "50%",
                  transform: [{ translateY: -12 }],
                  zIndex: 10,
                }}
              >
                <Image
                  source={showPassword ? icons.eyeHide : icons.eye}
                  className={`w-6 h-6 ${iconStyle}`}
                />
              </TouchableOpacity>
            )}
          </View>

          {/* Show error message below the input
          {error && <Text className="text-red-500 text-[12px] mt-1">{error}</Text>}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

  */}