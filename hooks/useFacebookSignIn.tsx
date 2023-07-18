  import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
  import {signInWithCredential, FacebookAuthProvider} from 'firebase/auth';
  import { useRouter } from "expo-router";
  import auth from '../firebaseConfig';

  const useFacebookSignIn =  () => {

    const router = useRouter()
    
    const signInWithFb = async () => { 
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
      //on succesful sign in navugate the user to the next page and console the data
      console.log('facebook user 2',response.user)
      router.push('/auth/ConfirmAuth')
    })
    .catch(error => {
      // Handle Errors here.]
      console.log(error);
    });
  }
  
  return {signInWithFb}

}

  export default useFacebookSignIn
