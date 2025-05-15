{/*import {Text} from 'react-native';
import { Link, Redirect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <Redirect href="/(auth)/welcome" />
    
  );
}*/}

import { useSelector } from "react-redux";
import { Redirect } from "expo-router";
import { RootState } from "@/redux/store"; 

export default function HomeScreen() {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user && user.token) {
    return <Redirect href="/(tabs)/home"/>; 
  } else {
    return <Redirect href="/(auth)/welcome" />;
  }
}





