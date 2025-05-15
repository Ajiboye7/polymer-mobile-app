/*import { View, Text, Image, ImageBackground, ScrollView } from "react-native";
import React from "react";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { icons } from "@/constants";
import Swiper from "react-native-swiper";
import { transactions } from "@/constants";
import { currencies } from "@/constants";
import HomeBackground from "@/components/HomeBackground";
import { SafeAreaView } from "react-native-safe-area-context";
import AnalyticsScreen from "./Testing";
import AnalyticBackground from "./AnalyticBackground";

const AnalyticScreen = () => {
  const [currentCurrencyIndex, setCurrentCurrencyIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCurrencyIndex((prev) => (prev + 1) % currencies.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currencies.length]);

  const currentCurrency = currencies[currentCurrencyIndex];

  return (
    <View className="flex-1 bg-primary-300">
      <Layout backgroundComponent={<AnalyticBackground />}>
      <View>

      </View>
      </Layout>
    </View>
  );
};

export default AnalyticScreen;*/

import { View, Text, FlatList, Image, ScrollView } from "react-native";
import React from "react";
import Layout from "./Layout";
import AnalyticBackground from "./AnalyticBackground";
import { transactions, icons } from "@/constants";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";


const AnalyticScreen = () => {
  return (
    <View className="flex-1">
      <Layout backgroundComponent={<AnalyticBackground />} snapPoints={["20", "50"]}>
      <View className="mx-3 mt-7 flex-1">
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
              <View key={item.id} className="my-3">
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

export default AnalyticScreen;
