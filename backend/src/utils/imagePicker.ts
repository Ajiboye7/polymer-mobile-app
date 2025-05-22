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
  
    c
        type: fileType,
      };
    }
    return null;
  };