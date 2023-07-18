import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { FormField,  StyledButton } from "../../components";
import { COLOR, ICONS } from "../../constants";
import * as WebBrowser from 'expo-web-browser'
import { useFacebookSignIn, useGoogleSignIn, useAppleAuth } from "../../hooks";

WebBrowser.maybeCompleteAuthSession()

export default function Login() {
  const {signInWithFb} = useFacebookSignIn()
  const {handleGoogleAuth} = useGoogleSignIn()
  const {isAvailable, getAppleAuth} = useAppleAuth()
  return (
    <>
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Hello again!</Text>
            <Text style={styles.text}>You've been missed...</Text>
            <View style={styles.formContainer}>
              <FormField name="Email" />
              <FormField name="Password" />
            </View>
            <Text style={styles.forgot}>Forgot Password?</Text>
            <View style={styles.divider}>
              <View style={styles.line}></View>
              <Text style={styles.or}>or</Text>
              <View style={styles.line}></View>
            </View>

            <View style={styles.media}>
              {/* Apple  Sign In button */}
              {isAvailable ?  getAppleAuth() : <Text></Text>}

              {/* Google Signin button */}
              <Pressable
               onPress={handleGoogleAuth}
                style={[
                  styles.mediaIcon,
                  {
                    backgroundColor: "white",
                    borderWidth: 1,
                    borderColor: COLOR.secondaryGrey,
                    marginHorizontal: 16,
                  },
                ]}
              >
                <ICONS.Google />
              </Pressable>

              {/* Facebook Sign In button */}
              <Pressable
               onPress={signInWithFb}
                style={[styles.mediaIcon, { backgroundColor: "#1877F2" }]}
              >
                <ICONS.Facebook />
              </Pressable>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <StyledButton name="Sign In" type="filled" />
            <StyledButton name="Create an account" type="outlined" />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    width: "100%",
    height: "100%",
    padding: 20,
    justifyContent: "space-between",
    paddingTop: "40%",
  },
  title: {
    fontSize: 26,
    fontFamily: "Outfit_600SemiBold",
    marginBottom: 10,
    color: COLOR.secondary,
  },
  text: {
    fontSize: 17,
    fontFamily: "Outfit_300Light",
    color: COLOR.secondary,
  },
  formContainer: {
    marginTop: 10,
  },
  forgot: {
    fontFamily: "Outfit_400Regular",
    fontSize: 14,
    color: COLOR.tetiary,
    marginTop: 10,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    height: 1,
    flex: 1,
    backgroundColor: COLOR.secondaryGrey,
  },
  or: {
    fontSize: 17,
    color: COLOR.secondary,
    fontFamily: "Outfit_300Light",
    marginHorizontal:8
  },
  media: {
    flexDirection: "row",
  },
  mediaIcon: {
    borderRadius: 8,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {},
});
