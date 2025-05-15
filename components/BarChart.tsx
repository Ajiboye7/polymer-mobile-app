import { Text, View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import React from "react";

const BarCharts = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="relative">
      <View className="w-[90px] h-[35px] items-center justify-center space-y-1 absolute z-10 top-5 left-16 bg-white rounded-[10px]">
        <View className="flex flex-row items-center space-x-1">
          <View className="w-[5.15px] h-[5.17px] rounded-full bg-[#7B95B9]"></View>
          <Text className="text-[12px] text-[#868686] font-gilroyBold">
            ₦ 103,000.00
          </Text>
        </View>

        <View className="flex flex-row items-center space-x-1">
          <View className="w-[5.15px] h-[5.17px] rounded-full bg-[#578CD8]"></View>
          <Text className="text-[12px] text-[#578CD8] font-gilroyBold">
            ₦ 78,000.00
          </Text>
        </View>
      </View>
      <BarChart
        data={{
          labels: [
            "Mon",
            "",
            "Tue",
            "",
            "Wed",
            "",
            "Thu",
            "",
            "Fri",
            "",
            "Sat",
            "",
            "Sun",
            "",
          ],
          datasets: [
            {
              data: [
                40000, 0, 50000, 0, 60000, 0, 70000, 0, 65000, 0, 80000, 0,
                75000, 0,
              ],
              color: () => "blue",
            },
            {
              data: [
                0, 60000, 0, 70000, 0, 80000, 0, 75000, 0, 85000, 0, 90000, 0,
                88000,
              ],
              color: () => "white",
            },
          ],
        }}
        width={screenWidth - 32}
        height={180}
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1}
        fromZero
        chartConfig={{
          backgroundColor: "",
          backgroundGradientFrom: "#578CD8",
          backgroundGradientTo: "#184484",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          barPercentage: 0.4,
          propsForBackgroundLines: {
            stroke: "none",
            strokeDasharray: "4",
          },
          formatYLabel: (value) => `${parseInt(value) / 1000}k`,
        }}
        showBarTops={false}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

export default BarCharts;
