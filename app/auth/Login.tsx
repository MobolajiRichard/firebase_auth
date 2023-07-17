import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
} from "react-native";
import { FormField,  StyledButton } from "../../components";
import { useEffect, useState } from "react";
import { COLOR, ICONS } from "../../constants";
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
// import app from '../../firebaseConfig';
import auth from "../../firebaseConfig";
import {
  getAuth,
  signInWithCredential,
  FacebookAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged
} from 'firebase/auth';
import * as Google from 'expo-auth-session/providers/google'
import * as Facebook from 'expo-auth-session/providers/facebook'
import * as WebBrowser from 'expo-web-browser'
import * as AppleAuthentication from 'expo-apple-authentication';
import { useRouter } from "expo-router";

WebBrowser.maybeCompleteAuthSession()

export default function Login() {

  const [isAvailable, setIsAvailable] = useState(false)

  //connect to google
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId:'636314185870-4hg7qbjhsoov3vpd4n3029n1qvpu8lqm.apps.googleusercontent.com',
    androidClientId:'636314185870-ai2t8aqqfl0a3f4918d0sdbbgol67ldr.apps.googleusercontent.com'
  })

  const router = useRouter()

  //check if apple authentication is available for ios platform
  useEffect(() => {
    const checkAvailability = async () => {
      const isAppleAvailable = await AppleAuthentication.isAvailableAsync()
      setIsAvailable(isAppleAvailable)
    }
    checkAvailability()
  }, [])

  //Google sign in authentication
  useEffect(() => {
    if(response?.type === 'success'){
      const {id_token} = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(auth, credential)
    }

    const sub = onAuthStateChanged(auth, async (user) =>{
      if(user){
      console.log('user from google', user)
      }else{
        console.log('user not authenticated')
      }
    })
  
      return () => sub()
  }, [response])

  const handleGoogleAuth = async () => {
    const result = await promptAsync()
    if(result.type === 'success'){
      router.push('/auth/ConfirmAuth')
    }
  }

//Facebook Authentication
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
    // Create a Firebase credential with the AccessToken
    const facebookAuthProvider = FacebookAuthProvider.credential(data.accessToken);
    signInWithCredential(auth, facebookAuthProvider)
    .then((response) => {
      console.log('facebook user 2',response.user)
      router.push('/auth/ConfirmAuth')
    })
    .catch(error => {
      // Handle Errors here.]
      console.log(error);
    });
  }

  // const getAppleAuth = () => {
  //   return <AppleAuthentication.AppleAuthenticationButton
  //   buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
  //   buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
  //   cornerRadius={5}
  //   onPress={async () => {
  //     try {
  //       const credential = await AppleAuthentication.signInAsync({
  //         requestedScopes: [
  //           AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
  //           AppleAuthentication.AppleAuthenticationScope.EMAIL,
  //         ],
  //       });
  //       // signed in
  //       console.log(credential)
  //     } catch (e:any) {
  //       if (e.code === 'ERR_REQUEST_CANCELED') {
  //         // handle that the user canceled the sign-in flow
  //       } else {
  //         // handle other errors
  //       }
  //     }
  //   }}
  //   style={{width:'30%', height:50}}
  // />
  // }

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
              {/* {
                isAvailable ?  getAppleAuth() : <Text>Not available</Text>
              } */}
            

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
