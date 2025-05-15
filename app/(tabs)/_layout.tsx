import { Tabs } from "expo-router";
import { Image, View, Text, ImageSourcePropType } from "react-native";

import { tabIcons } from "@/constants";

import { SvgProps } from "react-native-svg";

interface TabIconProps {
  Icon: React.FC<SvgProps>;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon = ({ Icon, color, name, focused }: TabIconProps) => {
  const iconColor = focused ? "#184484" : "none";
  return (
    <View className="items-center justify-center gap-2 w-14">
      <Icon
        width={30}
        height={30}
        fill={iconColor}
        stroke={focused ? "none" : color}
      />
      <Text
        className={`${focused ? "font-[590px]" : "font-[400px]"} text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#184484",
        tabBarInactiveTintColor: "#868686",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          height: 84,
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingBottom: 20,
          shadowColor: "#000000",
          shadowOffset: { width: 0, height: -1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,

          // Android shadow
          elevation: 5, //
        },
        headerShown: false,
        tabBarShowLabel: false, // Hide labels for icons only
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              Icon={tabIcons.home}
              name="Home"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="payments"
        options={{
          title: "Payments",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              Icon={tabIcons.payment}
              name="Payments"
              color={color}
              focused={focused}
              
            />
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              Icon={tabIcons.analytic}
              name="Analytics"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              Icon={tabIcons.account}
              name="Account"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
