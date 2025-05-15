import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Image,
    TextInput,
  } from "react-native";
  import React, { useRef, useState } from "react";
  import { icons } from "@/constants";
  import { SafeAreaView } from "react-native-safe-area-context";
  import Button from "@/components/Button";
  
  const ConfirmEmail: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputs = useRef<(TextInput | null)[]>([]);
  
    const handleChange = (text: string, index: number) => {
      const newOtp = [...otp];
      newOtp[index] = text;
  
      setOtp(newOtp);
  
      if (text && index < 5) {
        inputs.current[index + 1]?.focus();
      }
  
      if (!text && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    };
  
    const handleSubmit = () => {
      const enteredOtp = otp.join("");
      console.log("Entered OTP:", enteredOtp);
    };
  
    return (
      <SafeAreaView className="mx-3 mt-5">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity>
            <Image source={icons.arrowLeft} />
          </TouchableOpacity>
          <Text className="text-[32px] text-primary-300 font-gilroyBold mt-5 mb-3 ">
            Confirm email
          </Text>
          <Text className="text-[14px] text-secondary-600 leading-[20px] w-[358px] ">
            Enter the code sent to your registered email.
          </Text>
  
          <View className="flex-row justify-between w-full my-5">
            {otp.map((_, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputs.current[index] = ref)}
                value={otp[index]}
                onChangeText={(text) => handleChange(text, index)}
                keyboardType="numeric"
                maxLength={1} 
                className="w-[50px] h-[50px] rounded-[9.92px] border border-gray-300 bg-gray-200 text-center text-lg text-secondary-800"
              />
            ))}
          </View>
  
          <Button
            title="Verify"
            buttonStyle="w-full h-[49.77px]"
            handleClick={handleSubmit}
          />
  
          <Text className=" text-[14px] text-center mt-6 text-secondary-400 ">
            Didn't receive any code?{" "}
            <Text className="text-primary-300 font-semibold">Resend</Text>
          </Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default ConfirmEmail;
  