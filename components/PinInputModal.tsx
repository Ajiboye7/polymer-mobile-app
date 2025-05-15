import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { BlurView } from "expo-blur";
import { icons } from "@/constants";

interface PinInputModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPinEntered: (pin: string) => void;
}

const PinInputModal: React.FC<PinInputModalProps> = ({
  isVisible,
  onClose,
  onPinEntered,
}) => {
  const [pin, setPin] = useState(""); 

  const handleNumberPress = (number: string) => {
    if (pin.length < 4) {
      const newPin = pin + number;
      setPin(newPin);

      if (newPin.length === 4) {
        setTimeout(() => {
          onClose();
          onPinEntered(newPin);
          setPin("");
        }, 500);
      }
    }
  };

  const handleDeletePress = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };
  return (
    <Modal transparent animationType="slide" visible={isVisible}>
      <BlurView
              intensity={30}
              tint="dark"
              className="flex-1 justify-end items-center"
            >
              <View className="bg-white rounded-t-2xl p-6 absolute bottom-0 w-full">
        <View className="flex-row justify-between mb-4">
          <Text className="text-xl text-center">Enter Transaction PIN</Text>
          <TouchableOpacity onPress={onClose}>
            <Image source={icons.close} resizeMode="contain" />
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mb-6">
  {Array(4).fill(0).map((_, index) => (
    <View
      key={index}
      className={`w-10 h-10 mx-2 rounded-md border ${
        pin.length > index 
          ? "border-primary-300 bg-primary-300/10" 
          : "border-gray-300"
      } flex items-center justify-center`}
    >
      {pin.length > index && (
        <View className="w-[10px] h-[10px] rounded-full bg-primary-300" />
      )}
    </View>
  ))}
</View>

        {/* Custom Numeric Keyboard */}
        <View className="flex-wrap flex-row justify-center">
  {/* First Row: 1, 2, 3 */}
  <View className="flex-row w-full justify-center">
    {[1, 2, 3].map((num) => (
      <TouchableOpacity
        key={num}
        onPress={() => handleNumberPress(num.toString())}
        className="w-[30%] p-4 m-2"
      >
        <Text className="text-2xl text-center">{num}</Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Second Row: 4, 5, 6 */}
  <View className="flex-row w-full justify-center">
    {[4, 5, 6].map((num) => (
      <TouchableOpacity
        key={num}
        onPress={() => handleNumberPress(num.toString())}
        className="w-[30%] p-4 m-2"
      >
        <Text className="text-2xl text-center">{num}</Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Third Row: 7, 8, 9 */}
  <View className="flex-row w-full justify-center">
    {[7, 8, 9].map((num) => (
      <TouchableOpacity
        key={num}
        onPress={() => handleNumberPress(num.toString())}
        className="w-[30%] p-4 m-2"
      >
        <Text className="text-2xl text-center">{num}</Text>
      </TouchableOpacity>
    ))}
  </View>

  {/* Fourth Row: 0 and Delete Button */}
  <View className="flex-row w-full justify-center">
    {/* Empty Space for Alignment */}
    <View className="w-[30%] p-4 m-2" />

    {/* 0 Button */}
    <TouchableOpacity
      onPress={() => handleNumberPress("0")}
      className="w-[30%] p-4 m-2"
    >
      <Text className="text-2xl text-center">0</Text>
    </TouchableOpacity>

    {/* Delete Button */}
    <TouchableOpacity
      onPress={handleDeletePress}
      className="w-[30%] p-4 m-2"
    >
      <Image source={icons.del} resizeMode="contain" />
    </TouchableOpacity>
  </View>
</View>
      </View>
            </BlurView>
      
    </Modal>
  );
};

export default PinInputModal;
