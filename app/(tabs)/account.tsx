import {
  View,
  Text,
  Image,
  ImageBackground,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TransferHeader from "@/components/TransferHeader";
import CustomView from "@/components/CustomView";
import { icons, images } from "@/constants";
import { account } from "@/constants";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants/routes";
import { useDispatch } from "react-redux";
import { signOut } from "@/redux/slices/authSlice";
import { persistor, RootState } from "@/redux/store";
import { showToast } from "@/components/toastConfig";
import { useSelector } from "react-redux";
import { uploadProfilePicture } from "@/redux/slices/userSlice";
import Constants from "expo-constants";

const Account = () => {
  const [isSwitch1Enabled, setIsSwitch1Enabled] = useState(false);
  const [isSwitch2Enabled, setIsSwitch2Enabled] = useState(false);

  const toggleSwitch1 = () => setIsSwitch1Enabled((prevState) => !prevState);
  const toggleSwitch2 = () => setIsSwitch2Enabled((prevState) => !prevState);
  const Host = Constants.expoConfig?.extra?.host || "http://192.168.0.2:5000";
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const userName = user?.name?.split(" ")[0] || "Guest";
  const profilePicture = useSelector(
    (state: RootState) => state.user.userProfile?.profilePicture
  );

  const handleSignout = async () => {
    dispatch(signOut());
    await persistor.purge();
    router.replace(ROUTES.SIGN_IN);
    showToast("success", "signout successful");
  };

  const imageUri = profilePicture
    ? `${Host}${
        profilePicture.startsWith("/") ? "" : "/"
      }${profilePicture}?${Date.now()}`
    : null;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <SafeAreaView className="flex-1">
        <TransferHeader title="My Account" />
        <CustomView viewStyle="bg-primary-300 px-3 pb-20 -mt-[70px]">
          <View>
            <View className="flex flex-row items-center justify-between mt-3">
              <Text className="text-[16px] text-secondary-600 font-gilroyBold">
                Hi {userName}
              </Text>

              <Image
                source={
                  profilePicture
                    ? {
                        uri: imageUri,
                        cache: "force-cache",
                      }
                    : icons.profile
                }
                className="w-[50px] h-[50px] rounded-full"
                resizeMode="cover"
              />
            </View>

            <View className="mb-5">
              <ImageBackground
                source={images.balanceBg}
                className="-mx-3 mt-5 py-2 h-[91px]"
              >
                <View className="flex flex-row justify-between items-center mb-3 mx-3 text-[14px]">
                  <Text className="text-white">
                    Enable Finger Print/Face ID
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isSwitch1Enabled ? "#3555F5" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch1}
                    value={isSwitch1Enabled}
                  />
                </View>

                <View className="flex flex-row justify-between items-center mb-3 mx-3 text-[14px]">
                  <Text className="text-white">
                    Show Dashboard Account Balance
                  </Text>
                  <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isSwitch2Enabled ? "#3555F5" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch2}
                    value={isSwitch2Enabled}
                  />
                </View>
              </ImageBackground>
            </View>
          </View>

          <View className="bg-[#233C5E] h-[415px] rounded-[20px] px-3 space-y-1 pt-2">
            {account.map((item, index) => (
              <View key={item.id} className=" h-[45px] justify-center">
                <TouchableOpacity
                  onPress={() => {
                    if (index === account.length - 1) {
                      Alert.alert(
                        "Sign out",
                        "Are you sure you want to sign out?",
                        [
                          {
                            text: "Cancel",
                            style: "cancel",
                          },
                          {
                            text: "Logout",

                            onPress: handleSignout,
                          },
                        ],
                        { cancelable: true }
                      );
                    } else if (index === 0) {
                      router.push(ROUTES.PERSONAL_DETAILS);
                    }
                  }}
                >
                  <View className="flex flex-row items-center justify-between ">
                    <View className="flex flex-row items-center space-x-2 ">
                      <View
                        style={{ backgroundColor: "rgba(128, 139, 150, 0.2)" }}
                        className="rounded-full h-[30px] w-[30px] items-center justify-center"
                      >
                        <Image source={item.icon} />
                      </View>

                      <Text
                        className={`text-[14px] ${
                          index === account.length - 1
                            ? "text-danger"
                            : "text-white"
                        }`}
                      >
                        {item.title}
                      </Text>
                    </View>
                    <Image source={icons.arrowRightWhite} />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </CustomView>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Account;
