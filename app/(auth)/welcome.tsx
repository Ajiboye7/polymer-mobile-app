import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { animations, images, onboarding } from "@/constants";
import Button from "@/components/Button";
import LottieView from "lottie-react-native";
import { router, Link } from "expo-router";
import { ROUTES } from "@/constants/routes";
import ScreenWrapper from "@/components/ScreenWrapper";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === onboarding.length - 1;

  const handleGetStarted = () => {
    if (isLastSlide) {
      
      router.push(ROUTES.SIGN_UP);
    } else {
      swiperRef.current?.scrollBy(1);
    }
  };

  return (
    <ScreenWrapper scrollable={false}>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-[5px] h-[5px] mx-1 bg-gray-300 rounded-full" />}
        activeDot={
          <View className="w-[15px] h-[5px] mx-1 bg-primary-300 rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex-1 ">
            <View className="h-1/2">
              <ImageBackground
                source={images.onboardingBgImg}
                resizeMode="cover"
                className="w-full h-[422px] justify-center items-center"
              >
                <Image
                  source={item.image}
                  className="w-[250px] h-[250px] mb-6"
                  resizeMode="contain"
                />
              </ImageBackground>
            </View>

            <View className="px-2 bg-white h-1/2 mt-5 ">
              <View className="items-start ">
                <Text className="text-[32px] text-primary-300 font-bold mb-4 w-[270px] leading-[44.66px]">
                  {item.title}
                </Text>

                <Text className="text-[14px] text-secondary-600 font-semibold w-[300px] leading-[25px]">
                  {item.description}
                </Text>
              </View>

              <View className="my-3">
                <Button
                  title={isLastSlide ? "Get Started" : "Next"}
                  buttonStyle="w-[145px] h-[50px]"
                  handleClick={handleGetStarted}
                />
              </View>

              <Text className="mb-10">
                Already have an account?
                <Link
                  href={ROUTES.SIGN_IN}
                  className="text-primary-300 font-semibold"
                >
                  Log in
                </Link>
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
    </ScreenWrapper>
  );
};

export default Onboarding;

{
  /*<ScreenWrapper scrollable={false} >

       <View></View>
        <Swiper
          ref={swiperRef}
          loop={false}
          dot={
            <View className="w-[5px] h-[5px] mx-1 bg-gray-300 rounded-full" />
          }
          activeDot={
            <View className="w-[15px] h-[5px] mx-1 bg-primary-300 rounded-full" />
          }
          onIndexChanged={(index) => setActiveIndex(index)}
        >
          {onboarding.map((item) => (
            <View key={item.id} className="flex-1 ">
              <View className="h-1/2">
              <ImageBackground
                source={images.onboardingBgImg}
                resizeMode="cover"
                className="w-full h-[422px] justify-center items-center"
              >
                <Image
                  source={item.image}
                  className="w-[250px] h-[250px] mb-6"
                  resizeMode="contain"
                />
              </ImageBackground>

              </View>
              
              <View className="px-2 bg-white h-1/2 mt-5 ">
                <View className="items-start ">
                  <Text className="text-[32px] text-primary-300 font-bold mb-4 w-[270px] leading-[44.66px]">
                    {item.title}
                  </Text>

                  <Text className="text-[14px] text-secondary-600 font-semibold w-[300px] leading-[25px]">
                    {item.description}
                  </Text>
                </View>

                <View className="my-3">
                  <Button
                    title={isLastSlide ? "Get Started" : "Next"}
                    buttonStyle="w-[145px] h-[50px]"
                    handleClick={handleGetStarted}
                  />
                </View>

                <Text className="mb-10">
                  Already have an account?
                  <Link
                    href={ROUTES.SIGN_IN}
                    className="text-primary-300 font-semibold"
                  >
                    Log in
                  </Link>
                </Text>
              </View>
            </View>
          ))}
        </Swiper>
       </ScreenWrapper>*/
}
