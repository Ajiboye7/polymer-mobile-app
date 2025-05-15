import SwipeButton from "rn-swipe-button";
import { icons } from "@/constants";

interface CustomSwipeButtonProps {
  title: string;
  onSwipeSuccess: () => void;

  titleStyles?: object;
  containerStyles?: object;
}

const CustomSwipeButton: React.FC<CustomSwipeButtonProps> = ({
  title,
  onSwipeSuccess,
  titleStyles,
  containerStyles,

  ...props
}) => {
  return (
    <SwipeButton
      thumbIconBackgroundColor="white"
      thumbIconImageSource={icons.arrowRight}
      thumbIconBorderColor="transparent"
      railBackgroundColor="#F8F8F8"
      railBorderColor="transparent"
      title={title}
      titleStyles={{
        color: "#184484",
        fontSize: 16,
        fontWeight: "bold",
        ...titleStyles,
      }}
      containerStyles={containerStyles}
      shouldResetAfterSuccess
      onSwipeSuccess={onSwipeSuccess}
      threshold={0.5}
      {...props}
    />
  );
};

export default CustomSwipeButton;
