import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { icons } from "@/constants";
import Swiper from "react-native-swiper";
import { transactions } from "@/constants";
import { currencies } from "@/constants";
import HomeBackground from "@/components/HomeBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import fetchExchangeRates from "@/lib/fetchExchangeRates";
import { useSelector, UseSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { showToast } from "./toastConfig";
import Toast from "react-native-toast-message";

const HomeScreen = () => {
  interface ExchangeRate {
    name: string;
    rate: number;
  }

  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCurrencyIndex((prev) => (prev + 1) % currencies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currencies.length]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

  const currentCurrency = currencies[currentCurrencyIndex];

  useEffect(() => {
    const getRates = async () => {
      const rates = await fetchExchangeRates();
      if (rates) {
        setExchangeRates(rates);
      }
    };
    getRates();
  }, []);
  const { profileSet } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (!profileSet) {
      showToast(
        "info",
        "Complete your profile",
        "You haven’t set up your profile yet",
        () => {
          Toast.hide();
          router.push(ROUTES.PERSONAL_DETAILS);
        }
      );
    }
  }, [profileSet]);

  //Real time
  const rates = exchangeRates.map(({ name, rate }) => ({ name, rate }));

  return (
    <View className="flex-1 bg-primary-300">
      <Layout
        backgroundComponent={<HomeBackground />}
        snapPoints={["48", "50"]}
      >
        <View className="flex flex-row items-center justify-between px-3 mb-3 mt-5">
          <View className="flex flex-row items-center justify-center gap-2 ">
            <Text className="text-[20px] text-primary-300 font-gilroyBold">
              Exchange rate
            </Text>
            <Image
              source={icons.live}
              resizeMode="contain"
              className="w-[54px] h-[25px]"
            />
          </View>

          <Text className="text-[12px] text-primary-200 underline font-sfProRoundedMedium ">
            View More
          </Text>
        </View>

        <View className="flex gap-1 mb-2">
          <View className="flex flex-row items-center justify-between w-full px-3 h-[64px] border-y-[1px] border-gray-200">
            <View className="flex flex-row items-center justify-start gap-4">
              <Text className="text-[12px] text-secondary-600 font-semibold">
                From
              </Text>

              <View className="flex flex-row items-center justify-between p-3 w-[158px] h-[44px] border border-solid border-gray-100 rounded-[25px] bg-secondary-300  ">
                <Image source={icons.nigeria} resizeMode="contain" />
                <Text className="text-[12px] text-[#303030] font-semibold">
                  Nigeria Naira
                </Text>
                <Image source={icons.dropDown} resizeMode="contain" />
              </View>
            </View>

            {/*
            mock
            <Text className="text-[16px] text-[#303030] font-bold">
              ₦{currentCurrency.rate.toLocaleString()}
            </Text>*/}

            
            
            <Text className="text-[16px] text-[#303030] font-bold">
              ₦
              {exchangeRates
                .find((rate) => rate.name === currentCurrency.short)
                ?.rate || "Loading..."}
            </Text>
          </View>

          <View className="relative">
            <Image
              source={icons.exchange}
              className="absolute right-[90px] top-[-27px] z-10"
              resizeMode="contain"
            />
          </View>

          <View className="flex flex-row items-center justify-between w-full px-3 h-[64px] border-y-[1px] border-gray-200">
            <View className="flex flex-row items-center justify-start gap-8">
              <Text className="text-[12px] text-secondary-600 font-semibold">
                To
              </Text>

              <View className="flex flex-row items-center justify-between p-3 w-[158px] h-[44px] border border-solid border-gray-100 rounded-[25px] bg-secondary-300  ">
                <Image source={currentCurrency.icon} resizeMode="contain" />
                <Text className="text-[12px] text-[#303030] font-semibold">
                  {currentCurrency.name}
                </Text>
                <Image source={icons.dropDown} resizeMode="contain" />
              </View>
            </View>

            <Text className="text-[16px] text-[#303030] font-bold">
              {currentCurrency.symbol}1.00
            </Text>
          </View>
        </View>

        <Swiper
          showsButtons={false}
          dotStyle={{ backgroundColor: "#ccc", width: 5, height: 5 }}
          activeDotStyle={{ backgroundColor: "#0B274F", width: 15, height: 5 }}
          autoplay
          autoplayTimeout={3}
          loop
          style={{ height: 60 }}
        >
          {/*
          mock
          {currencies.map((currency, index) => (
            <View key={index} className="flex items-center justify-center ">
              <Text className="text-[16px] text-primary-300 font-bold">
                {currency.short} - ₦{currency.rate.toLocaleString()}
              </Text>
            </View>
          ))}*/}

          
          

          {currencies.map((currency, index) => {
            const currencyRate = rates.find(
              (rate) => rate.name === currency.short
            );

            return (
              <View key={index} className="flex items-center justify-center">
                <Text className="text-[16px] text-primary-300 font-bold">
                  1 {currency.short} - ₦
                  {currencyRate
                    ? currencyRate.rate
                    : "Loading..."}
                </Text>
              </View>
            );
          })}
        </Swiper>

        <View className="bg-primary-200 mx-3 rounded-[20px] px-5 py-2  ">
          <View className="flex flex-row items-center gap-4 h-[90px]">
            <ImageBackground
              source={icons.ring}
              className="w-[62px] h-[62px] items-center justify-center"
            >
              <Text className="text-[18px] text-white font-gilroyBold">
                1/3
              </Text>
            </ImageBackground>

            <View className="w-[175px]">
              <View className="flex gap-2 ">
                <Text className="text-white text-[14px] font-gilroyHeavy">
                  Finish setting up your account
                </Text>
                <Text className="text-[10px] text-secondary-300 ">
                  Continue setting up your polymer account by adding your bank
                  details.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/*<View className="flex gap-2">
          {exchangeRates.length > 0 ? (
            exchangeRates.map((currency, index) => (
              <View key={index} className="flex flex-row items-center justify-between w-full px-3 h-[64px] border-y-[1px] border-gray-200">
                <Text className="text-[16px] text-secondary-600 font-semibold">
                  1 {currency.name} = ₦{currency.rate}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-center text-secondary-600 font-semibold">Loading exchange rates...</Text>
          )}
        </View>*/}

        <View className="mx-3 mt-7">
          <View className="flex flex-row items-center justify-between">
            <Text className="text-[20px] text-primary-300 font-gilroyBold">
              Transactions
            </Text>
            <Text className="text-[12px] text-primary-300 underline">
              View All
            </Text>
          </View>

          <ScrollView
            style={{ maxHeight: 300 }}
            showsVerticalScrollIndicator={false}
          >
            {transactions.map((item) => (
              <View key={item.id} className="my-3 ">
                <View className="flex justify-center px-4 gap-2 border h-[90px] border-gray-100 rounded-[20px] ">
                  <View className="flex flex-row items-center justify-between ">
                    <View className="flex flex-row items-center justify-start gap-2">
                      <Image source={item.image} resizeMode="contain" />
                      <Text className="text-[14px] font-sfProRoundedBold">
                        {item.title}
                      </Text>
                    </View>
                    <Image source={icons.arrowSquareRight} />
                  </View>

                  <View className="flex flex-row items-center justify-between">
                    <Text
                      className={`text-[16px] font-sfProRoundedBold ${
                        item.type === "credit"
                          ? "text-green-500"
                          : "text-danger"
                      }`}
                    >
                      {item.amount}
                    </Text>
                    <Text className="text-[12px] text-secondary-500 font-sfProRoundedBold">
                      {item.time}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </Layout>
    </View>
  );
};

export default HomeScreen;
