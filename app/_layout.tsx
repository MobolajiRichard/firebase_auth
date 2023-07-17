import { Stack } from "expo-router";
import { ActivityIndicator } from "react-native";
import {
  useFonts,
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_600SemiBold,
  Outfit_500Medium,
} from "@expo-google-fonts/outfit";

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_600SemiBold,
    Outfit_500Medium,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <Stack screenOptions={{headerShown:false}}/>
  );
}
