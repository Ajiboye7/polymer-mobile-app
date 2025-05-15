import { Text, View, Dimensions } from "react-native";
import React from "react";
import { LineChart } from "react-native-chart-kit";
const screenWidth = Dimensions.get("window").width;

const LineCharts = () => {
  return (
    <View className="relative">
      <View className="w-[90px] h-[35px] items-center justify-center space-y-1 absolute z-10 top-4 left-16 bg-white rounded-[10px]">
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

      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            { data: [40000, 50000, 60000, 70000, 65000, 80000, 75000] },
          ],
        }}
        width={screenWidth - 32}
        height={180}
        yAxisLabel=""
        yAxisSuffix=""
        fromZero
        chartConfig={{
          backgroundColor: "transparent",
          backgroundGradientFrom: "#578CD8",
          backgroundGradientTo: "#184484",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          propsForBackgroundLines: {
            stroke: "",
            strokeDasharray: "",
          },
          formatYLabel: (value) => `${parseInt(value) / 1000}k`,
        }}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    </View>
  );
};

export default LineCharts;
