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
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import app from '../../firebaseConfig';
import {
  getAuth,
  signInWithCredential,
  FacebookAuthProvider,
} from 'firebase/auth';

export default function Login() {
  const signInWithFB = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
    
    const auth = getAuth(app);

    // Create a Firebase credential with the AccessToken
    const facebookAuthProvider = FacebookAuthProvider.credential(data.accessToken);
    // console.log("provider ",facebookAuthProvider);
    // const credential = facebookAuthProvider.credential(data.accessToken);
    // Sign-in with credential from the Facebook user.
    signInWithCredential(auth, facebookAuthProvider)
    .then(() => {

    })
    .catch(error => {
      // Handle Errors here.]
      console.log(error);
    });


  }
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
              <Text style={{ marginHorizontal: 2 }}>or</Text>
              <View style={styles.line}></View>
            </View>

            <View style={styles.media}>
              <Pressable
                style={[styles.mediaIcon, { backgroundColor: "black" }]}
              >
                <ICONS.Apple />
              </Pressable>
              <Pressable
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
              <Pressable
              onPress={signInWithFB}
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
  },
  media: {
    flexDirection: "row",
  },
  mediaIcon: {
    borderRadius: 8,
    borderColor: "black",
    height: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonContainer: {},
});
