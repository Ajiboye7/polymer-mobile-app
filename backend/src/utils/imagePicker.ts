import * as ImagePicker from "expo-image-picker";

export const pickImage = async (): Promise<{
    uri: string;
    name: string;
    type: string;
  } | null> => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return null;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
  
    if (!result.canceled && result.assets?.[0]?.uri) {
      const uri = result.assets[0].uri;
      const fileName = uri.split("/").pop() || `profile_${Date.now()}.jpg`;
      const fileType = `image/${uri.split(".").pop()}`;
  
      return {
        uri,
        name: fileName,
        type: fileType,
      };
    }
    return null;
  };