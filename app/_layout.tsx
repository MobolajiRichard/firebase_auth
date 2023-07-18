import { Stack } from "expo-router";
import { View } from "react-native";
import {
  useFonts,
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_600SemiBold,
  Outfit_500Medium,
} from "@expo-google-fonts/outfit";
import { SplashScreen } from "expo-router";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync()

export const unstable_settings = {
  initialRouteName:'/auth'
}

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_600SemiBold,
    Outfit_500Medium,
  });

  const onLayoutView = useCallback(async () => {
    if(fontsLoaded){
      await SplashScreen.hideAsync()
    }
  },[fontsLoaded])


  if (!fontsLoaded) return null

  return (
    <View onLayout={onLayoutView} style={{flex:1}}>
    <Stack screenOptions={{headerShown:false}}>
      <Stack.Screen name='auth'/>
    </Stack>
    </View>
  );
}