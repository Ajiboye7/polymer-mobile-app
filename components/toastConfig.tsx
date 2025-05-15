import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { ToastProps } from "@/types/types";
import { TouchableOpacity } from "react-native";

export const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{
        borderLeftColor: "green",
        borderRadius: 8,
        backgroundColor: "#e6ffed",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: "bold", color: "#006400" }}
      text2Style={{ fontSize: 13, color: "#004d00" }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      style={{
        borderLeftColor: "red",
        borderRadius: 8,
        backgroundColor: "#ffe6e6",
      }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: "bold", color: "#8b0000" }}
      text2Style={{ fontSize: 13, color: "#800000" }}
    />
  ),
  info: (props: any) => (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onPress}>
      <BaseToast
        {...props}
        style={{
          borderLeftColor: "#3498db",
          borderRadius: 8,
          backgroundColor: "#e6f4ff",
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{ fontSize: 15, fontWeight: "bold", color: "#004080" }}
        text2Style={{ fontSize: 13, color: "#003366" }}
      />
    </TouchableOpacity>
  ),
  
};

export function showToast(arg1: ToastProps | ToastProps['type'], text1?: string, text2?: string,  handleClick?: () => void): void {
  if (typeof arg1 === 'object') {
    Toast.show({
      autoHide: true,
      visibilityTime: 4000,
      ...arg1,
    });
  } else {
    Toast.show({
      type: arg1,
      text1: text1,
      text2: text2,
      autoHide: true,
      visibilityTime: 5000,
      onPress: handleClick,
    });
  }
}
