import { Text, View, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";
import React from "react";

const screenWidth = Dimensions.get("window").width;

interface PieChartData {
  name: string;
  amount: number;
  color: string;
  legendFontColor: string;
  legendFontSize: number;
}

const PieCharts = () => {
  const debitCreditData: PieChartData[] = [
    {
      name: "Debit",
      amount: 78000,
      color: "#578CD8",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
    {
      name: "Credit",
      amount: 103000,
      color: "white",
      legendFontColor: "#7F7F7F",
      legendFontSize: 12,
    },
  ];

  return (
    <View className="flex items-center justify-center w-full relative">
      <View className="w-[90px] h-[35px] items-center justify-center space-y-1 absolute z-10 top-5 left-0 bg-white rounded-[10px]">
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

      <PieChart
        data={debitCreditData}
        width={screenWidth - 32}
        height={220}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="amount"
        backgroundColor="transparent"
        paddingLeft={`${(screenWidth - 220) / 2}`} // Dynamically center the chart
        hasLegend={false}
      />
    </View>
  );
};

export default PieCharts;
