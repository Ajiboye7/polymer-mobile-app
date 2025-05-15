import React from "react";
import { View, ViewProps } from "react-native";

interface CustomViewProps extends ViewProps {
  children?: React.ReactNode;
  viewStyle?: string
}

const CustomView: React.FC<CustomViewProps> = ({
  children,
  viewStyle,
  style,
  ...rest
}) => {
  return (
    <View
      className={`bg-primary-300 rounded-t-[20px] px-3 -mt-12   ${viewStyle}`}
      style={style}
      {...rest}
    >
      {children}
    </View>
  );
};

export default CustomView;
