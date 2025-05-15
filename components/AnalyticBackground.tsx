import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    ScrollView,
  } from "react-native";
  import { useState } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import TransferHeader from "@/components/TransferHeader";
  import CustomView from "@/components/CustomView";
  import { images, icons } from "@/constants";
  import BarCharts from "@/components/BarChart";
  import PieCharts from "@/components/PieChart";
  import LineCharts from "@/components/LineChart";
  import Layout from "@/components/Layout";
  const AnalyticBackground = () => {
    const [selectChart, setSelectChart] = useState<"bar" | "pie" | "line">("bar");
    return (
        <View>
            <ScrollView>
        <SafeAreaView className="flex-1">
          <TransferHeader title="Analytics" headerStyle="-mb-5"  />
          <CustomView viewStyle="pb-28 h-full">
            <Text className="text-white text-[20px] my-5 font-gilroyBold ">
              Your Spending
            </Text>
            <ImageBackground
              source={images.balanceBg}
              className="h-[91px] justify-center p-3 -mx-3"
            >
              <View className="flex- flex-row items-center justify-between">
                <View className="space-y-2">
                  <Text className="text-[12px] text-secondary-600">
                    In the last week
                  </Text>
                  <Text className="text-[25px] font-gilroyBold text-white">
                    ₦ 187,000.00
                  </Text>
                </View>
                <View className="flex flex-row justify-center items-center space-x-2 w-[94px] h-[44px] bg-white rounded-[25px]">
                  <Text>Weekly</Text>
                  <TouchableOpacity>
                    <Image source={icons.arrowSquareDown} resizeMode="contain" />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
  
            <View className="bg-primary-200 h-[256px] mt-5 -mx-3 ">
              <View className="items-center mt-4">
                <View className="flex flex-row w-[300px] h-[35px] items-center justify-between bg-primary-300 rounded-[25px] p-[2px]">
                  <TouchableOpacity onPress={() => setSelectChart("bar")}>
                    <View
                      className={`rounded-[20px] w-[90px] h-[32px] items-center justify-center ${
                        selectChart === "bar" ? "bg-primary-200" : ""
                      }`}
                    >
                      <Image source={icons.barChart} />
                    </View>
                  </TouchableOpacity>
  
                  <TouchableOpacity onPress={() => setSelectChart("pie")}>
                    <View
                      className={`rounded-[20px] w-[90px] h-[32px] items-center justify-center ${
                        selectChart === "pie" ? "bg-primary-200" : ""
                      }`}
                    >
                      <Image source={icons.pieChart} />
                    </View>
                  </TouchableOpacity>
  
                  <TouchableOpacity onPress={() => setSelectChart("line")}>
                    <View
                      className={`rounded-[20px] w-[90px] h-[32px] items-center justify-center ${
                        selectChart === "line" ? "bg-primary-200" : ""
                      }`}
                    >
                      <Image source={icons.lineChart} />
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  {selectChart === "bar" && <BarCharts />}
                  {selectChart === "pie" && <PieCharts />}
                  {selectChart === "line" && <LineCharts />}
                </View>
              </View>
            </View>
            <View className="flex flex-row items-center justify-around mt-8">
              <View className="flex flex-row items-center justify-center space-x-3 w-[157px] h-[54px] bg-white rounded-[20px]">
                <View className="items-center justify-center w-[24px] h-[24px] bg-primary-300 rounded-[5px]">
                  <Image source={icons.income} />
                </View>
  
                <View className="space-y-1">
                  <Text className="text-[10px] text-primary-300 font-gilroyMedium">
                    Income
                  </Text>
                  <Text className="text-[14px] text-primary-300 font-gilroyBold">
                    {" "}
                    ₦ 123,000.00
                  </Text>
                </View>
              </View>
  
              <View className="flex flex-row items-center justify-center space-x-3 w-[157px] h-[54px] bg-[#578CD8] rounded-[20px]">
                <View className="items-center justify-center w-[24px] h-[24px] bg-white rounded-[5px]">
                  <Image source={icons.expenses} />
                </View>
  
                <View className="space-y-1">
                  <Text className="text-[10px] text-white font-gilroyMedium">
                    Expenses
                  </Text>
                  <Text className="text-[14px] text-white font-gilroyBold">
                    {" "}
                    ₦ 123,000.00
                  </Text>
                </View>
              </View>
            </View>
          </CustomView>
        </SafeAreaView>
      </ScrollView>
        </View>
      
    );
  };
  
  export default AnalyticBackground;
  