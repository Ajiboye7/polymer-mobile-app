import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface PinInputOverlayProps {
  onPinSubmit: (pin: string) => void;
  onClose: () => void;
}

const PinInputOverlay: React.FC<PinInputOverlayProps> = ({ onPinSubmit, onClose }) => {
  const [pin, setPin] = useState<string>("");

  const handleNumberPress = (number: string) => {
    if (pin.length < 4) {
      setPin((prev) => prev + number);
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleSubmit = () => {
    if (pin.length === 4) {
      onPinSubmit(pin); // Submit the PIN
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.pinContainer}>
        <Text style={styles.title}>Enter your 4-Digit PIN</Text>
        <View style={styles.pinDots}>
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <View
                key={index}
                style={[
                  styles.pinDot,
                  pin.length > index && styles.pinDotFilled,
                ]}
              />
            ))}
        </View>
        <View style={styles.keypad}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "⌫"].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.key}
              onPress={() =>
                item === "⌫" ? handleBackspace() : handleNumberPress(item.toString())
              }
              disabled={item === ""}
            >
              <Text style={styles.keyText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pinContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  pinDots: {
    flexDirection: "row",
    marginBottom: 20,
  },
  pinDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  pinDotFilled: {
    backgroundColor: "#000",
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  key: {
    width: "30%",
    padding: 15,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  keyText: {
    fontSize: 18,
  },
  submitButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default PinInputOverlay;